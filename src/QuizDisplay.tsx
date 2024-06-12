import React, { useState } from 'react';
import { Quiz } from './types';

interface QuizDisplayProps {
  quiz: Quiz | null;
}

const QuizDisplay: React.FC<QuizDisplayProps> = ({ quiz }) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  if (!quiz) return null;

  const handleChange = (questionIndex: number, option: string) => {
    setAnswers({
      ...answers,
      [questionIndex]: option,
    });
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">{quiz.topic_title}</h2>
      <ul>
        {quiz.questions.map((question, index) => (
          <li key={index} className="mb-4">
            <p className="font-semibold">{question.question}</p>
            <ul>
              {Object.entries(question.options).map(([key, option]) => (
                <li key={key} className="mb-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={key}
                      checked={answers[index] === key}
                      onChange={() => handleChange(index, key)}
                      className="form-radio"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                </li>
              ))}
            </ul>
            {submitted && (
              <p className={`text-sm ${answers[index] === question.correct_answer ? 'text-green-500' : 'text-red-500'}`}>
                Correct answer: {question.correct_answer}
              </p>
            )}
            {submitted && <p className="text-sm text-gray-500">Explanation: {question.explanation}</p>}
          </li>
        ))}
      </ul>
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Submit Quiz
        </button>
      )}
      {submitted && (
        <div className="mt-4">
          <p className="text-xl font-bold">Your score: {score} / {quiz.questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default QuizDisplay;
