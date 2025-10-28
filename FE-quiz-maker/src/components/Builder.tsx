import { useState } from "react";
import { useCreateQuiz } from "../hooks/useQuiz";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

export default function Builder() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const createQuiz = useCreateQuiz();
  const router = useRouter();

  const addQuestion = (type: "mcq" | "short") => {
    if (questions.length >= 10) return;
    const newQuestion = {
      type,
      prompt: "",
      correctAnswer: "",
      options: type === "mcq" ? ["", "", "", ""] : "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, key: string, value: any) => {
    const updated = [...questions];
    (updated[index] as any)[key] = value;
    setQuestions(updated);
  };

  const handleSave = async () => {
    const quizId = await createQuiz.mutateAsync({ title, description, questions });
    alert(`Quiz saved successfully! Your Quiz ID is ${quizId}`);
    router.push("/");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-3">
      <Stack direction={"row"} gap={1}>
        <Button variant="outlined" onClick={() => router.push("/")}>
          Back
        </Button>
        <Typography variant="h4" className="mt-4 mb-4 font-bold">
          Quiz Builder
        </Typography>
      </Stack>

      <Card className="p-6 shadow-lg">
        <CardContent className="flex flex-col gap-3">
          <Stack direction={"column"} gap={1}>
            <TextField
              label="Quiz Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
        </CardContent>
      </Card>

      {questions.map((q, i) => (
        <Card key={i} className="p-4 mb-4">
          <CardContent>
            <Stack direction={"column"} gap={1}>
              <TextField
                select
                label="Question Type"
                fullWidth
                value={q.type}
                onChange={(e) => updateQuestion(i, "type", e.target.value)}
              >
                <MenuItem value="mcq">Multiple Choice</MenuItem>
                <MenuItem value="short">Short Answer</MenuItem>
              </TextField>
              <TextField
                label="Question Prompt"
                fullWidth
                value={q.prompt}
                onChange={(e) => updateQuestion(i, "prompt", e.target.value)}
              />
              {q.type === "mcq" &&
                q.options.map((opt: string, j: number) => (
                  <TextField
                    key={j}
                    label={`Choice ${j + 1}`}
                    fullWidth
                    value={opt}
                    onChange={(e) => {
                      const newOptions = [...q.options];
                      newOptions[j] = e.target.value;
                      updateQuestion(i, "options", newOptions);
                    }}
                  />
                ))}
              <TextField
                label="Correct Answer"
                fullWidth
                value={q.correctAnswer}
                onChange={(e) =>
                  updateQuestion(i, "correctAnswer", e.target.value)
                }
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() =>
                  setQuestions(questions.filter((_, idx) => idx !== i))
                }
              >
                Remove Question
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}

      <Stack direction={"row"} gap={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addQuestion("mcq")}
          disabled={questions.length >= 10}
        >
          Add Question
        </Button>

        <Button
          variant="contained"
          color="success"
          className="ml-4"
          onClick={handleSave}
          disabled={createQuiz.isPending}
        >
          {createQuiz.isPending ? "Saving..." : "Save Quiz"}
        </Button>
      </Stack>
    </div>
  );
}
