import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { persistInterviewSnapshot } from '../lib/persistence';
import { supabase } from '../lib/supabase';
import { Answer, CalibrationData, InterviewSection, InterviewState, Question, StrategySpecification } from '../types/interview';
import { MASTER_QUESTIONS, CALIBRATION_QUESTIONS, SECTION_LABELS } from '../data/questions';

interface InterviewContextType {
  state: InterviewState;
  currentQuestion: Question | null;
  currentCalibrationIndex: number;
  isCalibrating: boolean;
  calibrationQuestions: typeof CALIBRATION_QUESTIONS;
  questions: Question[];
  specification: StrategySpecification | null;
  setCurrentAnswer: (answer: string) => void;
  currentAnswer: string;
  submitAnswer: () => void;
  uploadChart: (file: File) => Promise<string>;
  goBack: () => void;
  setCalibrationAnswer: (questionId: string, value: string | string[]) => void;
  advanceCalibration: () => void;
  goBackCalibration: () => void;
  completeCalibration: () => void;
  approveSpecification: () => void;
  editSection: (sectionId: string) => void;
  resetInterview: () => void;
  getReadinessPercentage: () => number;
  getSectionStatus: (section: string) => 'captured' | 'in-progress' | 'needs-clarification' | 'not-defined';
}

const defaultCalibration: CalibrationData = {
  markets: ['other'], platform: 'tradingview-mt5', strategyMaturity: 'in-head', experienceLevel: 'beginner', strategyType: 'custom'
};

const initialState: InterviewState = {
  id: crypto.randomUUID(), calibration: defaultCalibration, answers: {}, currentSection: 'trading-foundation', currentQuestionIndex: 0,
  askedQuestions: [], skippedQuestions: [], readiness: 0, status: 'interview-in-progress', startedAt: new Date(), lastUpdated: new Date()
};

const InterviewContext = createContext<InterviewContextType | null>(null);

const answerValues = (answer?: Answer) => answer?.answer.split(',').map(value => value.trim()).filter(Boolean) || [];

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [state, setState] = useState<InterviewState>(() => {
    const saved = localStorage.getItem('lbes_interview_state');
    if (!saved) return initialState;
    try {
      const parsed = JSON.parse(saved);
      return { ...initialState, ...parsed, calibration: parsed.calibration || defaultCalibration, startedAt: new Date(parsed.startedAt), lastUpdated: new Date(parsed.lastUpdated) };
    } catch { return initialState; }
  });
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [specification, setSpecification] = useState<StrategySpecification | null>(null);
  const [editReturnIndex, setEditReturnIndex] = useState<number | null>(null);

  const questions = useMemo(() => MASTER_QUESTIONS.filter(question => {
    if (!question.dependsOn) return true;
    const values = answerValues(state.answers[question.dependsOn.questionId]);
    return question.dependsOn.values.some(value => values.includes(value));
  }), [state.answers]);

  const currentQuestion = questions[state.currentQuestionIndex] || null;
  const isCalibrating = false;

  useEffect(() => { localStorage.setItem('lbes_interview_state', JSON.stringify(state)); }, [state]);
  useEffect(() => { void persistInterviewSnapshot(state, specification, user); }, [state, specification, user]);

  const getReadinessPercentage = useCallback(() => {
    if (!questions.length) return 0;
    const answered = questions.filter(question => typeof state.answers[question.id]?.answer === 'string' && state.answers[question.id].answer.trim()).length;
    return Math.round((answered / questions.length) * 100);
  }, [questions, state.answers]);

  const getSectionStatus = useCallback((section: string) => {
    const sectionQuestions = questions.filter(question => question.section === section);
    if (!sectionQuestions.length) return 'not-defined' as const;
    const answered = sectionQuestions.filter(question => state.answers[question.id]?.answer?.trim());
    if (!answered.length) return 'not-defined' as const;
    if (answered.length < sectionQuestions.length) return 'in-progress' as const;
    if (answered.some(question => state.answers[question.id].answer.trim().length < 10)) return 'needs-clarification' as const;
    return 'captured' as const;
  }, [questions, state.answers]);

  const setAnswer = useCallback((question: Question, value: string) => {
    const answer: Answer = { questionId: question.id, answer: value.trim(), timestamp: new Date(), edited: Boolean(state.answers[question.id]), needsClarification: value.trim().length > 0 && value.trim().length < 10 };
    setState(previous => ({ ...previous, answers: { ...previous.answers, [question.id]: answer }, lastUpdated: new Date() }));
  }, [state.answers]);

  const uploadChart = useCallback(async (file: File) => {
    if (!supabase || !user) return file.name;
    const path = `${user.id}/${state.id}/${crypto.randomUUID()}-${file.name}`;
    const { error } = await supabase.storage.from('chart-uploads').upload(path, file, { upsert: false });
    if (error) return file.name;
    return path;
  }, [state.id, user]);

  const submitAnswer = useCallback(() => {
    if (!currentQuestion || (!currentAnswer.trim() && !currentQuestion.optional)) return;
    setAnswer(currentQuestion, currentAnswer);
    const nextIndex = state.currentQuestionIndex + 1;
    const complete = nextIndex >= questions.length;
    setState(previous => ({ ...previous, currentQuestionIndex: complete ? previous.currentQuestionIndex : nextIndex, currentSection: complete ? 'engineering-check' : (questions[nextIndex]?.section || previous.currentSection), status: complete ? 'interview-complete' : editReturnIndex !== null ? 'summary-generated' : 'interview-in-progress', askedQuestions: [...new Set([...previous.askedQuestions, currentQuestion.id])], readiness: complete ? 100 : getReadinessPercentage(), lastUpdated: new Date() }));
    if (editReturnIndex !== null) setEditReturnIndex(null);
    setCurrentAnswer('');
  }, [currentAnswer, currentQuestion, editReturnIndex, getReadinessPercentage, questions, setAnswer, state.currentQuestionIndex]);

  const goBack = useCallback(() => {
    if (state.currentQuestionIndex <= 0) return;
    const previousIndex = state.currentQuestionIndex - 1;
    const previousQuestion = questions[previousIndex];
    setState(previous => ({ ...previous, currentQuestionIndex: previousIndex, currentSection: previousQuestion.section, lastUpdated: new Date() }));
    setCurrentAnswer(previousQuestion ? state.answers[previousQuestion.id]?.answer || '' : '');
  }, [questions, state.answers, state.currentQuestionIndex]);

  const generateSpecification = useCallback((): StrategySpecification => {
    const sectionMap: { id: string; title: string; section: InterviewSection; ids: string[] }[] = [
      { id: 'market', title: 'Market', section: 'trading-foundation', ids: ['market'] },
      { id: 'platform', title: 'Platform', section: 'trading-foundation', ids: ['platform', 'primary-timeframe'] },
      { id: 'overview', title: 'Strategy Overview', section: 'strategy-discovery', ids: ['opportunity', 'strategy-words', 'chart-example'] },
      { id: 'setup', title: 'Setup & Entry', section: 'entry-logic', ids: ['pre-entry', 'exact-entry', 'entry-order', 'entry-order-detail', 'entry-order-depends', 'trade-cancellation', 'entry-timing'] },
      { id: 'exit', title: 'Exit Logic', section: 'trade-management', ids: ['stop-loss', 'stop-loss-detail', 'break-even', 'break-even-when', 'take-profit', 'take-profit-detail'] },
      { id: 'management', title: 'Trade Management', section: 'trade-management', ids: ['trailing-stop', 'trailing-logic', 'partial-profits', 'partial-close', 'maximum-open-trades'] },
      { id: 'risk', title: 'Risk', section: 'risk-filters', ids: ['risk-per-trade', 'risk-unit'] },
      { id: 'filters', title: 'Trading Sessions & Filters', section: 'risk-filters', ids: ['sessions', 'high-impact-news', 'news-handling', 'weekend-trading', 'conditions-to-avoid'] },
      { id: 'exceptions', title: 'Exceptions', section: 'engineering-check', ids: ['multi-timeframe', 'timeframe-roles', 'exceptions', 'exception-details'] },
      { id: 'custom', title: 'Discretionary Rules & Implementation Requirements', section: 'engineering-check', ids: ['custom-rules', 'missing-information'] }
    ];
    const sections = sectionMap.map(section => {
      const content = section.ids.map(id => state.answers[id]?.answer).filter(Boolean).join('\n\n') || 'Not defined';
      return { id: section.id, title: section.title, content, status: content === 'Not defined' ? 'not-defined' as const : getSectionStatus(section.section), editPath: `/interview?question=${section.ids[0]}` };
    });
    return { id: crypto.randomUUID(), interviewId: state.id, sections, generatedAt: new Date(), approved: false };
  }, [getSectionStatus, state.answers, state.id]);

  useEffect(() => {
    if ((state.status === 'interview-complete' || state.status === 'summary-generated') && !specification) setSpecification(generateSpecification());
  }, [generateSpecification, specification, state.status]);

  const editSection = useCallback((sectionId: string) => {
    const index = questions.findIndex(question => question.id === sectionId || question.section === sectionId);
    if (index < 0) return;
    setEditReturnIndex(state.currentQuestionIndex);
    setSpecification(null);
    setState(previous => ({ ...previous, currentQuestionIndex: index, status: 'interview-in-progress', lastUpdated: new Date() }));
    setCurrentAnswer(state.answers[questions[index].id]?.answer || '');
  }, [questions, state.answers, state.currentQuestionIndex]);

  const approveSpecification = useCallback(() => {
    setSpecification(previous => previous ? { ...previous, approved: true, approvedAt: new Date() } : previous);
    setState(previous => ({ ...previous, status: 'customer-approved', lastUpdated: new Date() }));
  }, []);

  const resetInterview = useCallback(() => { localStorage.removeItem('lbes_interview_state'); setState({ ...initialState, id: crypto.randomUUID(), startedAt: new Date(), lastUpdated: new Date() }); setCurrentAnswer(''); setSpecification(null); }, []);
  const noop = useCallback(() => undefined, []);

  return <InterviewContext.Provider value={{ state, currentQuestion, currentCalibrationIndex: 0, isCalibrating, calibrationQuestions: CALIBRATION_QUESTIONS, questions, specification, setCurrentAnswer, currentAnswer, submitAnswer, uploadChart, goBack, setCalibrationAnswer: noop, advanceCalibration: noop, goBackCalibration: noop, completeCalibration: noop, approveSpecification, editSection, resetInterview, getReadinessPercentage, getSectionStatus }}>{children}</InterviewContext.Provider>;
};

export const useInterview = () => { const context = useContext(InterviewContext); if (!context) throw new Error('useInterview must be used within InterviewProvider'); return context; };
