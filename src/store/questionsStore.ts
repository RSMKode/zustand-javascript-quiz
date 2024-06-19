import { create } from 'zustand';
import { Question } from '../types';
import confetti from 'canvas-confetti';
import { devtools, persist } from 'zustand/middleware';
import { getAllQuestions } from '../services/questionsService';

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,

          fetchQuestions: async (limit: number) => {
            const json = await getAllQuestions();

            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit);
            set({ questions }, false, 'FETCH_QUESTIONS');
          },

          selectAnswer: (questionId, answerIndex) => {
            const { questions } = get();
            // usar el structuredClone para clonar el objeto
            const newQuestions = structuredClone(questions);
            // encontrar el índice de la pregunta
            const questionIndex = newQuestions.findIndex(
              q => q.id === questionId
            );
            // obtenemos la información de la pregunta
            const questionInfo = newQuestions[questionIndex];
            // averiguamos si la respuesta del usuario es correcta
            const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex;
            if (isCorrectUserAnswer) confetti();
            // actualizamos la pregunta con la respuesta del usuario
            newQuestions[questionIndex] = {
              ...questionInfo,
              userSelectedAnswer: answerIndex,
              isCorrectUserAnswer,
            };
            // actualizamos el estado
            set({ questions: newQuestions }, false, 'SELECT_ANSWER');
          },

          goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            const nextQuestion = currentQuestion + 1;

            if (currentQuestion < questions.length - 1) {
              set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_QUESTION');
            }
          },

          goPreviousQuestion: () => {
            const { currentQuestion } = get();
            const previousQuestion = currentQuestion - 1;

            if (currentQuestion > 0) {
              set({ currentQuestion: previousQuestion }, false, 'GO_PREVIOUS_QUESTION');
            }
          },

          reset: () => {
            set(
              { questions: [], currentQuestion: 0 },
              false,
              'RESET_QUESTIONS'
            );
          },
        };
      },
      { name: 'questions' }
    )
  )
);
