import { Question, ExperienceLevel, InterviewSection } from '../types/interview';

type Option = { value: string; label: string };
const options = (labels: string[]): Option[] => labels.map(label => ({ value: label === '%' ? '%' : label.toLowerCase().replace(/[^a-z0-9]+/g, '-') || label, label }));
const text = (id: string, section: InterviewSection, question: string, helperText = '', optional = false): Question => ({ id, section, question, placeholder: 'Write your answer...', helperText, answerType: 'textarea', required: !optional, optional, priority: 0 });
const select = (id: string, section: InterviewSection, question: string, labels: string[], multiSelect = false, optional = false): Question => ({ id, section, question, placeholder: 'Select an option...', options: options(labels), multiSelect, answerType: multiSelect ? 'multi-select' : 'single-select', required: !optional, optional, priority: 0 });
const yesNo = (id: string, section: InterviewSection, question: string, optional = false): Question => select(id, section, question, ['Yes', 'No'], false, optional);
const number = (id: string, section: InterviewSection, question: string, helperText = '', optional = false): Question => ({ id, section, question, placeholder: 'Enter a number...', helperText, answerType: 'number', required: !optional, optional, priority: 0 });

export const CALIBRATION_QUESTIONS: Array<{
  id: string;
  question: string;
  options: Option[];
  multiSelect: boolean;
}> = [];

export const MASTER_QUESTIONS: Question[] = [
  select('market', 'trading-foundation', 'Which market do you trade?', ['Forex', 'Gold', 'Crypto', 'Stocks', 'Indices', 'Other']),
  select('platform', 'trading-foundation', 'Which platform should we engineer for?', ['TradingView', 'MT5', 'Both']),
  select('primary-timeframe', 'trading-foundation', 'What is your primary timeframe?', ['1m', '5m', '15m', '30m', '1H', '4H', 'Daily', 'Other']),
  select('written-rules', 'trading-foundation', 'Do you already have written strategy rules?', ['Yes, fully written', 'Partially', 'No, mostly in my head']),
  select('confidence', 'trading-foundation', 'How confident are you describing your strategy?', ['Beginner', 'Intermediate', 'Advanced']),
  select('opportunity', 'strategy-discovery', 'How do you usually find a trading opportunity?', ['Trend Following', 'Breakout', 'Liquidity Sweep', 'Smart Money Concepts', 'Support & Resistance', 'Price Action', 'Indicators', 'Pattern Based', 'Custom'], true),
  text('strategy-words', 'strategy-discovery', 'Explain your strategy in your own words.', "Don't worry about technical terms. Just explain how you normally trade it."),
  { ...text('chart-example', 'strategy-discovery', 'Do you have a chart example?', 'A real example can help us understand your explanation.', true), answerType: 'file' },
  select('pre-entry', 'entry-logic', 'What must happen before entering?', ['Trend / market direction', 'Price reaches a specific area', 'Breakout', 'Liquidity sweep', 'Confirmation candle', 'Indicator condition', 'Pattern appears', 'Other'], true),
  text('exact-entry', 'entry-logic', 'Describe the exact entry.', 'Tell us what you see before you place the trade.'),
  select('entry-order', 'entry-logic', 'Do these conditions need to happen in a specific order?', ['Yes, order matters', 'No, they can happen in any order', 'It depends']),
  { ...text('entry-order-detail', 'entry-logic', 'Briefly describe the order.'), dependsOn: { questionId: 'entry-order', values: ['yes-order-matters'] } },
  { ...text('entry-order-depends', 'entry-logic', 'When does the order change?'), dependsOn: { questionId: 'entry-order', values: ['it-depends'] } },
  text('trade-cancellation', 'entry-logic', 'What cancels the trade?', 'For example, what would make you decide not to enter?'),
  select('entry-timing', 'entry-logic', 'When do you actually enter?', ['Immediately when conditions are met', 'After candle close', 'On the next candle', 'On a specific price level', 'Manually when I confirm it', 'Other']),
  select('stop-loss', 'trade-management', 'How is your stop loss set?', ['Fixed distance', 'Percentage / risk based', 'Structure based', 'Price level based', 'Other']),
  text('stop-loss-detail', 'trade-management', 'What determines the stop loss level?', 'Describe the rule you already use.', true),
  yesNo('break-even', 'trade-management', 'Do you move the stop loss to break even?'),
  { ...text('break-even-when', 'trade-management', 'When do you move it to break even?'), dependsOn: { questionId: 'break-even', values: ['yes'] } },
  select('take-profit', 'trade-management', 'How do you take profit?', ['Fixed target', 'Risk/reward based', 'Structure based', 'Price level', 'Trailing only', 'Other']),
  text('take-profit-detail', 'trade-management', 'How do you decide the profit target?', 'Describe the rule you already use.', true),
  yesNo('trailing-stop', 'trade-management', 'Do you use a trailing stop?'),
  { ...text('trailing-logic', 'trade-management', 'Describe the trailing stop logic.', 'Tell us when it starts and how it moves.'), dependsOn: { questionId: 'trailing-stop', values: ['yes'] } },
  yesNo('partial-profits', 'trade-management', 'Do you take partial profits?'),
  { ...text('partial-close', 'trade-management', 'Describe the partial-close logic.', 'Tell us when you close part of the position and what happens afterward.'), dependsOn: { questionId: 'partial-profits', values: ['yes'] } },
  number('maximum-open-trades', 'trade-management', 'Maximum number of open trades at once?', 'Enter 0 if there is no specific limit.', true),
  { ...number('risk-per-trade', 'risk-filters', 'How much do you risk per trade?', '', false), answerType: 'number' },
  select('risk-unit', 'risk-filters', 'What is the risk unit?', ['%', 'Fixed amount']),
  select('sessions', 'risk-filters', 'Which trading sessions can be used?', ['Asian', 'London', 'New York', 'London + New York', 'Any session', 'Custom'], true),
  yesNo('high-impact-news', 'risk-filters', 'Avoid high-impact news?'),
  { ...select('news-handling', 'risk-filters', 'How do you handle high-impact news?', ['Don\'t enter before news', 'Don\'t enter during news', 'Close before news', 'Avoid the market around news', 'Custom']), dependsOn: { questionId: 'high-impact-news', values: ['yes'] } },
  yesNo('weekend-trading', 'risk-filters', 'Allow weekend trading?'),
  text('conditions-to-avoid', 'risk-filters', 'What conditions should be avoided?', 'Tell us when your strategy should NOT be used.', true),
  yesNo('multi-timeframe', 'strategy-discovery', 'Do you use more than one timeframe?'),
  { ...text('timeframe-roles', 'strategy-discovery', 'What does each timeframe do?', 'For example: one timeframe for direction, another for entry.'), dependsOn: { questionId: 'multi-timeframe', values: ['yes'] } },
  yesNo('exceptions', 'engineering-check', 'Are there situations where you handle the strategy differently?'),
  { ...text('exception-details', 'engineering-check', 'Describe those exceptions.', 'Tell us what changes and when.'), dependsOn: { questionId: 'exceptions', values: ['yes'] } },
  text('custom-rules', 'engineering-check', "Any additional custom rules?", "Add anything important that we haven't captured.", true),
  text('missing-information', 'engineering-check', "Is there anything important about your strategy we haven't asked about?", 'This is your final chance to add a rule, exception, or detail.', true)
];

export const getQuestionsForStrategy = (_strategyType?: string, _experienceLevel?: ExperienceLevel): Question[] => MASTER_QUESTIONS;
export const getFollowUpQuestion = (): Question | null => null;
export const SECTION_LABELS: Record<string, string> = {
  calibration: 'Calibration',
  'trading-foundation': 'Trading Foundation',
  'strategy-discovery': 'Strategy Discovery',
  'entry-logic': 'Entry Logic',
  'trade-management': 'Trade Management',
  'risk-filters': 'Risk & Filters',
  'engineering-check': 'Final Check'
};
