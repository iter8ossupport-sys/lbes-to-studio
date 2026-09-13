import type { User } from '@supabase/supabase-js';
import type { InterviewState, Order, StrategySpecification } from '../types/interview';
import { supabase } from './supabase';

export const persistInterviewSnapshot = async (
  state: InterviewState,
  specification: StrategySpecification | null,
  user: User | null
) => {
  if (!supabase || !user || !state.calibration) return;

  const { error: interviewError } = await supabase.from('interviews').upsert({
    id: state.id,
    user_id: user.id,
    calibration: state.calibration,
    status: state.status,
    current_section: state.currentSection,
    current_question_index: state.currentQuestionIndex,
    readiness: state.readiness,
    asked_questions: state.askedQuestions,
    skipped_questions: state.skippedQuestions,
    started_at: state.startedAt,
    last_updated: state.lastUpdated,
    specification: specification || null
  });

  if (interviewError) {
    console.error('Unable to save interview:', interviewError.message);
    return;
  }

  const answerRows = Object.values(state.answers).map(answer => ({
    interview_id: state.id,
    user_id: user.id,
    question_id: answer.questionId,
    answer: answer.answer,
    edited: answer.edited,
    needs_clarification: answer.needsClarification,
    answered_at: answer.timestamp
  }));

  if (answerRows.length > 0) {
    const { error: answersError } = await supabase
      .from('interview_answers')
      .upsert(answerRows, { onConflict: 'interview_id,question_id' });

    if (answersError) console.error('Unable to save interview answers:', answersError.message);
  }

  if (specification) {
    const { error: specificationError } = await supabase.from('specifications').upsert({
      id: specification.id,
      interview_id: state.id,
      user_id: user.id,
      sections: specification.sections,
      approved: specification.approved,
      generated_at: specification.generatedAt,
      approved_at: specification.approvedAt || null
    });

    if (specificationError) console.error('Unable to save specification:', specificationError.message);
  }
};

export const persistOrder = async (order: Order, user: User | null) => {
  if (!supabase || !user) return false;

  const { error } = await supabase.from('orders').insert({
    id: order.id,
    order_id: order.orderId || order.id,
    user_id: user.id,
    interview_id: order.interviewId,
     customer_id: user.id,
     strategy_id: order.interviewId,
    package_id: order.packageId,
    package_price: order.packagePrice,
    amount_due_now: order.amountDueNow,
    status: order.status,
    payment_option: order.paymentOption,
    payment_type: order.paymentOption,
    payment_status: order.paymentStatus || 'pending',
    payment_confirmed: order.paymentConfirmed,
    created_at: order.createdAt
  });

  if (error) {
    console.error('Unable to save order:', error.message);
    return false;
  }
  return true;
};
