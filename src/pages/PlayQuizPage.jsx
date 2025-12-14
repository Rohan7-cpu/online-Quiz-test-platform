import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PlayQuizPage() {
  const navigate = useNavigate();

  // basic state
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  // get quizzes from redux
  const quizzes = useSelector((s) => s.quizzes.items || []);

  // pick first active quiz (simple logic)
  const quiz = quizzes.find((q) => q.active === true);

  // no quiz found
  if (!quiz) {
    return <Typography>No quiz available</Typography>;
  }

  const questions = quiz.questions || [];
  const current = questions[qIndex];

  // start quiz
  const startQuiz = () => {
    if (name.length < 5) {
      alert("Enter your name properly cannot be less than 5");
      return;
    }
   sessionStorage.setItem("quiz_player", name);

    setStarted(true);
  };

  // next question
  const nextQuestion = () => {
    setQIndex(qIndex + 1);
  };

  // submit quiz (SAVE SCORE + DATE)
  const submitQuiz = () => {
    let score = 0;

    questions.forEach((q, i) => {
      // MCQ single
      if (quiz.type === "mcq-single") {
        if (answers[i] === q.correct) score++;
      }

      // MCQ multiple
      if (quiz.type === "mcq-multiple") {
        const correct = q.correct || [];
        const given = answers[i] || [];
        if (
          correct.length === given.length &&
          correct.every((x) => given.includes(x))
        ) {
          score++;
        }
      }
    });

    // save result
    localStorage.setItem(
      "quiz_result",
      JSON.stringify({
        name,
        score,
        total: questions.length,
        date: new Date().toISOString(),
      })
    );

    navigate("/result");
  };

  // STEP 1: ENTER NAME
  if (!started) {
    return (
      <Box sx={{ maxWidth: 300 }}>
        <Typography variant="h6">Enter your name</Typography>
        <TextField
          fullWidth
          sx={{ mt: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button sx={{ mt: 2 }} variant="contained" onClick={startQuiz}>
          Start Quiz
        </Button>
      </Box>
    );
  }

  // STEP 2: PLAY QUIZ
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{quiz.title}</Typography>
        <Typography sx={{ mt: 1, mb: 2 }}>
          {current.question}
        </Typography>

        {/* MCQ SINGLE */}
        {quiz.type === "mcq-single" && (
          <RadioGroup
            value={answers[qIndex] ?? ""}
            onChange={(e) =>
              setAnswers({ ...answers, [qIndex]: Number(e.target.value) })
            }
          >
            {current.options.map((opt, i) => (
              <FormControlLabel
                key={i}
                value={i}
                control={<Radio />}
                label={opt}
              />
            ))}
          </RadioGroup>
        )}

        {/* MCQ MULTIPLE */}
        {quiz.type === "mcq-multiple" &&
          current.options.map((opt, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={answers[qIndex]?.includes(i) || false}
                  onChange={(e) => {
                    const prev = answers[qIndex] || [];
                    const updated = e.target.checked
                      ? [...prev, i]
                      : prev.filter((x) => x !== i);
                    setAnswers({ ...answers, [qIndex]: updated });
                  }}
                />
              }
              label={opt}
            />
          ))}

        {/* SHORT ANSWER */}
        {quiz.type === "short-answer" && (
          <TextField
            fullWidth
            placeholder="Your answer"
            value={answers[qIndex] || ""}
            onChange={(e) =>
              setAnswers({ ...answers, [qIndex]: e.target.value })
            }
          />
        )}

        {/* PARAGRAPH */}
        {quiz.type === "paragraph" && (
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Your answer"
            value={answers[qIndex] || ""}
            onChange={(e) =>
              setAnswers({ ...answers, [qIndex]: e.target.value })
            }
          />
        )}

        {/* NAVIGATION */}
        <Box sx={{ mt: 2 }}>
          {qIndex < questions.length - 1 ? (
            <Button onClick={nextQuestion}>Next</Button>
          ) : (
            <Button onClick={submitQuiz}>Submit</Button>
          )}

          <Typography sx={{ float: "right" }}>
            {qIndex + 1} / {questions.length}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
