import React from "react";
import {Link} from "react-router-dom";

interface Course {
	id: string;
	Title: string;
	Description: string;
	price: string;
	image: string;
	category: {id: string; title: string};
	Videos: {youtubeId: string}[]; // Assuming Videos is an array of objects with youtubeId
}

interface CourseCardProps {
	course: Course;
	onClick: () => void;
}

const CourseCards: React.FC<CourseCardProps> = ({course, onClick}) => {
	const {Title, Description, price, image, category, Videos} = course;

	const videoUrl = Videos.length > 0 ? Videos[0].youtubeId : "";

	return (
		<div
			className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
			onClick={onClick}
		>
			<button
				type="button"
				onClick={onClick}
				className="text-blue-500 underline"
			>
				{image ? (
					<img className="p-8 rounded-t-lg" src={image} alt="" />
				) : (
					<video className="p-8 rounded-t-lg" controls>
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
					<h5 className="text-xl font-semibold tracking-tight text-white00 dark:text-gray-600">
						{category?.title || ""}
					</h5>
				</Link>
				<div className="flex items-center mt-2.5 mb-5">
					<div className="flex items-center space-x-1 rtl:space-x-reverse">
						<svg
							className="w-4 h-4 text-yellow-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
						>
							<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
						</svg>
						{/* Add more stars as needed */}
					</div>
					<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
						5.0
					</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-3xl font-bold text-gray-900 dark:text-white">
						{price ? `$${price}` : "Free"}
					</span>
					<a
						href="#"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Add to cart
					</a>
				</div>
			</div>
		</div>
	);
};

export default CourseCards;
