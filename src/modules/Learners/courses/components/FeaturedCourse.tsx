import React from "react";
import {Link} from "react-router-dom";

interface FeaturedCourseProps {
	title: string;
	category: string;
	description: string;
	imageUrl: string;
	link: string;
}

interface Course {
	id: string;
	Title: string;
	Description: string;
	price: string;
	image: string;
	category: {id: string; title: string};
	Videos: {youtubeId: string}[]; // Assuming Videos is an array of objects with youtubeId
	// Add other course fields as needed
}

interface CourseCardProps {
	course: Course;
	onClick: () => void;
}

const FeaturedCourse: React.FC<CourseCardProps> = ({course, onClick}) => {
	const {Title, Description, price, image, category, Videos} = course;
	return (
		<div
			onClick={onClick}
			className="max-w-sm h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col"
		>
			<img
				className="rounded-t-lg max-h-48 bg-contain bg-center w-full"
				src={image}
				alt={Title}
			/>

			<div className="p-5 flex flex-col flex-grow">
				<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
					{Title}
				</h5>

				<p className="mb-3 font-normal text-yellow-700 dark:text-yellow-500">
					{category?.title || ""}
				</p>
				<p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 flex-grow">
					{Description}
				</p>
			</div>
		</div>
	);
};

export default FeaturedCourse;
