import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  createdAt?: string | Date;
  durationHours?: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  createdAt,
  durationHours = 24
}) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number; isExpired: boolean }>({
    hours: durationHours - 1,
    minutes: 59,
    seconds: 59,
    isExpired: false
  });

  useEffect(() => {
    const startTime = createdAt ? new Date(createdAt).getTime() : Date.now();
    const targetTime = startTime + durationHours * 60 * 60 * 1000;

    const updateTimer = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds, isExpired: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [createdAt, durationHours]);

  const pad = (n: number) => String(n).padStart(2, '0');

  if (timeLeft.isExpired) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-semibold">
        <Clock size={16} />
        <span>24-Hour Kickoff Window Active — Engineering in Progress</span>
      </div>
    );
  }

  return (
    <div className="bg-[#0D0D0D] border border-orange-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(249,115,22,0.1)] text-center">
      <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-orange-400 uppercase mb-3">
        <Clock size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
        <span>24-Hour Reverse Engineering Kickoff Countdown</span>
      </div>

      <div className="flex items-center justify-center gap-3 md:gap-4 my-2">
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/60 border border-white/10 rounded-xl px-3 py-2 min-w-[64px]">
            {pad(timeLeft.hours)}
          </span>
          <span className="text-[10px] text-gray-400 font-semibold uppercase mt-1">Hours</span>
        </div>

        <span className="text-2xl md:text-4xl font-bold text-orange-500 pb-4">:</span>

        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/60 border border-white/10 rounded-xl px-3 py-2 min-w-[64px]">
            {pad(timeLeft.minutes)}
          </span>
          <span className="text-[10px] text-gray-400 font-semibold uppercase mt-1">Mins</span>
        </div>

        <span className="text-2xl md:text-4xl font-bold text-orange-500 pb-4">:</span>

        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-mono font-bold text-white bg-black/60 border border-white/10 rounded-xl px-3 py-2 min-w-[64px]">
            {pad(timeLeft.seconds)}
          </span>
          <span className="text-[10px] text-gray-400 font-semibold uppercase mt-1">Secs</span>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Your order is active. 1 order per account executes within this 24-hour pipeline.
      </p>
    </div>
  );
};
