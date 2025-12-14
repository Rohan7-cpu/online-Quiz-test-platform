import React, { useEffect, useState } from "react";
import {Box,TextField,Button,Typography,Paper,IconButton,Select,MenuItem,Checkbox,} from "@mui/material";
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

  /* ---------- LOAD QUIZ FOR EDIT  ---------- */
  useEffect(() => {
    if (id) {
      const quiz = quizzes.find((q) => q.id === id);
      if (quiz) {
        setTitle(quiz.title);
        setType(quiz.type);
        setQuestions(
          quiz.questions.map((q) => ({
            ...q,
            options: q.options ? [...q.options] : [],
            correct: Array.isArray(q.correct) ? [...q.correct] : q.correct,
          }))
        );
      }
    }
  }, [id, quizzes]);

  /* ---------- RESET QUESTIONS WHEN TYPE CHANGES  ---------- */
  useEffect(() => {
    if (!id) {
      setQuestions([createQuestion(type)]);
    }
  }, [type, id]);

  /* ---------- QUESTION HANDLERS ---------- */
  const addQuestion = () => {
    setQuestions((prev) => [...prev, createQuestion(type)]);
  };

  const addOption = (qIndex) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const deleteOption = (qIndex, optIndex) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.filter((_, oi) => oi !== optIndex),
            }
          : q
      )
    );
  };

  /* ---------- SAVE QUIZ  ---------- */
  const saveQuiz = () => {
    if (!title.trim()) {
      alert("Enter quiz title");
      return;
    }

    const safeQuestions = questions.map((q) => ({
      ...q,
      options: q.options ? [...q.options] : [],
      correct: Array.isArray(q.correct) ? [...q.correct] : q.correct,
    }));

    const quiz = {
      id: id || uid(),
      title,
      type,
      questions: safeQuestions,
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
              const value = e.target.value;
              setQuestions((prev) =>
                prev.map((x, i) =>
                  i === qIndex ? { ...x, question: value } : x
                )
              );
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
                    const value = e.target.value;
                    setQuestions((prev) =>
                      prev.map((x, i) =>
                        i === qIndex
                          ? {
                              ...x,
                              options: x.options.map((o, oi) =>
                                oi === optIndex ? value : o
                              ),
                            }
                          : x
                      )
                    );
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
                    const value = Number(e.target.value);
                    setQuestions((prev) =>
                      prev.map((x, i) =>
                        i === qIndex ? { ...x, correct: value } : x
                      )
                    );
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
                        const checked = e.target.checked;
                        setQuestions((prev) =>
                          prev.map((x, qi) => {
                            if (qi !== qIndex) return x;
                            const updated = checked
                              ? [...x.correct, i]
                              : x.correct.filter((v) => v !== i);
                            return { ...x, correct: updated };
                          })
                        );
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
                const value = e.target.value;
                setQuestions((prev) =>
                  prev.map((x, i) =>
                    i === qIndex ? { ...x, answer: value } : x
                  )
                );
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
                const value = e.target.value;
                setQuestions((prev) =>
                  prev.map((x, i) =>
                    i === qIndex ? { ...x, answer: value } : x
                  )
                );
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
