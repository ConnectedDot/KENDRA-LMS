import React, { useState } from 'react';

const CourseQnA = ({ course }: { course: any }) => {
  const [questions, setQuestions] = useState(course);

  return (
    <div className="p-4 bg-white">
      <h2 className="text-3xl font-bold mb-10">Questions & Answers</h2>
      {course?.Questions?.length > 0 ? (
        course.Questions.map((question: any, index: number) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold">{question.question}</h3>
            <p className="text-gray-700">{question.answer}</p>
          </div>
        ))
      ) : (
        <h2 className="text-3xl font-bold mb-4">No Questions & Answers</h2>
      )}
    </div>
  );
};

export default CourseQnA;
