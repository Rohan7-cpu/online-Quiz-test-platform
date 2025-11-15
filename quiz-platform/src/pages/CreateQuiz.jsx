import React, { useState } from 'react';
import { Box, TextField, Button, Grid, MenuItem, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Select, InputLabel, FormControl, Radio, Checkbox, FormControlLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addQuiz } from '../store/questionsSlice';
import { v4 as uuidv4 } from 'uuid';

function validateFullTitle(title) {
  return title && title.length >= 10 && title.length <= 30;
}
function validateQuestionText(q) {
  return q && q.length >= 10 && q.length <= 200;
}

export default function CreateQuiz() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(true);
  const [type, setType] = useState('mcq-single');
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{
    id: uuidv4(),
    text: '',
    options: ['',''],
    correctIndex: 0,       // For single correct
    correctIndices: []     // For multi correct
  }]);
  const [successOpen, setSuccessOpen] = useState(false);

  // Option handlers
  function addOption(qid) {
    setQuestions(prev => prev.map(q => q.id === qid ? {...q, options: [...q.options, '']} : q));
  }
  function deleteOption(qid, idx) {
    setQuestions(prev => prev.map(q => q.id === qid ? {
      ...q,
      options: q.options.filter((_,i)=> i!==idx),
      correctIndices: q.correctIndices?.filter(i => i !== idx),
      correctIndex: q.correctIndex >= idx ? 0 : q.correctIndex
    } : q));
  }
  function setOptionText(qid, idx, val) {
    setQuestions(prev => prev.map(q => q.id === qid ? {...q, options: q.options.map((o,i)=> i===idx?val:o)} : q));
  }

  function addEmptyQuestion() {
    setQuestions(prev => [...prev, { id: uuidv4(), text: '', options: ['',''], correctIndex: 0, correctIndices: [] }]);
  }

  function save() {
    if (!validateFullTitle(title)) return alert('Title must be 10-30 chars');
    for (const q of questions) {
      if (!validateQuestionText(q.text)) return alert('Each question text must be 10-200 chars');
      if ((q.options || []).length < 2) return alert('At least two options required to save question');
    }
    const payload = {
      id: uuidv4(),
      title,
      createdAt: new Date().toISOString(),
      active: true,
      type,
      questions
    };
    dispatch(addQuiz(payload));
    setSuccessOpen(true);
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Question type selection */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Select Question Type</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id='type-label'>Type</InputLabel>
            <Select labelId='type-label' value={type} label='Type' onChange={e=>setType(e.target.value)}>
              <MenuItem value="mcq-single">MCQ (single correct)</MenuItem>
              <MenuItem value="mcq-multi">MCQ (multi correct)</MenuItem>
              <MenuItem value="short">Short Answer (2 words)</MenuItem>
              <MenuItem value="desc">Description (2-4 sentences)</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setModalOpen(false)}>Continue</Button>
        </DialogActions>
      </Dialog>

      <Typography variant='h5' sx={{ mb: 2 }}>Create Quiz — {type}</Typography>
      <TextField label='Quiz Title' fullWidth value={title} onChange={e=>setTitle(e.target.value)} sx={{ mb: 2 }} />

      {questions.map((q, qi) => (
        <Box key={q.id} sx={{ mb: 3, border: '1px solid #eee', p: 2, borderRadius: 1 }}>
          <TextField label={`Question ${qi+1}`} fullWidth value={q.text} onChange={e=>{
            setQuestions(prev => prev.map(x => x.id===q.id? {...x, text: e.target.value}: x));
          }} sx={{ mb: 1 }} />

          <Grid container spacing={1}>
            {q.options.map((opt, idx) => (
              <Grid key={idx} item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {/* Correct answer selector */}
                  {type === 'mcq-single' && (
                    <Radio
                      checked={q.correctIndex === idx}
                      onChange={() => setQuestions(prev => prev.map(x => x.id === q.id ? { ...x, correctIndex: idx } : x))}
                    />
                  )}
                  {type === 'mcq-multi' && (
                    <Checkbox
                      checked={q.correctIndices.includes(idx)}
                      onChange={() => setQuestions(prev => prev.map(x => {
                        if(x.id !== q.id) return x;
                        const indices = x.correctIndices || [];
                        if(indices.includes(idx)) {
                          return {...x, correctIndices: indices.filter(i=>i!==idx)};
                        } else {
                          return {...x, correctIndices: [...indices, idx]};
                        }
                      }))}
                    />
                  )}
                  <TextField placeholder='Option text' value={opt} onChange={e=>setOptionText(q.id, idx, e.target.value)} fullWidth />
                  <Button variant='outlined' color='error' onClick={() => deleteOption(q.id, idx)}>Delete</Button>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 1 }}>
            <Button variant='contained' onClick={() => addOption(q.id)}>Add Option</Button>
          </Box>
        </Box>
      ))}

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant='outlined' onClick={addEmptyQuestion}>Add Question</Button>
        <Button variant='contained' onClick={save}>Save</Button>
      </Box>

      <Dialog open={successOpen} onClose={() => setSuccessOpen(false)}>
        <DialogTitle>Quiz created successfully</DialogTitle>
        <DialogActions>
          <Button onClick={() => window.location.href = '/my'}>View all quizzes</Button>
          <Button onClick={() => setSuccessOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
