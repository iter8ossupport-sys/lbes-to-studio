import { motion } from "framer-motion";
import {
  OpenAILogo,
  ClaudeLogo,
  GeminiLogo,
  CohereLogo,
  GrokLogo,
  PerplexityLogo,
  LlamaLogo,
  DeepSeekLogo,
  DeepgramLogo,
  ElevenLabsLogo,
  RunwayLogo,
} from "../components/ui/BrandLogos";
import { CTA } from "../components/CTA";
import { GradientBorder } from "../components/ui/GradientBorder";
import { RollingText } from "../components/ui/RollingText";
import { Slack, Database, MessageSquare, Zap, Globe, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// --- INTEGRATION DATA ---

const integrations = [
  {
    id: "openai",
    name: "OpenAI",
    description:
      "OpenAI's groundbreaking models empower Converge AI to deliver natural, human-like conversations, creative assistance.",
    icon: OpenAILogo,
    color:
      "hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)]",
    iconColor: "text-white",
  },
  {
    id: "claude",
    name: "Claude",
    description:
      "Claude's advanced reasoning and context understanding make Converge AI smarter and more intuitive for deep problem-solving.",
    icon: ClaudeLogo,
    color:
      "hover:border-[#D97757]/50 hover:shadow-[0_0_30px_rgba(217,119,87,0.1)]",
    iconColor: "text-white",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    description:
      "Gemini's innovative AI features enrich Converge AI with cutting-edge tools for creativity, data analysis, and seamless collaboration.",
    icon: GeminiLogo,
    color:
      "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]",
    iconColor: "text-white",
  },
  {
    id: "cohere",
    name: "Cohere",
    description:
      "Cohere's robust natural language processing powers Converge AI with exceptional text understanding, generation, and analysis capabilities.",
    icon: CohereLogo,
    color:
      "hover:border-[#39594D]/50 hover:shadow-[0_0_30px_rgba(57,89,77,0.1)]",
    iconColor: "text-white",
  },
  {
    id: "grok",
    name: "Grok",
    description:
      "Grok brings rapid responsiveness and insightful AI solutions to Converge AI, enhancing productivity and delivering dynamic user experiences.",
    icon: GrokLogo,
    color:
      "hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    iconColor: "text-white",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    description:
      "Perplexity's focus on precision and exploration enhances Converge AI's search and discovery features, delivering accurate, in-depth insights.",
    icon: PerplexityLogo,
    color:
      "hover:border-[#22B8CD]/50 hover:shadow-[0_0_30px_rgba(34,184,205,0.1)]",
    iconColor: "text-white",
  },
  {
    id: "llama",
    name: "Llama",
    description:
      "Meta's LLaMA represents a cutting-edge effort in generative AI, offering advanced capabilities for natural language understanding.",
    icon: LlamaLogo,
    color:
      "hover:border-[#0668E1]/50 hover:shadow-[0_0_30px_rgba(6,104,225,0.1)]",
    iconColor: "text-white",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description:
      "DeepSeek's new R1 model is a breakthrough in AI-driven search, combining semantic understanding with advanced contextual analysis.",
    icon: DeepSeekLogo,
    color:
      "hover:border-[#4D6BFE]/50 hover:shadow-[0_0_30px_rgba(77,107,254,0.1)]",
    iconColor: "text-white",
  },
  {
    id: "deepgram",
    name: "Deepgram",
    description:
      "Deepgram TTS (Text-to-Speech) leverages end-to-end deep learning to deliver remarkably natural, real-time voice synthesis.",
    icon: DeepgramLogo,
    color:
      "hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    iconColor: "text-white",
  },
  {
    id: "elevenlabs",
    name: "Eleven Labs",
    description:
      "Eleven Labs' TTS stands out for its hyper-realistic voice generation, supporting multiple voices and languages, making it a popular choice.",
    icon: ElevenLabsLogo,
    color:
      "hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    iconColor: "text-white",
  },
  {
    id: "runway",
    name: "Runway",
    description:
      "Runway is an applied research company building the next era of art, entertainment and human creativity.",
    icon: RunwayLogo,
    color:
      "hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    iconColor: "text-white",
  },
];

// --- HERO VISUAL ---

const HeroVisual = () => (
  <div className="relative w-full h-[400px] flex items-center justify-center">
    {/* Background Glow */}
    <div className="absolute w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full" />

    {/* Orbital Rings */}
    <div className="absolute w-[320px] h-[320px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
    <div className="absolute w-[220px] h-[220px] border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

    {/* Center Node */}
    <div className="relative z-10 w-24 h-24 rounded-full bg-black border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.2)] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-orange-500/20" />
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg" />
    </div>

    {/* Floating Icons */}
    <div className="absolute inset-0 animate-[spin_60s_linear_infinite]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6">
        <div className="w-12 h-12 bg-[#0A0A0A] border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
          <Slack size={20} className="text-[#E01E5A]" />
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6">
        <div className="w-12 h-12 bg-[#0A0A0A] border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
          <Database size={20} className="text-[#FF7A59]" />
        </div>
      </div>
      <div className="absolute left-0 top-1/2 -translate-x-6 -translate-y-1/2">
        <div className="w-12 h-12 bg-[#0A0A0A] border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
          <MessageSquare size={20} className="text-[#25D366]" />
        </div>
      </div>
      <div className="absolute right-0 top-1/2 translate-x-6 -translate-y-1/2">
        <div className="w-12 h-12 bg-[#0A0A0A] border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
          <Zap size={20} className="text-[#FF4F00]" />
        </div>
      </div>
    </div>
  </div>
);

export const Integrations = () => {
  return (
    <div className="relative w-full min-h-screen pt-32 bg-[#050505] overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-orange-600/10 blur-[120px] rounded-full opacity-40" />
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-600/10 blur-[120px] rounded-full opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-24">
        {/* --- HERO SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block border border-white/20 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8"
            >
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase">
                INTEGRATIONS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-semibold text-white tracking-tight mb-6 leading-[1.1]"
            >
              Connect Converge <br />
              AI to Your Entire <br />
              Stack
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-400 max-w-xl leading-relaxed mb-8"
            >
              One-click connectors sync Slack, HubSpot, Salesforce, and 50+
              tools—automate instantly. Open API covers the rest.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GradientBorder
                gradient="from-orange-500 via-red-500 to-orange-600"
                containerClassName="rounded-full p-[1px]"
              >
                <Link
                  to="/waitlist"
                  className="px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-900 transition-colors group"
                >
                  <RollingText text="Get Started" />
                </Link>
              </GradientBorder>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <HeroVisual />
          </motion.div>
        </div>

        {/* --- INTEGRATIONS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300 group ${item.color}`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <item.icon className={`w-8 h-8 ${item.iconColor}`} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CTA />
    </div>
  );
};
