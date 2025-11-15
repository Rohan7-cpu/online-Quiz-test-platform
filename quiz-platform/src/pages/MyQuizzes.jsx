import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableHead, TableCell, TableRow, TableBody, IconButton, Switch, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { deleteQuiz, toggleActive, updateQuiz } from '../store/questionsSlice';
import { useNavigate } from 'react-router-dom';

export default function MyQuizzes({ role }) {
  const quizzes = useSelector(s => s.questions.items);
  const dispatch = useDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  function openEdit(q) {
    setCurrent(JSON.parse(JSON.stringify(q)));
    setEditOpen(true);
  }

  function saveEdit() {
    if (!current.title || current.title.length < 10) return alert('Title must be at least 10 chars');
    dispatch(updateQuiz(current));
    setEditOpen(false);
  }

  const createnewquiz = () => {
    if (role === 'admin') {
      navigate('/create');
    } else {
      navigate('/admin-login');
      alert("If you are admin then login");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={createnewquiz}
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
          mb: 2,
          '&:hover': { backgroundColor: '#1976d2' }
        }}
      >
        Create new Quiz
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map((q, index) => (
            <TableRow key={q.id}>
              <TableCell>{index + 1}</TableCell> {/* Serial number */}
              <TableCell>
                <Button onClick={() => openEdit(q)}>{q.title}</Button>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Switch checked={!!q.active} onChange={() => dispatch(toggleActive(q.id))} />
                  <Typography variant="body2">
                    {q.active ? 'Active' : 'Inactive'}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{new Date(q.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <IconButton onClick={() => openEdit(q)}> <EditIcon /> </IconButton>
                <IconButton onClick={() => { setCurrent(q); setConfirmOpen(true); }}> <DeleteIcon /> </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Quiz Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth='md'>
        <DialogTitle>Edit Quiz</DialogTitle>
        <DialogContent>
          {current && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label='Title' value={current.title} onChange={e => setCurrent({ ...current, title: e.target.value })} />
              {current.questions.map((q, qi) => (
                <Box key={q.id} sx={{ border: '1px solid #eee', p: 1 }}>
                  <TextField
                    label={`Question ${qi + 1}`}
                    fullWidth
                    value={q.text}
                    onChange={e => {
                      const arr = current.questions.map(x => x.id === q.id ? { ...x, text: e.target.value } : x);
                      setCurrent({ ...current, questions: arr });
                    }}
                  />
                  {q.options.map((opt, idx) => (
                    <Box key={idx} sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <TextField
                        value={opt}
                        onChange={e => {
                          const arr = current.questions.map(x => {
                            if (x.id === q.id) {
                              const opts = x.options.map((o, i) => i === idx ? e.target.value : o);
                              return { ...x, options: opts };
                            }
                            return x;
                          });
                          setCurrent({ ...current, questions: arr });
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant='contained' onClick={saveEdit}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>No</Button>
          <Button
            variant='contained'
            color='error'
            onClick={() => { dispatch(deleteQuiz(current.id)); setConfirmOpen(false); }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
