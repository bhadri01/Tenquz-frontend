export interface Quiz {
    topic_title: string;
    tags: string[];
    time_to_solve: string;
    questions: Question[];
  }
  
  export interface Question {
    question: string;
    options: {
      a: string;
      b: string;
      c: string;
      d: string;
    };
    correct_answer: string;
    explanation: string;
  }
  