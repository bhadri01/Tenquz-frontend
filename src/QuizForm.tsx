import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Quiz } from './types';

interface QuizFormProps {
  setQuiz: React.Dispatch<React.SetStateAction<Quiz | null>>;
}

interface QuizRequest {
  topics: string;
  difficulty: string;
}

const QuizForm: React.FC<QuizFormProps> = ({ setQuiz }) => {
  const { register, handleSubmit } = useForm<QuizRequest>();

  const onSubmit: SubmitHandler<QuizRequest> = (data) => {
    axios.post('http://localhost:8000/generate_quiz', data)
      .then(response => {
        setQuiz(response.data);
      })
      .catch(error => {
        console.error('There was an error generating the quiz!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="topics" className="block text-gray-700">Topics:</label>
        <input
          id="topics"
          {...register('topics', { required: true })}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="difficulty" className="block text-gray-700">Difficulty:</label>
        <select
          id="difficulty"
          {...register('difficulty', { required: true })}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4">Generate Quiz</button>
    </form>
  );
};

export default QuizForm;