import React from 'react';
import { Quiz } from './types';

interface QuizDisplayProps {
  quiz: Quiz | null;
}

const QuizDisplay: React.FC<QuizDisplayProps> = ({ quiz }) => {
  if (!quiz) return null;

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">{quiz.topic_title}</h2>
      <ul>
        {quiz.questions.map((question, index) => (
          <li key={index} className="mb-4">
            <p className="font-semibold">{question.question}</p>
            <ul>
              {Object.entries(question.options).map(([key, option]) => (
                <li key={key}>{key}: {option}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-500">Correct answer: {question.correct_answer}</p>
            <p className="text-sm text-gray-500">Explanation: {question.explanation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizDisplay;
