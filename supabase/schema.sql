-- LBES fresh schema
-- Run this entire file once in Supabase SQL Editor.
-- The frontend uses only the Supabase anon key. Never put a service-role key in Vite.

create extension if not exists pgcrypto;

insert into storage.buckets (id, name, public)
values ('chart-uploads', 'chart-uploads', false)
on conflict (id) do nothing;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.interviews (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  calibration jsonb not null default '{}'::jsonb,
  status text not null default 'interview-in-progress',
  current_section text not null default 'trading-foundation',
  current_question_index integer not null default 0 check (current_question_index >= 0),
  readiness numeric(5,2) not null default 0 check (readiness >= 0 and readiness <= 100),
  asked_questions text[] not null default '{}',
  skipped_questions text[] not null default '{}',
  specification jsonb,
  started_at timestamptz not null default now(),
  last_updated timestamptz not null default now()
);

create table if not exists public.interview_answers (
  id uuid primary key default gen_random_uuid(),
  interview_id uuid not null references public.interviews(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  answer text not null default '',
  edited boolean not null default false,
  needs_clarification boolean not null default false,
  answered_at timestamptz not null default now(),
  unique (interview_id, question_id)
);

create table if not exists public.specifications (
  id uuid primary key,
  interview_id uuid not null unique references public.interviews(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  sections jsonb not null default '[]'::jsonb,
  approved boolean not null default false,
  generated_at timestamptz not null default now(),
  approved_at timestamptz
);

create table if not exists public.orders (
  id uuid primary key,
  order_id text not null unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  customer_id uuid not null references auth.users(id) on delete cascade,
  interview_id uuid not null references public.interviews(id) on delete restrict,
    strategy_id uuid not null references public.interviews(id) on delete restrict,
  package_id text not null check (package_id in ('tradingview', 'tradingview-mt5', 'full')),
  package_price numeric(10,2) not null check (package_price in (19, 29, 49)),
  amount_due_now numeric(10,2) not null check (amount_due_now in (0.95, 1.45, 2.45, 19, 29, 49)),
  status text not null default 'payment-pending' check (status in ('payment-pending', 'payment-confirmed', 'order-confirmed', 'engineering-queued', 'engineering', 'backtest', 'qa', 'ready', 'delivered')),
  payment_option text not null check (payment_option in ('booking', 'full')),
  payment_type text not null check (payment_type in ('booking', 'full')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'confirmed', 'failed', 'cancelled')),
  payment_confirmed boolean not null default false,
  payment_provider text not null default 'razorpay' check (payment_provider = 'razorpay'),
  payment_provider_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders add column if not exists order_id text;
alter table public.orders add column if not exists customer_id uuid;
alter table public.orders add column if not exists strategy_id uuid;
alter table public.orders add column if not exists package_price numeric(10,2);
alter table public.orders add column if not exists amount_due_now numeric(10,2);
alter table public.orders add column if not exists payment_type text;
alter table public.orders add column if not exists payment_status text default 'pending';
update public.orders set order_id = coalesce(order_id, id::text), customer_id = coalesce(customer_id, user_id), strategy_id = coalesce(strategy_id, interview_id), payment_type = coalesce(payment_type, payment_option), payment_status = coalesce(payment_status, case when payment_confirmed then 'confirmed' else 'pending' end), package_price = coalesce(package_price, case package_id when 'tradingview' then 19 when 'tradingview-mt5' then 29 when 'full' then 49 end), amount_due_now = coalesce(amount_due_now, case when payment_option = 'booking' then case package_id when 'tradingview' then 0.95 when 'tradingview-mt5' then 1.45 when 'full' then 2.45 end else case package_id when 'tradingview' then 19 when 'tradingview-mt5' then 29 when 'full' then 49 end end);
alter table public.orders alter column order_id set not null;
alter table public.orders alter column customer_id set not null;
alter table public.orders alter column strategy_id set not null;
alter table public.orders alter column package_price set not null;
alter table public.orders alter column amount_due_now set not null;
alter table public.orders alter column payment_type set not null;
alter table public.orders alter column payment_status set not null;
create unique index if not exists orders_order_id_idx on public.orders(order_id);

create index if not exists interviews_user_id_idx on public.interviews(user_id);
create index if not exists interview_answers_interview_id_idx on public.interview_answers(interview_id);
create index if not exists specifications_user_id_idx on public.specifications(user_id);
create index if not exists orders_user_id_idx on public.orders(user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
drop trigger if exists interviews_updated_at on public.interviews;
create trigger interviews_updated_at before update on public.interviews
for each row execute function public.set_updated_at();
drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at before update on public.orders
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Prevent a signed-in browser from attaching records to another user's parent record.
create or replace function public.enforce_interview_owner()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.interviews i
    where i.id = new.interview_id and i.user_id = auth.uid()
  ) then
    raise exception 'Interview does not belong to the signed-in user';
  end if;
  new.user_id = auth.uid();
  return new;
end;
$$;

drop trigger if exists interview_answers_owner on public.interview_answers;
create trigger interview_answers_owner
before insert or update on public.interview_answers
for each row execute function public.enforce_interview_owner();

create or replace function public.enforce_order_owner()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.interviews i
    where i.id = new.interview_id and i.user_id = auth.uid()
  ) then
    raise exception 'Interview does not belong to the signed-in user';
  end if;
  new.user_id = auth.uid();
  new.customer_id = auth.uid();
  if tg_op = 'UPDATE' then
    new.order_id = old.order_id;
    new.package_id = old.package_id;
    new.package_price = old.package_price;
    new.amount_due_now = old.amount_due_now;
    new.payment_option = old.payment_option;
    new.payment_type = old.payment_type;
    new.strategy_id = old.strategy_id;
    new.status = old.status;
    new.payment_status = old.payment_status;
    new.payment_confirmed = old.payment_confirmed;
    new.payment_provider_id = old.payment_provider_id;
  end if;
  return new;
end;
$$;

drop trigger if exists orders_owner on public.orders;
create trigger orders_owner
before insert or update on public.orders
for each row execute function public.enforce_order_owner();

alter table public.profiles enable row level security;
alter table public.interviews enable row level security;
alter table public.interview_answers enable row level security;
alter table public.specifications enable row level security;
alter table public.orders enable row level security;

do $$
begin
  execute 'drop policy if exists profiles_select_own on public.profiles';
  execute 'drop policy if exists profiles_update_own on public.profiles';
  execute 'drop policy if exists interviews_select_own on public.interviews';
  execute 'drop policy if exists interviews_insert_own on public.interviews';
  execute 'drop policy if exists interviews_update_own on public.interviews';
  execute 'drop policy if exists interviews_delete_own on public.interviews';
  execute 'drop policy if exists answers_select_own on public.interview_answers';
  execute 'drop policy if exists answers_insert_own on public.interview_answers';
  execute 'drop policy if exists answers_update_own on public.interview_answers';
  execute 'drop policy if exists answers_delete_own on public.interview_answers';
  execute 'drop policy if exists specifications_select_own on public.specifications';
  execute 'drop policy if exists specifications_insert_own on public.specifications';
  execute 'drop policy if exists specifications_update_own on public.specifications';
  execute 'drop policy if exists orders_select_own on public.orders';
  execute 'drop policy if exists orders_insert_own on public.orders';
  execute 'drop policy if exists chart_uploads_select_own on storage.objects';
  execute 'drop policy if exists chart_uploads_insert_own on storage.objects';
  execute 'drop policy if exists chart_uploads_delete_own on storage.objects';
end;
$$;

create policy profiles_select_own on public.profiles for select to authenticated using (id = auth.uid());
create policy profiles_update_own on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy interviews_select_own on public.interviews for select to authenticated using (user_id = auth.uid());
create policy interviews_insert_own on public.interviews for insert to authenticated with check (user_id = auth.uid());
create policy interviews_update_own on public.interviews for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy interviews_delete_own on public.interviews for delete to authenticated using (user_id = auth.uid());

create policy answers_select_own on public.interview_answers for select to authenticated using (user_id = auth.uid());
create policy answers_insert_own on public.interview_answers for insert to authenticated with check (user_id = auth.uid());
create policy answers_update_own on public.interview_answers for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy answers_delete_own on public.interview_answers for delete to authenticated using (user_id = auth.uid());

create policy specifications_select_own on public.specifications for select to authenticated using (user_id = auth.uid());
create policy specifications_insert_own on public.specifications for insert to authenticated with check (user_id = auth.uid());
create policy specifications_update_own on public.specifications for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy orders_select_own on public.orders for select to authenticated using (user_id = auth.uid());
create policy orders_insert_own on public.orders for insert to authenticated with check (user_id = auth.uid() and status = 'payment-pending' and payment_confirmed = false);

revoke all on public.profiles, public.interviews, public.interview_answers, public.specifications, public.orders from anon;
grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.interviews to authenticated;
grant select, insert, update, delete on public.interview_answers to authenticated;
grant select, insert, update on public.specifications to authenticated;
grant select, insert on public.orders to authenticated;

create policy chart_uploads_select_own on storage.objects for select to authenticated
using (bucket_id = 'chart-uploads' and (storage.foldername(name))[1] = auth.uid()::text);
create policy chart_uploads_insert_own on storage.objects for insert to authenticated
with check (bucket_id = 'chart-uploads' and (storage.foldername(name))[1] = auth.uid()::text);
create policy chart_uploads_delete_own on storage.objects for delete to authenticated
using (bucket_id = 'chart-uploads' and (storage.foldername(name))[1] = auth.uid()::text);

-- Payment confirmation must be performed by a trusted Razorpay webhook/server using service_role.
-- Never expose service_role to the browser.
