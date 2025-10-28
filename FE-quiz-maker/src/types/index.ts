export interface Question {
  id: number;
  type: "mcq" | "short";
  prompt: string;
  choices: string[];
  correctAnswer: string;
}

export interface SubmitAnswersPayload {
  quizId: number;
  answers: Record<number, string>;
}

