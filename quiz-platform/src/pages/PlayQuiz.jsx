import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, TextField, Button, Card, CardContent, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PlayQuiz({ setFullName }) {
  const activeQuizzes = useSelector(s => s.questions.items.filter(q => q.active));
  const [name, setName] = useState('');
  const [quizIndex, setQuizIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();

  if (activeQuizzes.length === 0) 
    return <Box sx={{ p:2 }}>No active quizzes available. Create one first.</Box>;

  const quiz = activeQuizzes[0];
  const question = quiz.questions[questionIndex];

  const selectAnswer = (idx) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: idx }));
  };

  const next = () => {
    if (questionIndex < quiz.questions.length - 1) {
      setQuestionIndex(q => q + 1);
    }
  };

  const submit = () => {
    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (q.correctIndex === answers[i]) score++;
    });
    navigate('/result', { state: { score, total: quiz.questions.length } });
  };

  return (
    <Box sx={{ p: 2 }}>
      {!started ? (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label='Full name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Button onClick={() => {
           if(name.length < 5 || name.length > 50) return alert('Full name must be 5-50 chars');
            setFullName(name); // updates App.js state
            setStarted(true);
            }}>Start Quiz</Button>

        </Box>
      ) : (
        <Card>
          <CardContent>
            <Typography variant='h6'>{quiz.title}</Typography>
            <Typography sx={{ mt:1 }}>{question.text}</Typography>
            <RadioGroup value={answers[questionIndex] ?? ''} onChange={(e)=>selectAnswer(Number(e.target.value))}>
              {question.options.map((opt, idx) => (
                <FormControlLabel key={idx} value={idx} control={<Radio />} label={opt || `Option ${idx+1}`} />
              ))}
            </RadioGroup>

            <Box sx={{ display:'flex', gap:1 }}>
              <Button disabled={questionIndex===0} onClick={() => setQuestionIndex(q=>q-1)}>Previous</Button>
              {questionIndex < quiz.questions.length-1 ? (
                <Button disabled={answers[questionIndex] === undefined} onClick={next}>Next Question</Button>
              ) : (
                <Button disabled={answers[questionIndex] === undefined} onClick={submit}>Submit</Button>
              )}
            </Box>
            <Typography sx={{ mt:2 }}>{`Question ${questionIndex+1} / ${quiz.questions.length}`}</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
