import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost } from '../lib/api';
import { SubmitAnswersPayload } from '../types';

// A helper function to create a delay
const sleep = (ms: any) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export function useQuizzes() {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: async () => {
      const res = await apiGet('/quizzes');
      return res;
    },
  });
}

export function useQuizById(quizId?: string) {
  return useQuery({
    queryKey: ['quiz', quizId],
  queryFn: async () => {
      await sleep(2000); // Add a 5-second delay before fetching
      if (!quizId) throw new Error('Quiz ID missing');
      const res = await apiGet(`/quizzes/${quizId}`);
      return res;
    },
    enabled: !!quizId,

  });
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (quiz: { title: string; description: string; questions: any[] }) => {
      const res = await apiPost('/quizzes', {
        title: quiz.title,
        description: quiz.description,
        isPublished: true,
      });

      const quizId = res.id;
      for (const q of quiz.questions) {
        await apiPost(`/quizzes/${quizId}/questions`, q);
      }
      return quizId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });
}

export const useSubmitAnswers = () => {
  return useMutation({
    mutationFn: async ({ quizId, answers }: SubmitAnswersPayload) => {
      // 1️⃣ Create attempt
      const attemptRes = await apiPost("/attempts", { quizId });
      const attempt = attemptRes;

      // 2️⃣ Submit each answer
      for (const [qid, value] of Object.entries(answers)) {
        await apiPost(`/attempts/${attempt.id}/answer`, {
          questionId: Number(qid),
          value,
        });
      }

      // 3️⃣ Finalize and get result
      const resultRes = await apiPost(`/attempts/${attempt.id}/submit`, {});
      return resultRes; // expected to include { score }
    },
  });
};