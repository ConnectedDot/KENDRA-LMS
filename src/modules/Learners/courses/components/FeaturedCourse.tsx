import React from "react";
import {Link} from "react-router-dom";

interface FeaturedCourseProps {
	title: string;
	category: string;
	description: string;
	imageUrl: string;
	link: string;
}

const FeaturedCourse: React.FC<FeaturedCourseProps> = ({
	title,
	category,
	description,
	imageUrl,
	link,
}) => {
	return (
		<Link to={link}>
			<div className="max-w-sm h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
				<a href={link}>
					<img
						className="rounded-t-lg max-h-48 bg-contain bg-center w-full"
						src={imageUrl}
						alt={title}
					/>
				</a>
				<div className="p-5 flex flex-col flex-grow">
					<a href={link}>
						<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
							{title}
						</h5>
					</a>
					<p className="mb-3 font-normal text-yellow-700 dark:text-yellow-500">
						{category}
					</p>
					<p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 flex-grow">
						{description}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default FeaturedCourse;
