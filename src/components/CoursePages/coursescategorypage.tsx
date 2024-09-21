import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {featuredCourses} from "../../Data";
import HomeLayout from "../../layout/Home";
import {MdArrowBack} from "react-icons/md";

const CoursePage = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	const {category, subcategory} = useParams();

	const filteredCourses = featuredCourses.filter(
		course =>
			course.category.title.replace(/\s+/g, "-") === category &&
			course.subcategoryId.title.replace(/\s+/g, "-") === subcategory
	);

	return (
		<HomeLayout title={`${category} / ${subcategory} Courses | Kendra LMS`}>
			<div className="flex-grow mx-auto max-w-7xl md:px-8 px-2 sm:px-6 lg:px-8">
				<section className="flex justify-between mt-2">
					<button
						className="flex items-center mb-1 text-sm gap-3 font-medium text-gray-700 rounded-xl py-2 px-4 dark:bg-white dark:text-gray-600 dark:hover:text-black"
						onClick={handleGoBack}
					>
						<MdArrowBack /> Go Back
					</button>
				</section>

				<div className="container mx-auto p-4">
					<h1 className="text-2xl font-bold mb-4">
						Courses in {category} / {subcategory}
					</h1>
					{filteredCourses.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{filteredCourses.map(course => (
								<div
									key={course.id}
									className="course-card bg-white shadow-md rounded-lg overflow-hidden"
								>
									<img
										src={course.image}
										alt={course.title}
										className="w-full h-48 p-4 object-cover"
									/>
									<div className="p-4">
										<h2 className="text-xl font-semibold mb-2">
											{course.title}
										</h2>
										<p className="text-gray-700 mb-2">
											{course.description.split(" ").slice(0, 6).join(" ")}...
										</p>

										<h4 className="text-gray-900">Rating: {course.rating}</h4>
										<h4 className="text-gray-900 font-bold">
											Price: {course.price}
										</h4>
										<h4 className="text-gray-900">Level: {course.level}</h4>
									</div>
								</div>
							))}
						</div>
					) : (
						<p className="text-gray-700">
							<div className="h-[60vh] flex flex-col justify-center items-center">
								No courses currently in{" "}
								<span className="font-bold">
									{category} / {subcategory} Categories
								</span>
							</div>
						</p>
					)}
				</div>
			</div>
		</HomeLayout>
	);
};

export default CoursePage;
