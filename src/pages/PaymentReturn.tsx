import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Clock3, Loader2, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getPaymentLink } from '../lib/payments';
import type { Package } from '../types/interview';

interface PaymentReturnProps { cancelled?: boolean; }
interface PaymentOrder { order_id: string; package_id: Package['id']; payment_option: 'booking' | 'full'; payment_status: 'pending' | 'confirmed' | 'failed' | 'cancelled'; }

export const PaymentReturn: React.FC<PaymentReturnProps> = ({ cancelled = false }) => {
  const [params] = useSearchParams();
  const [order, setOrder] = useState<PaymentOrder | null>(null);
  const [checking, setChecking] = useState(!cancelled);
  const orderId = params.get('order_id') || localStorage.getItem('lbes_pending_order_id');

  useEffect(() => {
    if (cancelled || !orderId || !supabase) { setChecking(false); return; }
    let active = true;
    const check = async () => {
      const { data } = await supabase.from('orders').select('order_id, package_id, payment_option, payment_status').eq('order_id', orderId).maybeSingle();
      if (active) { setOrder(data as PaymentOrder | null); setChecking(false); }
    };
    void check();
    const timer = window.setInterval(check, 5000);
    return () => { active = false; window.clearInterval(timer); };
  }, [cancelled, orderId]);

  const confirmed = order?.payment_status === 'confirmed';
  const failed = order?.payment_status === 'failed' || order?.payment_status === 'cancelled';
  const pending = !cancelled && !checking && !confirmed && !failed;
  const paymentLink = order ? getPaymentLink(order.package_id, order.payment_option) : null;

  return (
    <main className="min-h-screen bg-[#050505] pt-36 pb-20 px-6">
      <div className="max-w-xl mx-auto text-center bg-[#0A0A0A] border border-white/10 rounded-2xl p-10">
        {checking ? <Loader2 size={48} className="mx-auto text-orange-400 mb-6 animate-spin" /> : cancelled || failed ? <XCircle size={48} className="mx-auto text-gray-500 mb-6" /> : confirmed ? <CheckCircle2 size={48} className="mx-auto text-green-400 mb-6" /> : <Clock3 size={48} className="mx-auto text-yellow-400 mb-6" />}
        <p className="text-orange-400 text-xs font-bold tracking-[0.2em] mb-4">PAYMENT STATUS</p>
        <h1 className="text-3xl font-bold text-white mb-4">{checking ? 'Verifying payment' : confirmed ? 'Payment confirmed' : pending ? 'Payment received for review' : cancelled ? 'Payment cancelled' : 'Payment failed'}</h1>
        <p className="text-gray-400 leading-relaxed">{checking ? 'Please wait while we confirm your payment.' : confirmed ? 'Payment received. Your order is now queued for engineering.' : pending ? 'Your Razorpay payment was received by the payment page. We are waiting for the verified payment notification before marking the order confirmed.' : cancelled ? 'The payment was cancelled. Your order remains available if you want to try again.' : 'Razorpay reported that this payment failed.'}</p>
        {orderId && <div className="mt-6 inline-flex items-center gap-2 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300">Order: {orderId}</div>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {confirmed && <Link to={`/order/${encodeURIComponent(orderId || '')}`} className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black hover:bg-orange-400">View My Order</Link>}
          {(failed || cancelled) && paymentLink && <a href={paymentLink} className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black hover:bg-orange-400">Try Payment Again</a>}
          <Link to={orderId ? `/order/${encodeURIComponent(orderId)}` : '/interview'} className="rounded-xl border border-white/15 px-6 py-3 text-gray-300 hover:text-white">Return to Order</Link>
        </div>
      </div>
    </main>
  );
};
