import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { addQuizzes, updateQuiz } from "../features/quizzes/actions";
import { useNavigate, useParams } from "react-router-dom";

// id generator
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// empty question
function emptyQuestion() {
  return {
    id: uid(),
    question: "",
    options: ["", ""],
    correct: 0,
  };
}

export default function CreateQuizPage() {
  const { id } = useParams(); // 👈 edit mode if id exists
  const quizzes = useSelector((s) => s.quizzes.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("mcq-single");
  const [questions, setQuestions] = useState([emptyQuestion()]);

  // LOAD QUIZ IF EDIT MODE
  useEffect(() => {
    if (id) {
      const quiz = quizzes.find((q) => q.id === id);
      if (quiz) {
        setTitle(quiz.title);
        setType(quiz.type);
        setQuestions(quiz.questions);
      }
    }
  }, [id, quizzes]);

  // add question
  const addQuestion = () => {
    setQuestions([...questions, emptyQuestion()]);
  };

  // add option
  const addOption = (qIndex) => {
    const copy = [...questions];
    copy[qIndex].options.push("");
    setQuestions(copy);
  };

  // delete option
  const deleteOption = (qIndex, optIndex) => {
    const copy = [...questions];
    copy[qIndex].options.splice(optIndex, 1);
    setQuestions(copy);
  };

  // save quiz
  const saveQuiz = () => {
    if (!title.trim()) {
      alert("Enter quiz title");
      return;
    }

    const quiz = {
      id: id || uid(),
      title,
      type,
      questions,
      active: true,
      createdAt: new Date().toISOString(),
    };

    if (id) {
      dispatch(updateQuiz(quiz));
      alert("Quiz updated");
    } else {
      dispatch(addQuizzes(quiz));
      alert("Quiz created");
    }

    navigate("/my-quizzes");
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {id ? "Edit Quiz" : "Create Quiz"}
      </Typography>

      <TextField
        label="Quiz Title"
        fullWidth
        sx={{ mb: 2 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Select
        value={type}
        onChange={(e) => setType(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="mcq-single">MCQ (Single)</MenuItem>
        <MenuItem value="mcq-multiple">MCQ (Multiple)</MenuItem>
      </Select>

      {questions.map((q, qIndex) => (
        <Paper key={q.id} sx={{ p: 2, mb: 2 }}>
          <TextField
            label={`Question ${qIndex + 1}`}
            fullWidth
            sx={{ mb: 1 }}
            value={q.question}
            onChange={(e) => {
              const copy = [...questions];
              copy[qIndex].question = e.target.value;
              setQuestions(copy);
            }}
          />

          {q.options.map((opt, optIndex) => (
            <Box key={optIndex} sx={{ display: "flex", gap: 1, mt: 1 }}>
              <TextField
                fullWidth
                value={opt}
                onChange={(e) => {
                  const copy = [...questions];
                  copy[qIndex].options[optIndex] = e.target.value;
                  setQuestions(copy);
                }}
              />

              <IconButton onClick={() => deleteOption(qIndex, optIndex)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Box sx={{ mt: 1 }}>
            <Button onClick={() => addOption(qIndex)}>Add Option</Button>

            <Select
              value={q.correct}
              onChange={(e) => {
                const copy = [...questions];
                copy[qIndex].correct = Number(e.target.value);
                setQuestions(copy);
              }}
              sx={{ ml: 2 }}
            >
              {q.options.map((_, i) => (
                <MenuItem key={i} value={i}>
                  Correct Option {i + 1}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Paper>
      ))}

      <Button variant="outlined" onClick={addQuestion}>
        Add Question
      </Button>

      <Button variant="contained" sx={{ ml: 2 }} onClick={saveQuiz}>
        {id ? "Update Quiz" : "Save Quiz"}
      </Button>
    </Box>
  );
}
