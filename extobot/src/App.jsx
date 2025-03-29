import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import ExamCrackers from './pages/ExamCrackers';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/exam-cracker/:slotid' element={<ExamCrackers />} />
          <Route path='/*' element={<ErrorPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
