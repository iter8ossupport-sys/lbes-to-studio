export type Market = 'forex' | 'gold' | 'crypto' | 'stocks' | 'indices' | 'other';
export type Platform = 'tradingview' | 'mt5' | 'tradingview-mt5';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type StrategyMaturity = 'in-head' | 'partially-written' | 'fully-written' | 'already-implemented';
export type StrategyType = 'trend-following' | 'breakout' | 'liquidity-sweep' | 'smart-money' | 'support-resistance' | 'price-action' | 'indicator-based' | 'pattern-based' | 'custom';

export type OrderStatus = 
  | 'package-selected'
  | 'interview-started'
  | 'interview-in-progress'
  | 'interview-complete'
  | 'summary-generated'
  | 'customer-review'
  | 'customer-approved'
  | 'terms-accepted'
  | 'payment-pending'
  | 'payment-confirmed'
  | 'order-confirmed'
  | 'engineering-queued'
  | 'engineering'
  | 'backtest'
  | 'qa'
  | 'ready'
  | 'delivered';

export interface CalibrationData {
  markets: Market[];
  platform: Platform;
  strategyMaturity: StrategyMaturity;
  experienceLevel: ExperienceLevel;
  strategyType: StrategyType;
}

export interface Question {
  id: string;
  section: InterviewSection;
  question: string;
  placeholder: string;
  helperText?: string;
  whyWeAreAsking?: string;
  answerStructure?: string[];
  followUpCondition?: (answer: string) => boolean;
  dependsOn?: string[];
  required: boolean;
  priority: number;
}

export type InterviewSection = 
  | 'calibration'
  | 'trading-foundation'
  | 'strategy-discovery'
  | 'entry-logic'
  | 'trade-management'
  | 'risk-filters'
  | 'engineering-check';

export interface Answer {
  questionId: string;
  answer: string;
  timestamp: Date;
  edited: boolean;
  needsClarification: boolean;
}

export interface InterviewState {
  id: string;
  calibration: CalibrationData | null;
  answers: Record<string, Answer>;
  currentSection: InterviewSection;
  currentQuestionIndex: number;
  askedQuestions: string[];
  skippedQuestions: string[];
  readiness: number;
  status: OrderStatus;
  startedAt: Date;
  lastUpdated: Date;
}

export interface StrategySpecification {
  id: string;
  interviewId: string;
  sections: SpecificationSection[];
  generatedAt: Date;
  approved: boolean;
  approvedAt?: Date;
}

export interface SpecificationSection {
  id: string;
  title: string;
  content: string;
  status: 'captured' | 'in-progress' | 'needs-clarification' | 'not-defined';
  editPath: string;
}

export interface Package {
  id: 'tradingview' | 'tradingview-mt5' | 'full';
  name: string;
  price: number;
  description: string;
  features: string[];
  deliveryTarget: string;
}

export interface Order {
  id: string;
  interviewId: string;
  packageId: Package['id'];
  status: OrderStatus;
  paymentOption: 'booking' | 'full' | null;
  paymentConfirmed: boolean;
  createdAt: Date;
  deliveryTarget?: Date;
}

export const PACKAGES: Package[] = [
  {
    id: 'tradingview',
    name: 'TradingView Indicator',
    price: 19,
    description: 'Turn my strategy into TradingView software.',
    features: [
      'Adaptive strategy interview',
      'AI interview assistance',
      'Strategy summary',
      'TradingView indicator',
      '6-month backtest',
      '5+ pairs',
      'Multiple timeframes',
      '24–48 hour delivery target'
    ],
    deliveryTarget: '24–48 hours'
  },
  {
    id: 'tradingview-mt5',
    name: 'TradingView + MT5',
    price: 29,
    description: 'Take my strategy from TradingView into MT5.',
    features: [
      'Everything in TradingView Indicator',
      'MT5 implementation',
      'MT5 source/code deliverable',
      '1-year backtest'
    ],
    deliveryTarget: '48–72 hours'
  },
  {
    id: 'full',
    name: 'Full Engineering',
    price: 49,
    description: 'Give my strategy the full engineering treatment.',
    features: [
      'Everything in TradingView + MT5',
      '10+ pairs',
      '2+ timeframes per pair',
      'Broader backtesting package',
      'Complete MT5 engineering deliverables',
      'VPS setup guidance'
    ],
    deliveryTarget: '5–7 days'
  }
];
