import { useState } from "react";
import { useQuizById, useSubmitAnswers } from "../hooks/useQuiz";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Question } from "../types";

export default function Player() {
  const router = useRouter();

  const [quizId, setQuizId] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const { mutateAsync: submitAnswers, isPending } = useSubmitAnswers();

  const { data: quiz, isError, isLoading } = useQuizById(quizId);

  const handleSubmit = async () => {
    try {
      const result = await submitAnswers({
        quizId: Number(quizId),
        answers,
      });
      setScore(result.score);
    } catch (err: any) {
      alert(err.message || "Submission failed");
    }
  };

  console.log("quiz", quiz);
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <Card className="w-full max-w-2xl p-6 shadow-lg">
        <Stack direction={"row"} gap={1}>
          <Button variant="outlined" onClick={() => router.push("/")}>
            Back
          </Button>
          <Typography variant="h4" className="mt-4 mb-4 font-bold">
            Quiz Player
          </Typography>
        </Stack>

        {isError && (
          <Typography color="error" className="mt-4">
            Quiz not found. Please try again.
          </Typography>
        )}

        {!quiz ? (
          <Card className="w-full p-4">
            <TextField
              label="Enter Quiz ID"
              fullWidth
              margin="normal"
              value={quizId}
              onChange={(e) => setQuizId(e.target.value)}
            />

            {isLoading && (
              <div className="flex items-center justify-center">
                <CircularProgress />
              </div>
            )}
          </Card>
        ) : score !== null ? (
          <div className="text-center">
            <Typography variant="h6" className="text-green-600">
              Your Score: {score} / {quiz.questions.length}
            </Typography>
            <Typography variant="h6" className="text-left">
              Correct Answers
            </Typography>
            {quiz.questions.map((q: Question, i: number) => (
              <Typography variant="h6" className="text-left">
                {i + 1}: {q.correctAnswer}
              </Typography>
            ))}
          </div>
        ) : (
          <>
            <Typography variant="h6">{quiz.title}</Typography>
            <Typography variant="body2" className="mb-4 text-gray-600">
              {quiz.description}
            </Typography>

            {quiz.questions.map((q: any, i: number) => (
              <div key={q.id} className="mb-6">
                <Typography variant="subtitle1">
                  {i + 1}. {q.prompt}
                </Typography>

                {q.type === "mcq" ? (
                  <div className="flex flex-col gap-2 mt-2">
                    {q.options.map((opt: string, oi: number) => (
                      <Button
                        key={oi}
                        variant={
                          answers[q.id] === opt ? "contained" : "outlined"
                        }
                        onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Your Answer"
                    value={answers[q.id] || ""}
                    onChange={(e) =>
                      setAnswers({ ...answers, [q.id]: e.target.value })
                    }
                  />
                )}
              </div>
            ))}

            <Button variant="contained" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}
