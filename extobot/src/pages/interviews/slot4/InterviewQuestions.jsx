import React, { useEffect, useState } from 'react';
import './InterviewQuestions.css';
import { useFirebase } from '../../../store/firebasedb'
import { ref, onValue } from "firebase/database";

const InterviewQuestions4 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndexes, setActiveIndexes] = useState([]);
  const {database} = useFirebase()
  const [questions, setQuestions] = useState([]);

  const toggleAnswer = (index) => {
    if (activeIndexes.includes(index)) {
      setActiveIndexes(activeIndexes.filter(i => i !== index));
    } else {
      setActiveIndexes([...activeIndexes, index]);
    }
  };

  useEffect(() => {
          const questionsRef = ref(database, "interviews/slot4"); // Reference to the database path
  
          // Listening for real-time updates
          onValue(questionsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              const convertedData = []
              Object.values(data).map((item) => {
                convertedData.push(item)
              })
              
              setQuestions(convertedData.reverse()); // Update state with new data
            }
          });
      
          // Cleanup function (not required for onValue but good practice)
          return () => {
            // You can detach the listener if needed
          };
        }, []);

  return (
    <div className="interview-container">
      <h1 className="main-header">Interview Cracker</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="questions-grid">
        {questions.map((item, index) => (
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ? 
          <div 
            key={index}
            className={`question-card ${activeIndexes.includes(index) ? 'active' : ''}`}
            onClick={() => toggleAnswer(index)}
          >
            <div className="question-header">
              <h3 className="question-text">{item.question}</h3>
              <span className="toggle-icon">
                {activeIndexes.includes(index) ? '-' : '+'}
              </span>
            </div>
            
            {activeIndexes.includes(index) && (
              <div className="answer-container">
                <p className="answer-text">{item.answer}</p>
              </div>
            )}
          </div>
          :
          null
        ))}
      </div>
    </div>
  );
};

export default InterviewQuestions4;
