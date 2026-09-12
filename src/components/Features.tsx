import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Zap, Mail, Slack, Database, Users, Calendar
} from 'lucide-react';
import { cn } from '../lib/utils';

// --- Feature Card Components ---

const FeatureCard = ({ 
  title, 
  description, 
  children, 
  className,
  delay = 0
}: { 
  title: string; 
  description: string; 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className={cn(
      "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-white/30 transition-all p-1 shadow-2xl",
      className
    )}
  >
    {/* Inner Card */}
    <div className="relative h-full flex flex-col rounded-[20px] overflow-hidden bg-black/20">
      {/* Visual Area */}
      <div className="relative h-[240px] w-full overflow-hidden flex items-center justify-center">
        {children}
      </div>
      
      {/* Text Content */}
      <div className="p-6 md:p-8 mt-auto relative z-10 bg-gradient-to-t from-black/60 to-transparent">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

// --- Visuals for Cards ---

const IntegrationsVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute w-40 h-40 bg-brand-blue/30 blur-[60px] rounded-full" />
    
    <div className="absolute w-[280px] h-[280px] border border-white/10 rounded-full" />
    <div className="absolute w-[180px] h-[180px] border border-white/20 rounded-full" />
    
    <div className="relative z-10 w-16 h-16 rounded-full glass flex items-center justify-center shadow-[0_0_30px_rgba(77,121,255,0.4)]">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-purple-600" />
    </div>

    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] animate-[spin_20s_linear_infinite]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-10 h-10 glass rounded-full flex items-center justify-center shadow-lg">
        <Slack size={18} className="text-[#E01E5A]" />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-10 h-10 glass rounded-full flex items-center justify-center shadow-lg">
        <Database size={18} className="text-[#00A4BD]" />
      </div>
      <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center shadow-lg">
        <Calendar size={18} className="text-[#FF7A59]" />
      </div>
      <div className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center shadow-lg">
        <Mail size={18} className="text-[#34A853]" />
      </div>
    </div>
  </div>
);

const ConversationalVisual = () => (
  <div className="relative w-full h-full p-8 flex flex-col justify-center">
    <div className="absolute right-0 top-0 w-64 h-64 bg-brand-red/20 blur-[80px] rounded-full" />
    
    <div className="self-end mb-4 max-w-[85%]">
      <div className="flex items-end gap-2">
        <div className="glass rounded-2xl rounded-tr-sm px-4 py-3 text-xs text-white shadow-lg border-white/20">
          Create a new customer record for John Smith
        </div>
        <div className="w-6 h-6 rounded-full bg-white/20 flex-shrink-0" />
      </div>
    </div>

    <div className="self-start max-w-[90%]">
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-blue to-brand-red flex-shrink-0 mt-1" />
        <div className="glass rounded-2xl rounded-tl-sm p-4 shadow-xl w-full border-white/20">
          <div className="text-xs text-gray-300 mb-3">All set!</div>
          <div className="bg-black/40 rounded-lg p-3 border border-white/10 space-y-2">
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-400">Customer</span>
              <span className="text-white">#C-1024 added to CRM</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-400">Assigned to</span>
              <span className="text-white">Sarah Lee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WorkflowVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 bg-brand-red/10 blur-[60px]" />
    <div className="relative z-10 flex flex-col gap-4 items-center">
       <div className="flex items-center gap-4">
          <div className="w-28 h-12 glass rounded-lg flex items-center justify-center gap-2 shadow-lg">
             <div className="w-6 h-6 rounded bg-brand-blue/20 flex items-center justify-center"><Users size={14} className="text-brand-blue"/></div>
             <span className="text-xs text-white">Agent</span>
          </div>
       </div>
       <div className="h-6 w-[2px] bg-white/20" />
       <div className="flex items-center gap-4">
          <div className="w-28 h-12 glass border-brand-red/50 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,77,77,0.2)]">
             <div className="w-6 h-6 rounded bg-brand-red/20 flex items-center justify-center"><Mail size={14} className="text-brand-red"/></div>
             <span className="text-xs text-white">Email Outreach</span>
          </div>
       </div>
       <div className="h-6 w-[2px] bg-white/20" />
       <div className="flex items-center gap-4">
          <div className="w-28 h-12 glass rounded-lg flex items-center justify-center gap-2 shadow-lg opacity-80">
             <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center"><MessageSquare size={14} className="text-green-400"/></div>
             <span className="text-xs text-white">Follow Up</span>
          </div>
       </div>
    </div>
  </div>
);

const MultiChannelVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
     <div className="absolute inset-0 bg-brand-blue/10 blur-[60px]" />
     <div className="grid grid-cols-2 gap-3 relative z-10 p-6">
        <div className="glass rounded-xl p-4 flex flex-col items-center gap-2 hover:border-brand-blue/50 transition-colors">
           <Mail size={24} className="text-brand-blue" />
           <span className="text-xs text-gray-300">Email</span>
        </div>
        <div className="glass rounded-xl p-4 flex flex-col items-center gap-2 hover:border-green-500/50 transition-colors">
           <MessageSquare size={24} className="text-green-400" />
           <span className="text-xs text-gray-300">SMS</span>
        </div>
        <div className="col-span-2 glass rounded-xl p-3 flex items-center justify-center gap-2 text-gray-300">
           <Zap size={16} className="text-brand-red" />
           <span className="text-xs">Auto-Trigger Enabled</span>
        </div>
     </div>
  </div>
);

export const Features = () => {
  return (
    <section className="w-full relative z-10">
      <div className="pb-32 px-6 max-w-7xl mx-auto pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <FeatureCard 
            title="Seamless Integrations" 
            description="Integrate Slack, HubSpot, Zendesk & more—automate data flow instantly."
            delay={0.1}
          >
            <IntegrationsVisual />
          </FeatureCard>

          <FeatureCard 
            title="Conversational Actions" 
            description="Create records, assign tasks & queue emails with a simple prompt in seconds flat."
            delay={0.2}
          >
            <ConversationalVisual />
          </FeatureCard>

          <FeatureCard 
            title="Visual Workflow Designer" 
            description="Drag & drop AI actions to build workflows visually—no coding required."
            delay={0.3}
          >
            <WorkflowVisual />
          </FeatureCard>

          <FeatureCard 
            title="Multi-Channel Automation" 
            description="Trigger email, SMS & chat messages automatically on schedule."
            delay={0.4}
          >
            <MultiChannelVisual />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};
