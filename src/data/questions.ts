import { Question, StrategyType, ExperienceLevel } from '../types/interview';

export const CALIBRATION_QUESTIONS = [
  {
    id: 'markets',
    question: 'What do you trade?',
    options: [
      { value: 'forex', label: 'Forex' },
      { value: 'gold', label: 'Gold' },
      { value: 'crypto', label: 'Crypto' },
      { value: 'stocks', label: 'Stocks' },
      { value: 'indices', label: 'Indices' },
      { value: 'other', label: 'Other' }
    ],
    multiSelect: true
  },
  {
    id: 'platform',
    question: 'Where do you want your strategy engineered?',
    options: [
      { value: 'tradingview', label: 'TradingView' },
      { value: 'mt5', label: 'MT5' },
      { value: 'tradingview-mt5', label: 'TradingView + MT5' }
    ],
    multiSelect: false
  },
  {
    id: 'strategyMaturity',
    question: 'How defined is your strategy today?',
    options: [
      { value: 'in-head', label: 'Mostly in my head' },
      { value: 'partially-written', label: 'Partially written down' },
      { value: 'fully-written', label: 'Fully written' },
      { value: 'already-implemented', label: 'Already implemented, but needs improvement/testing' }
    ],
    multiSelect: false
  },
  {
    id: 'experienceLevel',
    question: 'How would you describe your experience with trading?',
    options: [
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' }
    ],
    multiSelect: false
  },
  {
    id: 'strategyType',
    question: 'How do you usually identify a trading opportunity?',
    options: [
      { value: 'trend-following', label: 'Trend Following' },
      { value: 'breakout', label: 'Breakout' },
      { value: 'liquidity-sweep', label: 'Liquidity Sweep' },
      { value: 'smart-money', label: 'Smart Money Concepts' },
      { value: 'support-resistance', label: 'Support & Resistance' },
      { value: 'price-action', label: 'Price Action' },
      { value: 'indicator-based', label: 'Indicators' },
      { value: 'pattern-based', label: 'Pattern Based' },
      { value: 'custom', label: 'Custom / Other' }
    ],
    multiSelect: false
  }
];

export const getQuestionsForStrategy = (
  strategyType: StrategyType,
  experienceLevel: ExperienceLevel
): Question[] => {
  const baseQuestions = getBaseQuestions(experienceLevel);
  const strategySpecificQuestions = getStrategySpecificQuestions(strategyType, experienceLevel);
  
  return [...baseQuestions, ...strategySpecificQuestions].sort((a, b) => a.priority - b.priority);
};

const getBaseQuestions = (level: ExperienceLevel): Question[] => {
  const isBeginner = level === 'beginner';
  const isAdvanced = level === 'advanced';

  return [
    {
      id: 'setup-definition',
      section: 'strategy-discovery',
      question: isBeginner 
        ? 'Let\'s start with the setup. What needs to happen on the chart for you to start paying attention to a potential trade?'
        : 'What conditions must be present for a valid setup to exist?',
      placeholder: isBeginner 
        ? 'Describe what you look for...'
        : 'Describe the setup conditions...',
      helperText: isBeginner 
        ? 'Example: "I wait for price to break above a resistance level that has been tested multiple times"'
        : undefined,
      whyWeAreAsking: isBeginner 
        ? 'Why we\'re asking: A developer needs to know exactly what creates a valid trading opportunity in your strategy.'
        : undefined,
      required: true,
      priority: 10
    },
    {
      id: 'setup-context',
      section: 'strategy-discovery',
      question: isBeginner
        ? 'What market conditions need to exist before your setup can happen? For example, is there a specific trend direction or market phase you look for?'
        : 'What market context or conditions must exist before this setup becomes valid?',
      placeholder: 'Describe the market context...',
      required: true,
      priority: 11
    },
    {
      id: 'entry-trigger',
      section: 'entry-logic',
      question: isBeginner
        ? 'Once you see your setup, what specific thing makes you actually enter the trade? What\'s the trigger?'
        : 'What is the exact entry trigger after the setup forms?',
      placeholder: 'Describe your entry trigger...',
      helperText: isBeginner
        ? 'Example: "I enter when the candle closes above the breakout level"'
        : undefined,
      required: true,
      priority: 20
    },
    {
      id: 'entry-confirmation',
      section: 'entry-logic',
      question: isBeginner
        ? 'Do you wait for any confirmation before entering, or do you enter immediately when the trigger happens?'
        : 'What confirmation, if any, is required before entry?',
      placeholder: 'Describe confirmation requirements...',
      required: false,
      priority: 21
    },
    {
      id: 'stop-loss',
      section: 'trade-management',
      question: isBeginner
        ? 'Where do you place your stop loss? What makes that location valid?'
        : 'What is the stop loss placement logic?',
      placeholder: 'Describe your stop loss logic...',
      required: true,
      priority: 30
    },
    {
      id: 'take-profit',
      section: 'trade-management',
      question: isBeginner
        ? 'Where do you take profit? Do you have one target, multiple targets, or something else?'
        : 'What is the take profit logic?',
      placeholder: 'Describe your take profit logic...',
      required: true,
      priority: 31
    },
    {
      id: 'risk-per-trade',
      section: 'risk-filters',
      question: isBeginner
        ? 'How much of your account do you risk on each trade?'
        : 'What is your risk per trade?',
      placeholder: 'Describe your risk per trade...',
      required: true,
      priority: 40
    },
    {
      id: 'conditions-to-avoid',
      section: 'risk-filters',
      question: isBeginner
        ? 'Are there situations where you would NOT take a trade, even if the setup looks good?'
        : 'What conditions would cause you to skip a valid setup?',
      placeholder: 'Describe conditions to avoid...',
      required: false,
      priority: 41
    },
    {
      id: 'timeframes',
      section: 'trading-foundation',
      question: 'Which timeframes do you use for this strategy?',
      placeholder: 'List your timeframes...',
      required: true,
      priority: 5
    },
    {
      id: 'sessions',
      section: 'risk-filters',
      question: isBeginner
        ? 'Do you only trade during certain times of day or trading sessions?'
        : 'Are there session or time-of-day restrictions?',
      placeholder: 'Describe session restrictions...',
      required: false,
      priority: 42
    },
    {
      id: 'discretionary-elements',
      section: 'engineering-check',
      question: 'Are there parts of your strategy that you handle differently depending on the situation? Things that require your judgment rather than a fixed rule?',
      placeholder: 'Describe any discretionary elements...',
      required: false,
      priority: 50
    },
    {
      id: 'missing-information',
      section: 'engineering-check',
      question: 'Is there anything important about your strategy that we haven\'t asked about?',
      placeholder: 'Add any additional information...',
      required: false,
      priority: 51
    }
  ];
};

const getStrategySpecificQuestions = (
  strategyType: StrategyType,
  level: ExperienceLevel
): Question[] => {
  const isBeginner = level === 'beginner';
  const isAdvanced = level === 'advanced';

  switch (strategyType) {
    case 'trend-following':
      return [
        {
          id: 'trend-definition',
          section: 'strategy-discovery',
          question: isBeginner
            ? 'How do you know if the market is trending? What tells you the direction?'
            : 'How do you define and identify the trend?',
          placeholder: 'Describe trend definition...',
          required: true,
          priority: 12
        },
        {
          id: 'pullback-definition',
          section: 'strategy-discovery',
          question: isBeginner
            ? 'When price pulls back against the trend, what makes you decide it\'s a good time to enter?'
            : 'What constitutes a valid pullback for entry?',
          placeholder: 'Describe pullback criteria...',
          required: false,
          priority: 13
        }
      ];

    case 'breakout':
      return [
        {
          id: 'range-definition',
          section: 'strategy-discovery',
          question: isBeginner
            ? 'How do you identify the range or level that needs to break?'
            : 'What defines the range or level for the breakout?',
          placeholder: 'Describe range/level definition...',
          required: true,
          priority: 12
        },
        {
          id: 'false-breakout',
          section: 'entry-logic',
          question: isBeginner
            ? 'How do you avoid false breakouts? Is there something that confirms the breakout is real?'
            : 'How do you filter or handle false breakouts?',
          placeholder: 'Describe false breakout handling...',
          required: false,
          priority: 22
        }
      ];

    case 'support-resistance':
      return [
        {
          id: 'level-definition',
          section: 'strategy-discovery',
          question: isBeginner
            ? 'What makes a support or resistance level valid in your strategy? How many touches, what timeframe?'
            : 'What constitutes a valid support or resistance level?',
          placeholder: 'Describe level validity criteria...',
          required: true,
          priority: 12
        },
        {
          id: 'level-reaction',
          section: 'entry-logic',
          question: isBeginner
            ? 'When price reaches a level, what reaction do you look for before entering?'
            : 'What price action confirms a valid reaction at the level?',
          placeholder: 'Describe level reaction confirmation...',
          required: true,
          priority: 22
        }
      ];

    case 'indicator-based':
      return [
        {
          id: 'indicators-used',
          section: 'strategy-discovery',
          question: 'Which specific indicators do you use? Please include the exact settings if you know them.',
          placeholder: 'List indicators and settings...',
          required: true,
          priority: 12
        },
        {
          id: 'indicator-conditions',
          section: 'entry-logic',
          question: isBeginner
            ? 'What has to happen between your indicators for you to enter a trade?'
            : 'What specific indicator conditions must be met for entry?',
          placeholder: 'Describe indicator conditions...',
          required: true,
          priority: 22
        }
      ];

    case 'price-action':
      return [
        {
          id: 'structure-definition',
          section: 'strategy-discovery',
          question: isBeginner
            ? 'What market structure do you look for? Higher highs, lower lows, or something else?'
            : 'What market structure patterns do you trade?',
          placeholder: 'Describe market structure...',
          required: true,
          priority: 12
        },
        {
          id: 'candle-patterns',
          section: 'entry-logic',
          question: isBeginner
            ? 'Do you look for specific candle patterns before entering?'
            : 'What candlestick patterns or price action signals confirm entry?',
          placeholder: 'Describe candle/pattern requirements...',
          required: false,
          priority: 22
        }
      ];

    case 'liquidity-sweep':
    case 'smart-money':
      return [
        {
          id: 'liquidity-definition',
          section: 'strategy-discovery',
          question: isBeginner
            ? 'Where do you expect liquidity to be? What kind of stops are being targeted?'
            : 'How do you identify liquidity pools and stop placements?',
          placeholder: 'Describe liquidity identification...',
          required: true,
          priority: 12
        },
        {
          id: 'sweep-confirmation',
          section: 'entry-logic',
          question: isBeginner
            ? 'After the sweep happens, what tells you it\'s safe to enter?'
            : 'What confirms the liquidity sweep and reversal?',
          placeholder: 'Describe sweep confirmation...',
          required: true,
          priority: 22
        }
      ];

    case 'pattern-based':
      return [
        {
          id: 'pattern-type',
          section: 'strategy-discovery',
          question: 'What chart patterns do you trade? (Head and shoulders, triangles, flags, etc.)',
          placeholder: 'List your patterns...',
          required: true,
          priority: 12
        },
        {
          id: 'pattern-confirmation',
          section: 'entry-logic',
          question: isBeginner
            ? 'Do you enter when the pattern completes, or do you wait for something else?'
            : 'What confirms pattern completion and triggers entry?',
          placeholder: 'Describe pattern confirmation...',
          required: true,
          priority: 22
        }
      ];

    default:
      return [];
  }
};

export const getFollowUpQuestion = (
  questionId: string,
  answer: string,
  level: ExperienceLevel
): Question | null => {
  const answerLength = answer.trim().length;
  const isVague = answerLength < 20;
  const isBeginner = level === 'beginner';

  if (questionId === 'setup-definition' && isVague) {
    return {
      id: 'setup-definition-followup',
      section: 'strategy-discovery',
      question: isBeginner
        ? 'Let\'s make this more specific. Can you explain it like this: 1) What happens first? 2) What do you wait for? 3) What confirms it\'s valid?'
        : 'Can you provide more specific conditions? What exactly must be visible on the chart?',
      placeholder: 'Provide more detail...',
      required: true,
      priority: 10.5
    };
  }

  if (questionId === 'entry-trigger' && isVague) {
    return {
      id: 'entry-trigger-followup',
      section: 'entry-logic',
      question: isBeginner
        ? 'To make sure we build this correctly: What exactly has to happen before you click buy or sell? Be as specific as you can.'
        : 'What is the precise trigger? Candle close, price touch, indicator value?',
      placeholder: 'Provide more specific trigger...',
      required: true,
      priority: 20.5
    };
  }

  return null;
};

export const SECTION_LABELS: Record<string, string> = {
  'calibration': 'Calibration',
  'trading-foundation': 'Trading Foundation',
  'strategy-discovery': 'Strategy Discovery',
  'entry-logic': 'Entry Logic',
  'trade-management': 'Trade Management',
  'risk-filters': 'Risk & Filters',
  'engineering-check': 'Final Check'
};
