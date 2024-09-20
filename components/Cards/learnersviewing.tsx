import React from "react";
import CourseCard from "./coursecard";

interface Course {
	title: string;
	instructor: string;
	rating: string;
	price: string;
	image: string;
}

const LearnersAreViewing = ({courses}: {courses: Course[]}) => {
	return (
		<div className="mb-8">
			<h2 className="text-2xl font-semibold mb-4">Learners are viewing</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
				{courses.map((course, index) => (
					<CourseCard key={index} course={course} />
				))}
			</div>
		</div>
	);
};

export default LearnersAreViewing;
