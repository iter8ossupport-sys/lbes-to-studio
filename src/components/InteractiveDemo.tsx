import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  ChevronDown,
  Globe,
  Mail,
  Users,
  BarChart2,
  Calendar,
  User,
  Sun,
  LogOut,
  Sidebar,
} from "lucide-react";
import { cn } from "../lib/utils";

// --- Chat Components ---

const ChatBubble = ({
  isAi,
  text,
  delay,
}: {
  isAi: boolean;
  text: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className={cn(
      "flex gap-4 max-w-[80%] mb-6",
      isAi ? "self-start" : "self-end flex-row-reverse"
    )}
  >
    {/* Avatar */}
    <div
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
        isAi ? "bg-transparent" : "bg-gray-700 overflow-hidden"
      )}
    >
      {isAi ? (
        <div className="relative w-8 h-8">
          <Sparkles
            className="w-6 h-6 text-blue-500 absolute top-1 left-1"
            fill="currentColor"
            fillOpacity={0.2}
          />
          <Sparkles className="w-6 h-6 text-orange-500 absolute top-1 left-1 blur-[1px]" />
        </div>
      ) : (
        <img
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          alt="User"
          className="w-full h-full object-cover"
        />
      )}
    </div>

    {/* Bubble */}
    <div
      className={cn(
        "p-4 rounded-2xl text-sm leading-relaxed shadow-lg border",
        isAi
          ? "bg-[#0A0A0A] border-white/10 rounded-tl-none text-gray-300"
          : "bg-[#1A1A1A] border-white/10 rounded-tr-none text-gray-200"
      )}
    >
      {text}
    </div>
  </motion.div>
);

export const InteractiveDemo = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [typedText, setTypedText] = useState("");
  const fullText = "Schedule meetings and send invites au";

  useEffect(() => {
    if (isInView) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 60);

      return () => clearInterval(typingInterval);
    }
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full py-24 px-4 flex justify-center items-center overflow-hidden"
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* MAIN UI CONTAINER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-[1100px] h-[750px] bg-gradient-to-br from-[#030303] to-[#080808] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex"
      >
        {/* Animated Border Beam */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
          <div className="absolute inset-[-50%] animate-[spin_10s_linear_infinite] opacity-20">
            <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]" />
          </div>
        </div>

        {/* Inner Border to hide the beam overflow inside */}
        <div className="absolute inset-[1px] bg-gradient-to-br from-[#030303] to-[#080808] rounded-[23px] z-0" />

        {/* --- LEFT SIDEBAR --- */}
        <div className="relative z-10 w-72 bg-[#050505] border-r border-white/5 flex flex-col p-6 hidden md:flex">
          {/* Window Controls */}
          <div className="flex gap-2 mb-8">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-black overflow-hidden shadow-lg shadow-blue-900/20">
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              Converge AI
            </span>
            <Sidebar size={16} className="ml-auto text-gray-600" />
          </div>

          {/* New Chat Button */}
          <button
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-gray-200 text-sm font-medium transition-all mb-8 shadow-sm group"
            name="new-chat"
          >
            <Sparkles
              size={16}
              className="text-blue-500 group-hover:text-blue-400 transition-colors"
            />
            New Chat
          </button>

          {/* Menu Items */}
          <div className="flex flex-col gap-2 flex-1">
            {[
              { icon: Mail, label: "Email Outreach" },
              { icon: Users, label: "Customer Follow-Up" },
              { icon: BarChart2, label: "Data Analysis" },
              { icon: Calendar, label: "Meeting Scheduler" },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-200 hover:bg-white/[0.03] transition-all cursor-pointer"
              >
                <item.icon
                  size={16}
                  className="text-gray-600 group-hover:text-gray-400 transition-colors"
                />
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-3">
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:text-white cursor-pointer transition-colors">
              <User size={16} />
              <span>My account</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:text-white cursor-pointer transition-colors">
              <Sun size={16} />
              <span>Light mode</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:text-red-400 cursor-pointer transition-colors">
              <LogOut size={16} />
              <span>Log out</span>
            </div>
          </div>
        </div>

        {/* --- MAIN CHAT AREA --- */}
        <div className="relative z-10 flex-1 bg-black/40 flex flex-col">
          {/* Chat History */}
          <div className="flex-1 p-8 md:p-12 overflow-y-auto flex flex-col">
            <div className="mt-auto">
              {" "}
              {/* Push content to bottom */}
              <ChatBubble
                isAi={false}
                text="Hey, can you generate a customer follow-up list"
                delay={0.2}
              />
              <ChatBubble
                isAi={true}
                text="Hey Mark – Done — compiled 60 leads and emailed the list to you. Ready for your outreach!"
                delay={0.8}
              />
              <ChatBubble
                isAi={false}
                text="That's awesome, thanks!"
                delay={1.4}
              />
              <ChatBubble
                isAi={true}
                text="Want me to draft a quick template for your outreach?"
                delay={2.0}
              />
              <ChatBubble
                isAi={false}
                text="Yes please—that'd be a huge help!"
                delay={2.6}
              />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 md:p-10 pt-0">
            <div className="relative rounded-2xl p-[1px] overflow-hidden group">
              {/* Input Border Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-transparent to-orange-500/50 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-[#080808] rounded-2xl p-4 flex flex-col gap-4">
                {/* Top Bar: Model Selector & Input */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-gray-300 hover:bg-white/10 cursor-pointer transition-colors shrink-0">
                    <Sparkles size={12} className="text-blue-400" />
                    GPT 4.5
                    <ChevronDown size={12} className="text-gray-500" />
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white cursor-pointer transition-colors">
                    <Globe size={14} />
                  </div>
                </div>

                {/* Text Input */}
                <div className="min-h-[24px] text-lg text-gray-200 font-light">
                  {typedText}
                  <span className="inline-block w-[2px] h-5 bg-orange-500 ml-0.5 align-middle animate-pulse" />
                </div>

                {/* Bottom Bar: Tabs & Send */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-medium text-white border border-white/5"
                      name="chat"
                    >
                      Chat
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-lg hover:bg-white/5 text-xs font-medium text-gray-500 hover:text-gray-300 transition-colors"
                      name="launch-workflow"
                    >
                      Launch Workflow
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-lg hover:bg-white/5 text-xs font-medium text-gray-500 hover:text-gray-300 transition-colors"
                      name="data-analysis"
                    >
                      Data Analysis
                    </button>
                  </div>

                  <button
                    className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#1A1A1A] border border-orange-500/30 text-white text-xs font-medium hover:bg-orange-500/10 hover:border-orange-500/60 transition-all group/btn"
                    name="send"
                  >
                    <Sparkles
                      size={14}
                      className="text-orange-500 group-hover/btn:scale-110 transition-transform"
                    />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
