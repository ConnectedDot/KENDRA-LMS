import React, {useState} from "react";
import Navbarin from "../../../layout/Instructor/Navbar";
import {useNavigate} from "react-router-dom";
import {MdArrowBack, MdLibraryBooks} from "react-icons/md";
import {PrivatePaths} from "../../../routes/path";
import {useFetchCourses} from "../../../hooks/Querry";
import CourseCards from "../../../components/Cards/coursecards";
import {Course} from "../../../interface";

const CoursesList = () => {
	const navigate = useNavigate();
	const {courses, error} = useFetchCourses();

	const handleGoBack = () => {
		navigate(-1);
	};

	const HandleCourses = () => {
		navigate(`${PrivatePaths.INSTRUCTOR}courses-new`);
	};

	const HandleViewCourses = (course: Course) => {
		navigate(`${PrivatePaths.INSTRUCTOR}courses-view/${course.id}`, {
			state: {course},
		});
	};

	console.log(courses, "courses");

	return (
		<Navbarin title={"Add a New Course | Kendra LMS"}>
			<section className="flex justify-between mt-2 px-0 md:mx-0 ">
				<button
					className="flex items-center mb-1 text-sm gap-3 font-medium text-gray-700 rounded-xl py-2 px-4 dark:bg-white dark:text-gray-600 dark:hover:text-black"
					onClick={handleGoBack}
				>
					<MdArrowBack /> Go Back
				</button>

				<button
					className="flex  items-center text-sm gap-3 font-medium text-gray-700 bg-gray-100 rounded-lg py-2 px-4 dark:bg-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
					onClick={HandleCourses}
				>
					<MdLibraryBooks /> Add New Course
				</button>
			</section>

			<h1 className="px-4 text-lg font-bold mb-6">My Courses</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{courses?.length ? (
					courses.map(course => (
						<CourseCards
							key={course.id}
							course={course}
							onClick={() => HandleViewCourses(course)}
						/>
					))
				) : (
					<h1 className="mb-4 mx-8 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
						No courses uploaded by you
					</h1>
				)}
			</div>
		</Navbarin>
	);
};

export default CoursesList;
