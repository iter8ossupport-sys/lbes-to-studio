import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Sparkles, Zap, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

// --- VISUAL COMPONENTS ---

const WorkflowVisual = () => (
  <div className="relative w-full h-full bg-[#050505] overflow-hidden rounded-2xl border border-white/5 flex items-center justify-center">
    {/* Left Glow Line */}
    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-orange-500 to-blue-500 opacity-80" />
    <div className="absolute left-0 top-1/4 bottom-1/4 w-24 bg-gradient-to-r from-orange-500/20 to-transparent blur-xl" />

    {/* Abstract UI Stack */}
    <div className="relative z-10 w-[280px] flex flex-col gap-4">
      {/* Floating Orb */}
      <div className="mx-auto mb-6 relative">
        <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-black" />
        </div>
      </div>

      {/* Button 1: AI Analyst (Gradient) */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-600 rounded-xl blur-[2px] opacity-70" />
        <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center justify-center">
          <span className="text-white font-medium tracking-wide">
            AI Analyst
          </span>
        </div>
      </div>

      {/* Button 2: Workflows */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 flex items-center justify-center text-gray-400">
        <span>Workflows</span>
      </div>

      {/* Button 3: Data Summary */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 flex items-center justify-center text-gray-400">
        <span>Data Summary</span>
      </div>

      {/* Button 4: Ask Questions (Blue Glow) */}
      <div className="relative mt-2 overflow-hidden rounded-xl p-[1px]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-50" />
        <div className="relative bg-black/60 backdrop-blur-md rounded-xl p-4 flex items-center justify-center">
          <span className="text-blue-100 font-medium">Ask Questions</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-500/20 to-transparent pointer-events-none" />
      </div>
    </div>

    {/* Background Mesh */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
  </div>
);

const ChatVisual = () => (
  <div className="relative w-full h-full bg-[#020408] overflow-hidden rounded-2xl border border-white/5 flex flex-col justify-center p-8">
    {/* Bottom Glow */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-orange-500 to-purple-500" />
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600/10 to-transparent blur-2xl" />

    <div className="space-y-6 relative z-10 max-w-[340px] mx-auto w-full">
      {/* Message 1 (Right) */}
      <div className="flex items-start justify-end gap-3">
        <div className="bg-[#151515] border border-white/10 text-gray-300 px-4 py-3 rounded-2xl rounded-tr-sm text-sm shadow-lg">
          Sure. I will draft the email workflow now.
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-900/20 border border-blue-500/30 flex items-center justify-center">
          <Sparkles size={14} className="text-blue-400" />
        </div>
      </div>

      {/* Message 2 (Left) */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden border border-white/10">
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-[#0A0A0A] border border-blue-500/30 text-white px-4 py-3 rounded-2xl rounded-tl-sm text-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          Please schedule it for tomorrow
        </div>
      </div>

      {/* Message 3 (Right - Active) */}
      <div className="flex items-start justify-end gap-3">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl rounded-tr-sm blur-[2px] opacity-40" />
          <div className="relative bg-[#0B1221] border border-blue-500/50 text-blue-100 px-4 py-3 rounded-2xl rounded-tr-sm text-sm">
            Done! Anything else?
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-900/20 border border-orange-500/30 flex items-center justify-center">
          <Zap size={14} className="text-orange-400" />
        </div>
      </div>
    </div>
  </div>
);

const AnalyticsVisual = () => (
  <div className="relative w-full h-full bg-[#050505] overflow-hidden rounded-2xl border border-white/5 flex items-center justify-center">
    {/* Background Gradient */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full" />

    <div className="relative z-10 w-[300px] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm font-medium text-gray-300">Performance</div>
        <div className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
          Last 7 days
        </div>
      </div>

      {/* Bar Chart Mockup */}
      <div className="flex items-end justify-between h-[140px] gap-2">
        {[40, 70, 45, 90, 65, 85, 50].map((h, i) => (
          <div
            key={i}
            className="w-full bg-white/5 rounded-t-sm relative group overflow-hidden"
            style={{ height: `${h}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
            {i === 3 && (
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500 shadow-[0_0_10px_#F97316]" />
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          Tasks Completed
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          Efficiency
        </div>
      </div>
    </div>
  </div>
);

// --- CARD COMPONENT ---

interface CardProps {
  i: number;
  title: string;
  description: string;
  features: string[];
  Visual: React.FC;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  features,
  Visual,
  progress,
  range,
  targetScale,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, 0.3]); // Fade out as it moves up/gets covered

  // Custom star icon for bullets
  const StarBullet = () => (
    <div className="relative w-5 h-5 flex-shrink-0 mt-0.5">
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <defs>
          <linearGradient
            id={`star-grad-${i}`}
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
        <path
          d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
          fill={`url(#star-grad-${i})`}
        />
      </svg>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{ scale, opacity, top: `calc(-5% + ${i * 25}px)` }}
        className="relative flex flex-col md:flex-row gap-8 md:gap-12 w-full max-w-6xl h-[60vh] md:h-[550px] bg-gradient-to-br from-[#0A0A0A] to-[#050505] border border-white/10 rounded-[32px] p-6 md:p-12 shadow-2xl overflow-hidden origin-top"
      >
        {/* Layout Switch based on index (Alternating) */}
        <div
          className={cn(
            "flex flex-col md:flex-row w-full h-full gap-8 md:gap-12",
            i % 2 === 0 ? "" : "md:flex-row-reverse"
          )}
        >
          {/* Visual Side */}
          <div className="flex-1 w-full h-full min-h-[250px] rounded-2xl overflow-hidden">
            <Visual />
          </div>

          {/* Content Side */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {description}
            </p>
            <ul className="space-y-4">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <StarBullet />
                  <span className="text-gray-300 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className="mt-10 w-fit flex items-center gap-2 text-white font-medium border-b border-orange-500 pb-1 hover:text-orange-500 transition-colors group"
              name="learn-more"
            >
              Learn more
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN COMPONENT ---

const projects = [
  {
    title: "No-Code Workflow Builder",
    description:
      "Design complex, multi-step automations with drag-and-drop ease—no coding required.",
    features: [
      "Visual workflow canvas",
      "Pre-built action blocks",
      "Conditional logic & branching",
    ],
    Visual: WorkflowVisual,
  },
  {
    title: "Natural-Language Interaction",
    description:
      "Chat with your AI agents to run tasks, query data, or generate content—just type what you need.",
    features: [
      "Context-aware Q&A",
      "Instant task execution",
      "Follow-up action chaining",
    ],
    Visual: ChatVisual,
  },
  {
    title: "Real-Time Analytics & Insights",
    description:
      "Track performance metrics and get actionable insights on your AI workforce in real-time.",
    features: [
      "Live performance dashboards",
      "Efficiency bottlenecks detection",
      "Automated reporting",
    ],
    Visual: AnalyticsVisual,
  },
];

export const StackedCards = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="py-24 relative z-20">
      {/* Header for the section */}
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-24 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Everything you need to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500">
            scale your operations
          </span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Powerful tools designed to help you build, manage, and optimize your
          AI workforce without writing a single line of code.
        </p>
      </div>

      {/* Scroll Container */}
      <div ref={containerRef} className="relative px-4 md:px-6">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={i}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};
