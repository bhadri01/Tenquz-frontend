import React, { useState } from 'react';
import QuizForm from './QuizForm';
import QuizDisplay from './QuizDisplay';
import { Quiz } from './types';

const App: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Quiz Generator</h1>
      <QuizForm setQuiz={setQuiz} />
      <QuizDisplay quiz={quiz} />
    </div>
  );
};

export default App;
