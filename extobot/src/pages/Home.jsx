import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function Home() {
    const [examSlots, setExamSlots] = useState([])

    useEffect(() => {
        const slots = []
        const no_of_slots = 20;
        const colors = ['from-blue-500 to-cyan-400', 'from-red-500 to-pink-400', 'from-purple-500 to-indigo-400', 'from-amber-500 to-yellow-400', 'from-green-500 to-emerald-400', 'from-orange-500 to-red-400']
        for (let slot = 1; slot < no_of_slots+1; slot++) {
            slots.push({
                title: `Slot ${slot}`,
                color: colors[(slot-1)%colors.length],
                path: `slot${slot}`
            })
        }

        setExamSlots(slots)
    }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Master Your Exams
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your field of study and access thousands of practice questions to ace your exams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examSlots.map((category) => (
            <Link
              key={category.title}
              to={`/exam-cracker/${category.path}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
              <div className="relative p-8">
                {/* <category.icon className="w-12 h-12 text-white mb-4" /> */}
                <h2 className="text-2xl font-bold text-white mb-2">{category.title}</h2>
                {/* <p className="text-white/90 mb-6">{category.description}</p> */}
                <div className="flex items-center text-white">
                  <span className="font-medium">See Answers</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

       
      </div>
    </div>
  );
}

export default Home;
