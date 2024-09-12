import React from 'react';

const CourseNotes = ({ course }: { course: any }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Notes</h2>
      {course.notes.map((note: any, index: any) => (
        <div key={index} className="mb-4">
          <h3 className="font-bold">{note.title}</h3>
          <p className="text-gray-700">{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseNotes;
