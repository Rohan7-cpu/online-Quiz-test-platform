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
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { addQuizzes, updateQuiz } from "../features/quizzes/actions";
import { useNavigate, useParams } from "react-router-dom";
import { loadFromLocalStorage } from "../utils/localStorage";

/* ---------- helpers ---------- */
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function createQuestion(type) {
  return {
    id: uid(),
    question: "",
    options: type.startsWith("mcq") ? ["", ""] : [],
    correct: type === "mcq-multiple" ? [] : 0,
    answer: "",
  };
}

/* ---------- component ---------- */
export default function CreateQuizPage() {
  const { id } = useParams(); // edit mode if id exists
  const quizzes = useSelector((s) => s.quizzes.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("mcq-single");
  const [questions, setQuestions] = useState([createQuestion("mcq-single")]);

  /* ---------- ADMIN LOGIN CHECK (ONLY FOR CREATE) ---------- */
  useEffect(() => {
    if (!id) {
      const isLoggedIn = loadFromLocalStorage("is_logged_in");
      if (isLoggedIn !== "true") {
        navigate("/login");
      }
    }
  }, [id, navigate]);

  /* ---------- LOAD QUIZ FOR EDIT ---------- */
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

  /* ---------- RESET QUESTIONS WHEN TYPE CHANGES (ONLY CREATE) ---------- */
  useEffect(() => {
    if (!id) {
      setQuestions([createQuestion(type)]);
    }
  }, [type, id]);

  /* ---------- QUESTION HANDLERS ---------- */
  const addQuestion = () => {
    setQuestions([...questions, createQuestion(type)]);
  };

  const addOption = (qIndex) => {
    const copy = [...questions];
    copy[qIndex].options.push("");
    setQuestions(copy);
  };

  const deleteOption = (qIndex, optIndex) => {
    const copy = [...questions];
    copy[qIndex].options.splice(optIndex, 1);
    setQuestions(copy);
  };

  /* ---------- SAVE QUIZ ---------- */
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

  /* ---------- UI ---------- */
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {id ? "Edit Quiz" : "Create Quiz"}
      </Typography>

      {/* QUIZ TITLE */}
      <TextField
        label="Quiz Title"
        fullWidth
        sx={{ mb: 2 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* QUESTION TYPE */}
      <Select
        fullWidth
        value={type}
        onChange={(e) => setType(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="mcq-single">MCQ (Single Correct)</MenuItem>
        <MenuItem value="mcq-multiple">MCQ (Multiple Correct)</MenuItem>
        <MenuItem value="short-answer">Short Answer</MenuItem>
        <MenuItem value="description">Description</MenuItem>
      </Select>

      {/* QUESTIONS */}
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

          {/* MCQ OPTIONS */}
          {type.startsWith("mcq") &&
            q.options.map((opt, optIndex) => (
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

          {/* MCQ CONTROLS */}
          {type.startsWith("mcq") && (
            <Box sx={{ mt: 1 }}>
              <Button onClick={() => addOption(qIndex)}>Add Option</Button>

              {/* SINGLE CORRECT */}
              {type === "mcq-single" && (
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
              )}

              {/* MULTIPLE CORRECT */}
              {type === "mcq-multiple" &&
                q.options.map((_, i) => (
                  <Box key={i}>
                    <Checkbox
                      checked={q.correct.includes(i)}
                      onChange={(e) => {
                        const copy = [...questions];
                        const arr = copy[qIndex].correct;
                        copy[qIndex].correct = e.target.checked
                          ? [...arr, i]
                          : arr.filter((x) => x !== i);
                        setQuestions(copy);
                      }}
                    />
                    Option {i + 1}
                  </Box>
                ))}
            </Box>
          )}

          {/* SHORT ANSWER */}
          {type === "short-answer" && (
            <TextField
              fullWidth
              label="Correct Answer"
              sx={{ mt: 1 }}
              value={q.answer}
              onChange={(e) => {
                const copy = [...questions];
                copy[qIndex].answer = e.target.value;
                setQuestions(copy);
              }}
            />
          )}

          {/* DESCRIPTION */}
          {type === "description" && (
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Answer (Description)"
              sx={{ mt: 1 }}
              value={q.answer}
              onChange={(e) => {
                const copy = [...questions];
                copy[qIndex].answer = e.target.value;
                setQuestions(copy);
              }}
            />
          )}
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
