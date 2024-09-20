import React from "react";
import {useLocation} from "react-router-dom";
import {Course} from "../../interface";

interface CoursesViewProps {
	course: Course;
}

export const CourseDetailsPage: React.FC<CoursesViewProps> = ({course}) => {
	const location = useLocation();
	// const {course} = location.state as CoursesViewProps;

	return (
		<div className="container mx-auto p-4">
			{/* Breadcrumb */}
			<nav className="text-sm text-gray-600 mb-4">
				<span className="mr-2">Development</span> &gt;
				<span className="mx-2">Programming Languages</span> &gt;
				<span className="ml-2 text-gray-800">{course.Title}</span>
			</nav>

			<div className="flex flex-col lg:flex-row lg:space-x-4">
				{/* Course Info Section */}
				<div className="flex-1">
					<h1 className="text-2xl font-semibold mb-2">{course.Title}</h1>
					<p className="text-gray-600 mb-2">{course.Description}</p>
					<div className="flex items-center text-yellow-500 mb-4">
						<span className="text-lg mr-1">
							{/* {course.rating} */}
							rating counts
						</span>
						<span className="text-sm">
							{/* ({`${course.ratingsCount} ratings`}) */}
							rating couunt
						</span>
						<span className="text-sm ml-2">
							{/* {course.studentsCount}  */}
							10 students
						</span>
					</div>
					<p className="text-gray-600 mb-4">
						Created by{" "}
						<span className="font-semibold">
							{/* {course.instructor} */}
							Instructor's name
						</span>
					</p>
					<p className="text-gray-600 mb-4">
						Last updated
						{/* {course.lastUpdated} */}
					</p>
					<p className="text-gray-600 mb-4">
						{/* {course.language || ""} */}
						English language
					</p>

					<div className="mb-4">
						<h2 className="text-lg font-semibold mb-2">What you'll learn</h2>
						<ul className="list-disc list-inside text-gray-600 space-y-2">
							{/* {course.whatYouWillLearn.map((item: any, index: any) => (
								<li key={index}>{item}</li>
							))} */}
							What you'll learn includes:
						</ul>
					</div>

					<div>
						<h2 className="text-lg font-semibold mb-2">Course content</h2>
						<div className="bg-white rounded-lg shadow-md p-4">
							{/* {course.courseContent.map((section: any, index: any) => (
								<div key={index} className="mb-4">
									<h3 className="font-semibold text-gray-800">
										{section.title}
									</h3>
									<p className="text-gray-600">{section.duration}</p>
								</div>
							))} */}
							Course Content goes here:
						</div>
					</div>
				</div>

				{/* Sidebar */}
				<div className="w-full lg:w-1/3 lg:sticky lg:top-0 lg:self-start">
					<div className="border rounded-lg overflow-hidden shadow-lg p-4 bg-white">
						<img
							src="/path/to/image.png"
							alt="Course preview"
							className="w-full h-40 object-cover mb-4"
						/>
						<h2 className="text-3xl font-semibold text-purple-700 mb-4">
							₦{course.price}
						</h2>
						<p className="text-gray-600 mb-4 line-through">₦24,900</p>
						<p className="text-red-500 mb-4">
							{/* {course.discount} */}
							20% off
						</p>
						<p className="text-gray-600 mb-4">
							{/* {course.daysLeft} */}
							days left at this price!
						</p>
						<button className="bg-purple-700 text-white py-2 px-4 rounded-lg w-full mb-4">
							Add to cart
						</button>
						<button className="bg-gray-900 text-white py-2 px-4 rounded-lg w-full mb-4">
							Buy now
						</button>
						<p className="text-gray-600 text-center mb-4">
							30-Day Money-Back Guarantee
						</p>
						<div className="mb-4">
							<h3 className="text-lg font-semibold mb-2">
								This course includes:
							</h3>
							<ul className="list-disc list-inside text-gray-600 space-y-2">
								{/* {course.includes.map((item: any, index: any) => (
									<li key={index}>{item}</li>
								))} */}
								Course Includes:
							</ul>
						</div>
						<button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
							Share
						</button>
						<button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
							Gift this course
						</button>
						<button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
							Apply Coupon
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
