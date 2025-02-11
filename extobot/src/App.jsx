import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import InterviewQuestions1 from './pages/interviews/slot1/InterviewQuestions';
import InterviewQuestions2 from './pages/interviews/slot2/InterviewQuestions';
import InterviewQuestions3 from './pages/interviews/slot3/InterviewQuestions';
import InterviewQuestions4 from './pages/interviews/slot4/InterviewQuestions';
import InterviewQuestions5 from './pages/interviews/slot5/InterviewQuestions';
import ErrorPage from './pages/ErrorPage'


function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/test' element={<Home />} />
          <Route path='/' element={<InterviewQuestions1 />} />
          <Route path='/interviewslot2' element={<InterviewQuestions2 />} />
          <Route path='/interviewslot3' element={<InterviewQuestions3 />} />
          <Route path='/interviewslot4' element={<InterviewQuestions4 />} />
          <Route path='/interviewslot5' element={<InterviewQuestions5 />} />
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
