import React from "react";
import {Link} from "react-router-dom";

interface Course {
	id: string;
	Title: string;
	Description: string;
	price: string;
	image: string;
	isApproved: boolean;
	category: {id: string; title: string};
	Videos: {youtubeId: string}[]; // Assuming Videos is an array of objects with youtubeId
}

interface CourseCardProps {
	course: Course;
	onClick: () => void;
}

const CourseCards: React.FC<CourseCardProps> = ({course, onClick}) => {
	const {Title, Description, price, image, isApproved, Videos} = course;

	const videoUrl = Videos.length > 0 ? Videos[0].youtubeId : "";

	return (
		<div
			className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
			onClick={onClick}
		>
			<button
				type="button"
				onClick={onClick}
				className="text-blue-500 underline"
			>
				{image ? (
					<img className="p-0 rounded-t-lg" src={image} alt="" />
				) : (
					<video className="p-0 rounded-t-lg" controls>
						<source src={videoUrl} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				)}
			</button>
			<div className="px-5 pb-5">
				<Link to="#">
					<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
						{Title}
					</h5>
					<h5 className="text-sm font-semibold tracking-tight text-white dark:text-gray-200">
						{Description || ""}
					</h5>
				</Link>
				<div className="flex items-center mt-2.5 mb-5">
					{isApproved ? (
						<span className="bg-green-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded">
							Approved
						</span>
					) : (
						<span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
							Pending approval
						</span>
					)}
				</div>
				<div className="flex items-center justify-between">
					<span className="text-3xl font-bold text-gray-900 dark:text-white">
						{price ? `$${price}` : "Free"}
					</span>
				</div>
			</div>
		</div>
	);
};

export default CourseCards;
