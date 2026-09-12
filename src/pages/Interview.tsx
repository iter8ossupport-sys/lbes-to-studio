import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { InterviewProvider, useInterview } from '../context/InterviewContext';
import { CalibrationStep } from '../components/interview/CalibrationStep';
import { QuestionCard } from '../components/interview/QuestionCard';
import { BlueprintPanel } from '../components/interview/BlueprintPanel';
import { SpecificationReview } from '../components/interview/SpecificationReview';
import { TermsAcceptance } from '../components/interview/TermsAcceptance';
import { PaymentOptions } from '../components/interview/PaymentOptions';
import { OrderConfirmation } from '../components/interview/OrderConfirmation';

const InterviewContent: React.FC = () => {
  const navigate = useNavigate();
  const {
    state,
    currentQuestion,
    currentCalibrationIndex,
    isCalibrating,
    calibrationQuestions,
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
  } = useInterview();

  const [stage, setStage] = useState<'interview' | 'review' | 'terms' | 'payment' | 'confirmation'>('interview');
  const [paymentOption, setPaymentOption] = useState<'booking' | 'full' | null>(null);
  const [orderId, setOrderId] = useState<string>('');
  const [calibrationValues, setCalibrationValues] = useState<Record<string, string | string[]>>({});

  // Load saved calibration values from context on mount
  useEffect(() => {
    if (state.calibration) {
      setCalibrationValues({
        markets: state.calibration.markets,
        platform: state.calibration.platform,
        strategyMaturity: state.calibration.strategyMaturity,
        experienceLevel: state.calibration.experienceLevel,
        strategyType: state.calibration.strategyType
      });
    }
  }, [state.calibration]);

  // Update stage when interview status changes
  useEffect(() => {
    if (state.status === 'summary-generated' && stage === 'interview') {
      setStage('review');
    }
  }, [state.status, stage]);

  const handleCalibrationSelect = (questionId: string, value: string | string[]) => {
    setCalibrationValues(prev => ({ ...prev, [questionId]: value }));
    setCalibrationAnswer(questionId, value);
  };

  const handleCalibrationContinue = () => {
    const currentQ = calibrationQuestions[currentCalibrationIndex];
    const currentValue = calibrationValues[currentQ.id];
    
    // Validate current selection
    const hasValue = currentQ.multiSelect 
      ? (currentValue as string[])?.length > 0 
      : !!currentValue;
    
    if (!hasValue) return;

    // Save current answer to context
    setCalibrationAnswer(currentQ.id, currentValue);

    if (currentCalibrationIndex < calibrationQuestions.length - 1) {
      // Move to next calibration question
      // The context will handle the index update
    } else {
      // Last calibration question - complete calibration
      // Save all calibration values first
      Object.entries(calibrationValues).forEach(([key, value]) => {
        setCalibrationAnswer(key, value);
      });
      // Then complete calibration
      completeCalibration();
    }
  };

  const handleApproveSpecification = () => {
    approveSpecification();
    setStage('terms');
  };

  const handleAcceptTerms = () => {
    setStage('payment');
  };

  const handleSelectPaymentOption = (option: 'booking' | 'full') => {
    setPaymentOption(option);
    setOrderId(crypto.randomUUID());
    setStage('confirmation');
  };

  const handleEditSection = (sectionId: string) => {
    editSection(sectionId);
    setStage('interview');
  };

  const handleViewSpecification = () => {
    navigate('/specification');
  };

  const selectedPackage = state.calibration?.platform === 'tradingview' 
    ? 'tradingview' 
    : state.calibration?.platform === 'mt5' 
      ? 'tradingview-mt5' 
      : 'tradingview-mt5';

  const canGoBack = isCalibrating 
    ? currentCalibrationIndex > 0 
    : state.currentQuestionIndex > 0;

  const currentCalibrationQuestion = calibrationQuestions[currentCalibrationIndex];
  const currentCalibrationValue = calibrationValues[currentCalibrationQuestion?.id] ?? (currentCalibrationQuestion?.multiSelect ? [] : '');

  return (
    <div className="relative w-full min-h-screen pt-32 bg-[#050505] overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-orange-600/10 blur-[120px] rounded-full opacity-40" />
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-600/10 blur-[120px] rounded-full opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {stage === 'interview' && (
                <motion.div
                  key="interview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {isCalibrating && currentCalibrationQuestion ? (
                    <div className="mb-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                      >
                        <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-900/10 px-4 py-1.5 mb-6">
                          <span className="text-[10px] md:text-xs font-bold tracking-widest text-blue-400 uppercase">
                            STRATEGY INTERVIEW
                          </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                          Let's understand how you actually trade.
                        </h1>
                        <p className="text-gray-400 text-lg">
                          There are no technical terms you need to know. Explain things the way you normally would.
                        </p>
                      </motion.div>

                      <CalibrationStep
                        question={currentCalibrationQuestion.question}
                        options={currentCalibrationQuestion.options}
                        multiSelect={currentCalibrationQuestion.multiSelect}
                        selectedValue={currentCalibrationValue}
                        onSelect={(value) => handleCalibrationSelect(currentCalibrationQuestion.id, value)}
                        onContinue={handleCalibrationContinue}
                        onBack={() => {
                          if (currentCalibrationIndex > 0) {
                            // Just update local state for previous question
                            const prevQ = calibrationQuestions[currentCalibrationIndex - 1];
                            setCalibrationValues(prev => ({
                              ...prev,
                              [currentCalibrationQuestion.id]: currentCalibrationQuestion.multiSelect ? [] : ''
                            }));
                          }
                        }}
                        canGoBack={currentCalibrationIndex > 0}
                        isLastStep={currentCalibrationIndex === calibrationQuestions.length - 1}
                        currentStep={currentCalibrationIndex + 1}
                        totalSteps={calibrationQuestions.length}
                      />
                    </div>
                  ) : currentQuestion ? (
                    <div className="mb-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                      >
                        <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-900/10 px-4 py-1.5 mb-6">
                          <span className="text-[10px] md:text-xs font-bold tracking-widest text-orange-400 uppercase">
                            {currentQuestion.section.replace(/-/g, ' ').toUpperCase()}
                          </span>
                        </div>
                      </motion.div>

                      <QuestionCard
                        question={currentQuestion}
                        experienceLevel={state.calibration?.experienceLevel || 'beginner'}
                        currentAnswer={currentAnswer}
                        onAnswerChange={setCurrentAnswer}
                        onSubmit={submitAnswer}
                        onBack={goBack}
                        canGoBack={canGoBack}
                        questionNumber={state.currentQuestionIndex + 1}
                        totalQuestions={questions.length}
                      />
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-4"
                      >
                        <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center animate-pulse">
                          <div className="w-8 h-8 rounded-full bg-orange-500/30" />
                        </div>
                        <p className="text-gray-400">Processing your answers...</p>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              )}

              {stage === 'review' && specification && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SpecificationReview
                    specification={specification}
                    onEditSection={handleEditSection}
                    onApprove={handleApproveSpecification}
                  />
                </motion.div>
              )}

              {stage === 'terms' && (
                <motion.div
                  key="terms"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <TermsAcceptance
                    onAccept={handleAcceptTerms}
                    onBack={() => setStage('review')}
                  />
                </motion.div>
              )}

              {stage === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <PaymentOptions
                    selectedPackage={selectedPackage}
                    onSelectOption={handleSelectPaymentOption}
                    onBack={() => setStage('terms')}
                  />
                </motion.div>
              )}

              {stage === 'confirmation' && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <OrderConfirmation
                    orderId={orderId}
                    packageId={selectedPackage}
                    status="engineering-queued"
                    onViewSpecification={handleViewSpecification}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            {stage === 'interview' && (
              <BlueprintPanel
                sections={['trading-foundation', 'strategy-discovery', 'entry-logic', 'trade-management', 'risk-filters', 'engineering-check']}
                getSectionStatus={getSectionStatus}
                currentSection={state.currentSection}
                readiness={getReadinessPercentage()}
                selectedPackage={selectedPackage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Interview: React.FC = () => {
  return (
    <InterviewProvider>
      <InterviewContent />
    </InterviewProvider>
  );
};
