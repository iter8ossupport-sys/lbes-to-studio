import type { User } from '@supabase/supabase-js';
import type { InterviewState, Order, StrategySpecification } from '../types/interview';
import { supabase } from './supabase';

export const persistInterviewSnapshot = async (
  state: InterviewState,
  specification: StrategySpecification | null,
  user: User | null
) => {
  if (!supabase || !user || !state.calibration) return { saved: false, error: 'You must be signed in before saving an order.' };

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
    return { saved: false, error: interviewError.message };
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

    if (answersError) {
      console.error('Unable to save interview answers:', answersError.message);
      return { saved: false, error: answersError.message };
    }
  }

  if (specification) {
    const { error: specificationError } = await supabase.rpc('save_specification', {
      p_id: specification.id,
      p_interview_id: state.id,
      p_sections: specification.sections,
      p_approved: specification.approved,
      p_generated_at: specification.generatedAt,
      p_approved_at: specification.approvedAt || null
    });

    if (specificationError) {
      console.error('Unable to save specification:', specificationError.message);
      return { saved: false, error: specificationError.message };
    }
  }

  return { saved: true, error: null };
};

export const persistOrder = async (order: Order, user: User | null) => {
  if (!supabase || !user) return { saved: false, error: 'You must be signed in before saving an order.' };

  const { error } = await supabase.rpc('create_pending_order', {
    p_id: order.id,
    p_order_id: order.orderId || order.id,
    p_interview_id: order.interviewId,
    p_package_id: order.packageId,
    p_payment_option: order.paymentOption,
    p_package_price: order.packagePrice,
    p_amount_due_now: order.amountDueNow
  });

  if (error) {
    console.error('Unable to save order:', error.message);
    return { saved: false, error: error.message };
  }
  return { saved: true, error: null };
};

export const confirmOrderPayment = async (orderId: string, user: User | null) => {
  if (!supabase || !orderId) return { success: false, error: 'Order ID or client missing' };

  // First try direct table update (or RPC)
  const { error: updateError } = await supabase
    .from('orders')
    .update({
      payment_status: 'confirmed',
      payment_confirmed: true,
      status: 'engineering-queued',
      updated_at: new Date().toISOString()
    })
    .eq('order_id', orderId);

  if (updateError) {
    // Fall back to RPC
    await supabase.rpc('confirm_order_payment', { p_order_id: orderId });
  }

  return { success: true, error: null };
};

export const getActiveUserOrder = async (user: User | null) => {
  if (!supabase || !user) return null;
  const { data } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return data;
};
