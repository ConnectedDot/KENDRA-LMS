import React from "react";
import Navbarin from "../../../layout/Instructor/Navbar";
import {useLocation} from "react-router-dom";
import {Course} from "../../../interface";

interface CoursesViewProps {
	course: Course;
}

const CoursePage = ({}) => {
	const location = useLocation();
	const {course} = location.state as CoursesViewProps;

	return (
		<Navbarin>
			{" "}
			<div className="container mx-auto p-4">
				{/* Top Section */}
				<div className="md:flex md:justify-between">
					{/* Left Section */}
					<div className="md:w-8/12">
						<h1 className="text-2xl font-bold">{course.Title}</h1>
						<p className="text-lg text-gray-600">{course.Description}</p>

						<div className="flex items-center my-4">
							<span className="text-yellow-500 font-bold text-lg">
								{course.Rating}
							</span>
							<span className="ml-2 text-gray-500">
								({course.ReviewsCount} students)
							</span>
						</div>

						<p className="text-gray-600">
							Created by{" "}
							<span className="text-blue-500">{course.instuctor}</span>
						</p>
						<p className="text-gray-500">
							{/* Last updated {lastUpdated} | Language: {language} */}
						</p>
					</div>

					{/* Right Section */}
					<div className="md:w-4/12 bg-gray-100 p-4 rounded-lg mt-4 md:mt-0">
						<video
							className="w-full rounded-lg"
							// src={videoUrl}
							controls
							poster="https://via.placeholder.com/300" // Replace with actual poster image
						/>
						<p className="mt-4 text-2xl font-bold text-gray-900">
							{course.price}
						</p>
						<button className="mt-2 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
							Add to Cart
						</button>
						<button className="mt-2 w-full border border-gray-400 py-2 rounded-lg">
							Try Personal Plan for Free
						</button>
					</div>
				</div>

				{/* What You'll Learn */}
				<div className="mt-8">
					<h2 className="text-xl font-bold">What you'll learn</h2>
					<ul className="list-disc pl-5 mt-4 space-y-2">
						{course.Content.map((feature, index) => (
							<li key={index} className="text-gray-600">
								{/* {feature} */}
							</li>
						))}
					</ul>
				</div>
			</div>
		</Navbarin>
	);
};

export default CoursePage;
