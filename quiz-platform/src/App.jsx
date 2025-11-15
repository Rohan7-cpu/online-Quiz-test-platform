import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import MyQuizzes from './pages/MyQuizzes';
import PlayQuiz from './pages/PlayQuiz';
import Result from './pages/Result';
import AdminLogin from './pages/AdminLogin';

export default function App() {
  const [fullName, setFullName] = useState('');
  return (
    <div>
      <Navbar fullName={fullName} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateQuiz />} />
        <Route path='/my' element={<MyQuizzes />} />
        <Route path='/admin-login'element={<AdminLogin/>} />
          <Route path="/play" element={<PlayQuiz setFullName={setFullName} />} />
        <Route path='/result' element={<Result />} />
      </Routes>
    </div>
  );
}
