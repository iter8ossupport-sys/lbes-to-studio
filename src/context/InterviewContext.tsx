import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  InterviewState,
  CalibrationData,
  Answer,
  Question,
  OrderStatus,
  InterviewSection,
  StrategySpecification,
  SpecificationSection,
  PACKAGES
} from '../types/interview';
import {
  CALIBRATION_QUESTIONS,
  getQuestionsForStrategy,
  getFollowUpQuestion,
  SECTION_LABELS
} from '../data/questions';

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
  goBack: () => void;
  setCalibrationAnswer: (questionId: string, value: string | string[]) => void;
  completeCalibration: () => void;
  approveSpecification: () => void;
  editSection: (sectionId: string) => void;
  resetInterview: () => void;
  getReadinessPercentage: () => number;
  getSectionStatus: (section: string) => 'captured' | 'in-progress' | 'needs-clarification' | 'not-defined';
}

const initialState: InterviewState = {
  id: crypto.randomUUID(),
  calibration: null,
  answers: {},
  currentSection: 'calibration',
  currentQuestionIndex: 0,
  askedQuestions: [],
  skippedQuestions: [],
  readiness: 0,
  status: 'package-selected',
  startedAt: new Date(),
  lastUpdated: new Date()
};

const InterviewContext = createContext<InterviewContextType | null>(null);

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<InterviewState>(() => {
    const saved = localStorage.getItem('lbes_interview_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          startedAt: new Date(parsed.startedAt),
          lastUpdated: new Date(parsed.lastUpdated)
        };
      } catch {
        return initialState;
      }
    }
    return initialState;
  });

  const [calibrationAnswers, setCalibrationAnswers] = useState<Record<string, string | string[]>>(() => {
    const saved = localStorage.getItem('lbes_calibration_answers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  const [currentCalibrationIndex, setCurrentCalibrationIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [specification, setSpecification] = useState<StrategySpecification | null>(null);

  // Autosave state
  useEffect(() => {
    localStorage.setItem('lbes_interview_state', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem('lbes_calibration_answers', JSON.stringify(calibrationAnswers));
  }, [calibrationAnswers]);

  // Restore questions if calibration exists
  useEffect(() => {
    if (state.calibration && questions.length === 0) {
      const generatedQuestions = getQuestionsForStrategy(
        state.calibration.strategyType,
        state.calibration.experienceLevel
      );
      setQuestions(generatedQuestions);
    }
  }, [state.calibration, questions.length]);

  const isCalibrating = !state.calibration;

  const currentQuestion = !isCalibrating && questions.length > 0 && state.currentQuestionIndex < questions.length
    ? questions[state.currentQuestionIndex]
    : null;

  const getReadinessPercentage = useCallback(() => {
    if (isCalibrating) return 0;
    
    const requiredQuestions = questions.filter(q => q.required);
    if (requiredQuestions.length === 0) return 0;
    
    const answeredRequired = requiredQuestions.filter(q => 
      state.answers[q.id] && state.answers[q.id].answer.trim().length > 0
    );
    
    const baseReadiness = (answeredRequired.length / requiredQuestions.length) * 100;
    
    const hasVagueAnswers = Object.values(state.answers).some(
      a => a.answer.trim().length < 10 && questions.find(q => q.id === a.questionId)?.required
    );
    
    return Math.max(0, Math.min(100, hasVagueAnswers ? baseReadiness - 10 : baseReadiness));
  }, [isCalibrating, questions, state.answers]);

  const getSectionStatus = useCallback((section: string): 'captured' | 'in-progress' | 'needs-clarification' | 'not-defined' => {
    const sectionQuestions = questions.filter(q => q.section === section);
    if (sectionQuestions.length === 0) return 'not-defined';
    
    const answered = sectionQuestions.filter(q => 
      state.answers[q.id] && state.answers[q.id].answer.trim().length > 0
    );
    
    if (answered.length === 0) return 'not-defined';
    if (answered.length < sectionQuestions.length) return 'in-progress';
    
    const hasVague = answered.some(a => a.answer.trim().length < 10);
    if (hasVague) return 'needs-clarification';
    
    return 'captured';
  }, [questions, state.answers]);

  const setCalibrationAnswer = useCallback((questionId: string, value: string | string[]) => {
    setCalibrationAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  }, []);

  const completeCalibration = useCallback(() => {
    const calibration: CalibrationData = {
      markets: (calibrationAnswers['markets'] || []) as string[],
      platform: (calibrationAnswers['platform'] || 'tradingview-mt5') as CalibrationData['platform'],
      strategyMaturity: (calibrationAnswers['strategyMaturity'] || 'in-head') as CalibrationData['strategyMaturity'],
      experienceLevel: (calibrationAnswers['experienceLevel'] || 'beginner') as CalibrationData['experienceLevel'],
      strategyType: (calibrationAnswers['strategyType'] || 'custom') as CalibrationData['strategyType']
    };

    const generatedQuestions = getQuestionsForStrategy(
      calibration.strategyType,
      calibration.experienceLevel
    );

    setQuestions(generatedQuestions);
    setCurrentCalibrationIndex(0);
    
    setState(prev => ({
      ...prev,
      calibration,
      currentSection: 'trading-foundation',
      currentQuestionIndex: 0,
      status: 'interview-in-progress',
      lastUpdated: new Date()
    }));
  }, [calibrationAnswers]);

  const submitAnswer = useCallback(() => {
    if (!currentQuestion || !currentAnswer.trim()) return;

    const answer: Answer = {
      questionId: currentQuestion.id,
      answer: currentAnswer.trim(),
      timestamp: new Date(),
      edited: false,
      needsClarification: currentAnswer.trim().length < 10
    };

    setState(prev => {
      const newAnswers = { ...prev.answers, [currentQuestion.id]: answer };
      const newAskedQuestions = [...new Set([...prev.askedQuestions, currentQuestion.id])];
      
      let nextIndex = prev.currentQuestionIndex + 1;
      
      // Check for follow-up questions
      const followUp = getFollowUpQuestion(
        currentQuestion.id,
        currentAnswer,
        prev.calibration?.experienceLevel || 'beginner'
      );
      
      if (followUp && !prev.askedQuestions.includes(followUp.id)) {
        const insertIndex = nextIndex;
        const newQuestions = [...questions];
        newQuestions.splice(insertIndex, 0, followUp);
        setQuestions(newQuestions);
      }
      
      // Skip non-required questions that are already answered
      while (nextIndex < questions.length) {
        const nextQ = questions[nextIndex];
        if (nextQ.required || !newAnswers[nextQ.id]) break;
        nextIndex++;
      }
      
      const isComplete = nextIndex >= questions.length;
      
      return {
        ...prev,
        answers: newAnswers,
        askedQuestions: newAskedQuestions,
        currentQuestionIndex: nextIndex,
        currentSection: isComplete ? 'engineering-check' : (questions[nextIndex]?.section || prev.currentSection),
        status: isComplete ? 'interview-complete' : prev.status,
        readiness: isComplete ? 100 : getReadinessPercentage(),
        lastUpdated: new Date()
      };
    });

    setCurrentAnswer('');
  }, [currentQuestion, currentAnswer, questions, getReadinessPercentage]);

  const goBack = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        lastUpdated: new Date()
      }));
      
      const prevQuestion = questions[state.currentQuestionIndex - 1];
      if (prevQuestion && state.answers[prevQuestion.id]) {
        setCurrentAnswer(state.answers[prevQuestion.id].answer);
      } else {
        setCurrentAnswer('');
      }
    }
  }, [state.currentQuestionIndex, state.answers, questions]);

  const generateSpecification = useCallback((): StrategySpecification => {
    const sections: SpecificationSection[] = [
      {
        id: 'overview',
        title: 'Strategy Overview',
        content: state.calibration?.strategyType 
          ? `A ${state.calibration.strategyType.replace(/-/g, ' ')} trading strategy.`
          : 'Trading strategy to be engineered.',
        status: 'captured',
        editPath: '/interview'
      },
      {
        id: 'markets',
        title: 'Markets',
        content: state.calibration?.markets?.join(', ') || 'Not specified',
        status: state.calibration?.markets?.length ? 'captured' : 'needs-clarification',
        editPath: '/interview'
      },
      {
        id: 'platform',
        title: 'Platform',
        content: state.calibration?.platform || 'Not specified',
        status: state.calibration?.platform ? 'captured' : 'needs-clarification',
        editPath: '/interview'
      },
      {
        id: 'setup',
        title: 'Setup Conditions',
        content: state.answers['setup-definition']?.answer || state.answers['setup-context']?.answer || 'Not defined',
        status: getSectionStatus('strategy-discovery'),
        editPath: '/interview?section=strategy-discovery'
      },
      {
        id: 'entry',
        title: 'Entry Logic',
        content: [
          state.answers['entry-trigger']?.answer,
          state.answers['entry-confirmation']?.answer
        ].filter(Boolean).join('\n\n') || 'Not defined',
        status: getSectionStatus('entry-logic'),
        editPath: '/interview?section=entry-logic'
      },
      {
        id: 'exit',
        title: 'Exit Logic',
        content: [
          `Stop Loss: ${state.answers['stop-loss']?.answer || 'Not defined'}`,
          `Take Profit: ${state.answers['take-profit']?.answer || 'Not defined'}`
        ].join('\n\n'),
        status: getSectionStatus('trade-management'),
        editPath: '/interview?section=trade-management'
      },
      {
        id: 'risk',
        title: 'Risk Management',
        content: state.answers['risk-per-trade']?.answer || 'Not defined',
        status: getSectionStatus('risk-filters'),
        editPath: '/interview?section=risk-filters'
      },
      {
        id: 'filters',
        title: 'Filters & Conditions',
        content: [
          state.answers['conditions-to-avoid']?.answer,
          state.answers['sessions']?.answer
        ].filter(Boolean).join('\n\n') || 'No specific filters defined',
        status: state.answers['conditions-to-avoid'] ? 'captured' : 'not-defined',
        editPath: '/interview?section=risk-filters'
      },
      {
        id: 'timeframes',
        title: 'Timeframes',
        content: state.answers['timeframes']?.answer || 'Not specified',
        status: state.answers['timeframes'] ? 'captured' : 'needs-clarification',
        editPath: '/interview?section=trading-foundation'
      },
      {
        id: 'discretionary',
        title: 'Discretionary Elements',
        content: state.answers['discretionary-elements']?.answer || 'None specified',
        status: state.answers['discretionary-elements'] ? 'captured' : 'not-defined',
        editPath: '/interview?section=engineering-check'
      },
      {
        id: 'additional',
        title: 'Additional Information',
        content: state.answers['missing-information']?.answer || 'None provided',
        status: state.answers['missing-information'] ? 'captured' : 'not-defined',
        editPath: '/interview?section=engineering-check'
      }
    ];

    return {
      id: crypto.randomUUID(),
      interviewId: state.id,
      sections,
      generatedAt: new Date(),
      approved: false
    };
  }, [state, getSectionStatus]);

  // Generate specification when interview completes
  useEffect(() => {
    if (state.status === 'interview-complete' && !specification) {
      const spec = generateSpecification();
      setSpecification(spec);
      setState(prev => ({
        ...prev,
        status: 'summary-generated'
      }));
    }
  }, [state.status, specification, generateSpecification]);

  const approveSpecification = useCallback(() => {
    if (!specification) return;
    
    setSpecification(prev => prev ? {
      ...prev,
      approved: true,
      approvedAt: new Date()
    } : null);
    
    setState(prev => ({
      ...prev,
      status: 'customer-approved',
      lastUpdated: new Date()
    }));
  }, [specification]);

  const editSection = useCallback((sectionId: string) => {
    // Find the first question in the section
    const questionIndex = questions.findIndex(q => q.id === sectionId || q.section === sectionId);
    if (questionIndex >= 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: questionIndex,
        status: 'interview-in-progress',
        lastUpdated: new Date()
      }));
      
      const question = questions[questionIndex];
      if (question && state.answers[question.id]) {
        setCurrentAnswer(state.answers[question.id].answer);
      }
    }
  }, [questions, state.answers]);

  const resetInterview = useCallback(() => {
    localStorage.removeItem('lbes_interview_state');
    localStorage.removeItem('lbes_calibration_answers');
    setState(initialState);
    setCalibrationAnswers({});
    setCurrentCalibrationIndex(0);
    setQuestions([]);
    setCurrentAnswer('');
    setSpecification(null);
  }, []);

  return (
    <InterviewContext.Provider value={{
      state,
      currentQuestion,
      currentCalibrationIndex,
      isCalibrating,
      calibrationQuestions: CALIBRATION_QUESTIONS,
      questions,
      specification,
      setCurrentAnswer,
      currentAnswer,
      submitAnswer,
      goBack,
      setCalibrationAnswer,
      completeCalibration,
      approveSpecification,
      editSection,
      resetInterview,
      getReadinessPercentage,
      getSectionStatus
    }}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within InterviewProvider');
  }
  return context;
};
