import React, {useState} from "react";
import Navbarin from "../../../layout/Instructor/Navbar";
import {useNavigate} from "react-router-dom";
import {MdArrowBack, MdLibraryBooks} from "react-icons/md";
import {PrivatePaths} from "../../../routes/path";
import {useFetchCourses} from "../../../hooks/Querry";
import CourseCards from "../../../components/Cards/CourseCards";
import {Course} from "../../../interface";
// import useFetchCourses from "../../../hooks/courses";

const CoursesList = () => {
	const navigate = useNavigate();
	const {courses, error} = useFetchCourses();
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

	const handleGoBack = () => {
		navigate(-1);
	};

	const HandleCourses = () => {
		navigate(`${PrivatePaths.INSTRUCTOR}courses-new`);
	};

	console.log(courses, "courses");

	return (
		<Navbarin>
			<div className="flex justify-between">
				<button
					className="flex  items-center mb-6 text-sm gap-3 font-medium text-gray-700 bg-gray-100 rounded-full py-2 px-4 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
					onClick={handleGoBack}
				>
					<MdArrowBack /> Go Back
				</button>
				<button
					className="flex  items-center mb-6 text-sm gap-3 font-medium text-gray-700 bg-gray-100 rounded-lg py-2 px-4 dark:bg-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
					onClick={HandleCourses}
				>
					<MdLibraryBooks /> Add New Course
				</button>
			</div>
			<h1>All my Courses</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{courses?.map(course => (
					<CourseCards
						key={course.id}
						course={course}
						onClick={() => setSelectedCourse(course)}
					/>
				))}
			</div>
		</Navbarin>
	);
};

export default CoursesList;
