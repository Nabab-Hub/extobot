import React, { useEffect, useState } from 'react';
import { Search, Copy, CheckCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../store/firebasedb'
import { ref, onValue, off } from "firebase/database";

function ExamCrackers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const {database} = useFirebase()
  const { slotid } = useParams();
  // Sample questions data
  const [questions, setQuestions] = useState([]);

  const filteredQuestions = questions.filter(q => 
    String(q.question).toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(q.answer).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyToClipboard = (index, question, options) => {
    const formattedText = `Question: ${question}\n\nOptions:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}`;
    navigator.clipboard.writeText(formattedText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  useEffect(() => {
    // console.log(slotid);

    
    // const questionsRef = ref(database, `interviews/${params.slotid}`); // Reference to the database path

    // // Listening for real-time updates
    // onValue(questionsRef, (snapshot) => {
    //   const data = snapshot.val();
    //   if (data) {
    //     const convertedData = []
    //     Object.values(data).map((item) => {
    //       convertedData.push(item)
    //     })
        
    //     setQuestions(convertedData.reverse()); // Update state with new data
    //     console.log(data);
        
    //   }
    // });

    // Ensure slotid exists before proceeding
    if (!slotid) return;

    const questionsRef = ref(database, `interviews/${slotid}`);

    // Listening for real-time updates
    const unsubscribe = onValue(questionsRef, (snapshot) => {
      const data = snapshot.val();
      // console.log('Data:', data);
      
      if (data) {
        const convertedData = Object.values(data).reverse();
        setQuestions(convertedData); // Update state with reversed data
        // console.log(data); // Debugging line (optional)
      }
    }, (error) => {
      console.error(error)
    });

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      off(questionsRef); // Detach the listener
    };
  }, [slotid])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">
            Online Exam Crackers
          </h1>
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="Search questions or answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredQuestions.map((q, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-900 flex-grow pr-4">
                    {q.question}
                  </h2>
                  <button
                    onClick={() => copyToClipboard(index, q.question, q.options)}
                    className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                    title="Copy question and options"
                  >
                    {copiedIndex === index ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <Copy className="h-6 w-6" />
                    )}
                  </button>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-500">Answer:</div>
                  <div className="mt-2 text-lg text-indigo-700 font-medium">
                    {q.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExamCrackers;









// import React, { useState } from 'react';
// import { Search, Copy, CheckCircle } from 'lucide-react';
// import './ExamCrackers.css'; // Importing the CSS file

// // Sample questions data
// const questions = [
//   {
//     question: "What is the full form of API?",
//     options: [
//       "Application Protocol Interface",
//       "Application Programming Interface",
//       "Advanced Programming Interface",
//       "Application Process Integration"
//     ],
//     answer: "Application Programming Interface"
//   },
//   {
//     question: "Which programming language is known as the 'mother of all languages'?",
//     options: [
//       "Java",
//       "C",
//       "Python",
//       "Assembly Language"
//     ],
//     answer: "C"
//   },
//   {
//     question: "What does HTML stand for?",
//     options: [
//       "Hyper Text Markup Language",
//       "High Tech Modern Language",
//       "Hyper Transfer Markup Language",
//       "Hybrid Text Making Language"
//     ],
//     answer: "Hyper Text Markup Language"
//   }
// ];

// function ExamCrackers() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [copiedIndex, setCopiedIndex] = useState(null);

//   const filteredQuestions = questions.filter(q => 
//     q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     q.answer.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const copyToClipboard = (index, question, options) => {
//     const formattedText = `Question: ${question}\n\nOptions:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}`;
//     navigator.clipboard.writeText(formattedText);
//     setCopiedIndex(index);
//     setTimeout(() => setCopiedIndex(null), 2000);
//   };

//   return (
//     <div className="container">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="title">Online Exam Crackers</h1>
//           <div className="search-bar">
//             <div className="search-icon">
//               <Search className="search-icon-svg" />
//             </div>
//             <input
//               type="text"
//               className="search-input"
//               placeholder="Search questions or answers..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="questions-list">
//           {filteredQuestions.map((q, index) => (
//             <div key={index} className="question-card">
//               <div className="card-content">
//                 <div className="flex justify-between items-start">
//                   <h2 className="question-text">{q.question}</h2>
//                   <button
//                     onClick={() => copyToClipboard(index, q.question, q.options)}
//                     className="copy-btn"
//                     title="Copy question and options"
//                   >
//                     {copiedIndex === index ? (
//                       <CheckCircle className="check-icon" />
//                     ) : (
//                       <Copy className="copy-icon" />
//                     )}
//                   </button>
//                 </div>
//                 <div className="mt-4">
//                   <div className="answer-label">Answer:</div>
//                   <div className="answer-text">{q.answer}</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ExamCrackers;
