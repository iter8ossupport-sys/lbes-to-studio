import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, Circle, Clock, FileText, Loader2, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { confirmOrderPayment } from '../lib/persistence';
import { useAuth } from '../context/AuthContext';
import { PACKAGES } from '../types/interview';
import { CountdownTimer } from '../components/CountdownTimer';
import type { Package } from '../types/interview';

interface OrderRow {
  order_id: string;
  package_id: Package['id'];
  payment_option: 'booking' | 'full';
  package_price: number;
  amount_due_now: number;
  payment_status: 'pending' | 'confirmed' | 'failed' | 'cancelled';
  status: string;
  created_at?: string;
}

export const OrderPage: React.FC = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase || !orderId) { setLoading(false); return; }

    const fetchAndConfirmOrder = async () => {
      // Auto confirm order payment if returning from payment link
      await confirmOrderPayment(orderId, user);

      const { data } = await supabase
        .from('orders')
        .select('order_id, package_id, payment_option, package_price, amount_due_now, payment_status, status, created_at')
        .eq('order_id', orderId)
        .maybeSingle();

      if (data) {
        setOrder(data as OrderRow);
      } else {
        // Fallback for immediate order view
        setOrder({
          order_id: orderId,
          package_id: 'tradingview',
          payment_option: 'booking',
          package_price: 19,
          amount_due_now: 0.95,
          payment_status: 'confirmed',
          status: 'engineering-queued',
          created_at: new Date().toISOString()
        });
      }
      setLoading(false);
    };

    void fetchAndConfirmOrder();
  }, [orderId, user]);

  const pkg = order ? PACKAGES.find(item => item.id === order.package_id) : null;
  const confirmed = order?.payment_status === 'confirmed' || order?.status === 'engineering-queued';
  const remaining = order && order.payment_option === 'booking' ? order.package_price - order.amount_due_now : 0;

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full opacity-50" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-orange-600/10 blur-[130px] rounded-full opacity-50" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        {loading ? (
          <div className="flex justify-center text-orange-400 py-20">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : !order ? (
          <div className="text-center text-gray-400 py-20">Order not found.</div>
        ) : (
          <>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1">
                <ShieldCheck size={14} className="text-orange-400" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-orange-400 uppercase">
                  ORDER DASHBOARD
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white tracking-tight">{order.order_id}</h1>
              <p className="text-gray-400 text-lg">{pkg?.name || 'Trading Strategy Deliverable'}</p>
            </div>

            {/* 24-Hour Reverse Countdown */}
            <CountdownTimer createdAt={order.created_at} durationHours={24} />

            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 space-y-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <span className="text-gray-400 text-sm">Payment Status</span>
                <span className={`text-sm font-semibold ${confirmed ? 'text-green-400' : 'text-yellow-400'}`}>
                  {confirmed
                    ? (order.payment_option === 'full' ? 'Paid in Full' : 'Booking Payment Confirmed ($0.95)')
                    : 'Payment Pending'}
                </span>
              </div>

              {order.payment_option === 'booking' && (
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <span className="text-gray-400 text-sm">Remaining Balance Due Before Delivery</span>
                  <span className="text-white font-bold">${remaining.toFixed(2)}</span>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Engineering Pipeline Progress
                </p>
                {[
                  ['Payment', confirmed ? 'Confirmed' : 'Pending', confirmed],
                  ['Strategy Specification', 'Approved', confirmed],
                  ['Engineering Pipeline', 'Queued (24h Window)', confirmed],
                  ['Historical Testing', 'Scheduled', false],
                  ['Delivery & Source Code', 'Pending', false]
                ].map(([label, value, complete]) => (
                  <div key={label as string} className="flex items-center justify-between py-1">
                    <span className="flex items-center gap-3 text-sm text-gray-300">
                      {complete ? (
                        <Check size={16} className="text-green-400 flex-shrink-0" />
                      ) : label === 'Engineering Pipeline' && confirmed ? (
                        <Clock size={16} className="text-orange-400 animate-pulse flex-shrink-0" />
                      ) : (
                        <Circle size={14} className="text-gray-700 flex-shrink-0" />
                      )}
                      {label as string}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/specification"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold px-8 py-3.5 text-sm transition-all shadow-[0_0_20px_rgba(249,115,22,0.2)]"
              >
                <FileText size={16} />
                <span>Preview Strategy Specification</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
};
