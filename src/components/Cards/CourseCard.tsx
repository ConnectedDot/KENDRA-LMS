import {Card} from "antd";
import React from "react";

interface CourseType {
	title: string;
	instructor: string;
	rating: string;
	price: string;
	image: string;
}

const CourseCard = ({course}: {course: any}) => {
	return (
		<>
			<div className="border-none rounded-none p-1 py-6">
				<img
					src={course.image}
					alt={course.title}
					className="w-full h-40 object-cover"
				/>
				<h3 className="mt-2 text-black text-lg font-bold">{course.title}</h3>
				<p className="mt-1 text-gray-600 truncate">{course.instructor}</p>
				<p className="mt-2 text-yellow-700 font-bold">{course.rating}</p>
				<p className="mt-0 mb-5 text-gray-900 font-bold">{course.price}</p>
			</div>
		</>
	);
};

export default CourseCard;
