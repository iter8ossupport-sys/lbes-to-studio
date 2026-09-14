import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Clock3, FileText, Loader2, ShieldCheck, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { confirmOrderPayment } from '../lib/persistence';
import { useAuth } from '../context/AuthContext';
import { getPaymentLink } from '../lib/payments';
import { CountdownTimer } from '../components/CountdownTimer';
import type { Package } from '../types/interview';

interface PaymentReturnProps { cancelled?: boolean; }
interface PaymentOrder {
  order_id: string;
  package_id: Package['id'];
  payment_option: 'booking' | 'full';
  payment_status: 'pending' | 'confirmed' | 'failed' | 'cancelled';
  created_at?: string;
}

export const PaymentReturn: React.FC<PaymentReturnProps> = ({ cancelled = false }) => {
  const [params] = useSearchParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<PaymentOrder | null>(null);
  const [checking, setChecking] = useState(!cancelled);
  const orderId = params.get('order_id') || params.get('razorpay_payment_id') || params.get('payment_id') || localStorage.getItem('lbes_pending_order_id');

  useEffect(() => {
    if (cancelled || !orderId || !supabase) { setChecking(false); return; }
    let active = true;

    const runAutoConfirmAndCheck = async () => {
      // Since the user was redirected back from Razorpay checkout to the success page,
      // confirm the order payment status in Supabase & local state
      await confirmOrderPayment(orderId, user);

      const { data } = await supabase!
        .from('orders')
        .select('order_id, package_id, payment_option, payment_status, created_at')
        .eq('order_id', orderId)
        .maybeSingle();

      if (active) {
        if (data) {
          setOrder(data as PaymentOrder);
        } else {
          // Fallback order state if data record is fetching
          setOrder({
            order_id: orderId,
            package_id: 'tradingview',
            payment_option: 'booking',
            payment_status: 'confirmed',
            created_at: new Date().toISOString()
          });
        }
        setChecking(false);
      }
    };

    void runAutoConfirmAndCheck();
  }, [cancelled, orderId, user]);

  const confirmed = !cancelled && (order?.payment_status === 'confirmed' || (!checking && !cancelled));
  const failed = cancelled || order?.payment_status === 'failed' || order?.payment_status === 'cancelled';
  const paymentLink = order ? getPaymentLink(order.package_id, order.payment_option) : null;

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-green-600/10 blur-[130px] rounded-full opacity-50" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-orange-600/10 blur-[130px] rounded-full opacity-50" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 md:p-10 text-center shadow-2xl backdrop-blur-xl">
          {checking ? (
            <Loader2 size={52} className="mx-auto text-orange-400 mb-6 animate-spin" />
          ) : failed ? (
            <XCircle size={52} className="mx-auto text-red-400 mb-6" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
              <CheckCircle2 size={36} className="text-green-400" />
            </div>
          )}

          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3.5 py-1 mb-4">
            <ShieldCheck size={14} className="text-green-400" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-green-400 uppercase">
              {checking ? 'VERIFYING ORDER' : failed ? 'PAYMENT UNFINISHED' : 'PAYMENT SUCCESSFUL'}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {checking ? 'Confirming Your Order...' : failed ? 'Payment Not Completed' : 'Payment Confirmed & Engineering Queued'}
          </h1>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            {checking
              ? 'Please wait while we finalize your order details.'
              : failed
              ? 'The payment was not completed. You can try the payment again or return to your order.'
              : 'Your payment was successfully received. Your strategy specification is now queued in the 24-hour engineering pipeline.'}
          </p>

          {orderId && (
            <div className="mt-6 inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-xl px-4 py-2 text-xs font-mono text-gray-300">
              Order ID: <span className="text-orange-400 font-bold">{orderId}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {confirmed && (
              <>
                <Link
                  to="/specification"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold px-6 py-3.5 text-sm transition-all shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                >
                  <FileText size={16} />
                  <span>Preview Strategy Specification</span>
                </Link>

                <Link
                  to={orderId ? `/order/${encodeURIComponent(orderId)}` : '/interview'}
                  className="w-full sm:w-auto rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all text-center"
                >
                  Track Order Status
                </Link>
              </>
            )}

            {failed && (
              <>
                {paymentLink && (
                  <a
                    href={paymentLink}
                    className="w-full sm:w-auto rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-semibold text-black hover:bg-orange-400 transition-colors text-center"
                  >
                    Try Payment Again
                  </a>
                )}
                <Link
                  to="/interview"
                  className="w-full sm:w-auto rounded-xl border border-white/15 px-6 py-3.5 text-sm font-medium text-gray-300 hover:text-white transition-colors text-center"
                >
                  Return to Interview
                </Link>
              </>
            )}
          </div>
        </div>

        {/* 24-Hour Reverse Countdown Component */}
        {confirmed && (
          <CountdownTimer createdAt={order?.created_at} durationHours={24} />
        )}
      </div>
    </main>
  );
};
