import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, Circle, Clock, FileText, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PACKAGES } from '../types/interview';
import type { Package } from '../types/interview';

interface OrderRow { order_id: string; package_id: Package['id']; payment_option: 'booking' | 'full'; package_price: number; amount_due_now: number; payment_status: 'pending' | 'confirmed' | 'failed' | 'cancelled'; }

export const OrderPage: React.FC = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!supabase || !orderId) { setLoading(false); return; }
    supabase.from('orders').select('order_id, package_id, payment_option, package_price, amount_due_now, payment_status').eq('order_id', orderId).maybeSingle().then(({ data }) => { setOrder(data as OrderRow | null); setLoading(false); });
  }, [orderId]);
  const pkg = order ? PACKAGES.find(item => item.id === order.package_id) : null;
  const confirmed = order?.payment_status === 'confirmed';
  const remaining = order && order.payment_option === 'booking' ? order.package_price - order.amount_due_now : 0;

  return <main className="min-h-screen bg-[#050505] pt-36 pb-20 px-6"><div className="max-w-3xl mx-auto">
    {loading ? <div className="flex justify-center text-orange-400"><Loader2 className="animate-spin" /></div> : !order ? <div className="text-center text-gray-400">Order not found.</div> : <>
      <div className="text-center mb-10"><p className="text-orange-400 text-xs font-bold tracking-[0.2em] mb-4">YOUR ORDER</p><h1 className="text-4xl font-bold text-white">{order.order_id}</h1><p className="text-gray-400 mt-3">{pkg?.name}</p></div>
      <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 space-y-5">
        <div className="flex justify-between border-b border-white/10 pb-5"><span className="text-gray-400">Payment</span><span className={confirmed ? 'text-green-400' : 'text-yellow-400'}>{confirmed ? (order.payment_option === 'full' ? 'Paid in Full' : 'Booking Payment Confirmed') : 'Payment Pending'}</span></div>
        {order.payment_option === 'booking' && <div className="flex justify-between border-b border-white/10 pb-5"><span className="text-gray-400">Remaining balance</span><span className="text-white">${remaining.toFixed(2)}</span></div>}
        {[['Payment', confirmed ? 'Confirmed' : 'Pending', confirmed], ['Strategy', 'Approved', confirmed], ['Engineering', 'Queued', confirmed], ['Testing', 'Pending', false], ['Delivery', 'Pending', false]].map(([label, value, complete]) => <div key={label as string} className="flex items-center justify-between"><span className="flex items-center gap-3 text-gray-300">{complete ? <Check size={16} className="text-green-400" /> : label === 'Engineering' && confirmed ? <Clock size={16} className="text-orange-400" /> : <Circle size={14} className="text-gray-700" />}{label as string}</span><span className="text-gray-400">{value as string}</span></div>)}
      </div>
      <div className="mt-8 flex justify-center"><Link to="/specification" className="flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-gray-300 hover:text-white"><FileText size={16} /> View Full Specification</Link></div>
    </>}
  </div></main>;
};
