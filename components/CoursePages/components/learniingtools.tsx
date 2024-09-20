import React from "react";

const LearningTabs = ({course}: {course: any}) => {
	return (
		<div className="p-4 bg-white">
			<h2 className="text-3xl font-bold mb-4">
				E-learninig Tools made Available
			</h2>
			{/* {course?.notes.map((note: any, index: any) => (
        <div key={index} className="mb-4">
          <h3 className="font-bold">{note.title}</h3>
          <p className="text-gray-700">{note.content}</p>
        </div>
      ))} */}
		</div>
	);
};

export default LearningTabs;
