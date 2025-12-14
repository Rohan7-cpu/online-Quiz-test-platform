import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreateQuizPage from './pages/CreateQuizPage';
import MyQuizzesPage from './pages/MyQuizzesPage';
import PlayQuizPage from './pages/PlayQuizPage';
import ResultPage from './pages/ResultPage';
import AuthPage from './pages/AuthPage';
import { Container } from '@mui/material';
import Login from './components/Login';


export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="lg" style={{ marginTop: 24 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateQuizPage />} />
          <Route path="/my-quizzes" element={<MyQuizzesPage />} />
          <Route path="/play" element={<PlayQuizPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path ="/login" element={<Login/>}/>
          <Route path="/edit/:id" element={<CreateQuizPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
