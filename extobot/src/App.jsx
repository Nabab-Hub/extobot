import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import InterviewQuestions1 from './pages/interviews/slot1/InterviewQuestions';
import InterviewQuestions2 from './pages/interviews/slot2/InterviewQuestions';
import InterviewQuestions3 from './pages/interviews/slot3/InterviewQuestions';
import InterviewQuestions4 from './pages/interviews/slot4/InterviewQuestions';
import InterviewQuestions5 from './pages/interviews/slot5/InterviewQuestions';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/interviews/slot1' element={<InterviewQuestions1 />} />
          <Route path='/interviews/slot2' element={<InterviewQuestions2 />} />
          <Route path='/interviews/slot3' element={<InterviewQuestions3 />} />
          <Route path='/interviews/slot4' element={<InterviewQuestions4 />} />
          <Route path='/interviews/slot5' element={<InterviewQuestions5 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
