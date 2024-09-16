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
		navigate(`${PrivatePaths.USER}courses-new`);
	};

	const HandleViewCourses = (course: Course) => {
		navigate(`${PrivatePaths.USER}courses-enrolled/${course.id}`, {
			state: {course},
		});
	};

	console.log(courses, "courses");

	return (
		<Navbarin title={"Student's Learning Path | Kendra LMS"}>
			<section className="flex justify-between mt-6">
				<button
					className="flex items-center mb-6 text-sm gap-3 font-medium text-gray-700 bg-gray-100 rounded-xl py-2 px-4 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
					onClick={handleGoBack}
				>
					<MdArrowBack /> Go Back
				</button>
				{/* <button
					className="flex  items-center mb-6 text-sm gap-3 font-medium text-gray-700 bg-gray-100 rounded-lg py-2 px-4 dark:bg-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
					onClick={HandleCourses}
				>
					<MdLibraryBooks /> Add New Course
				</button> */}
			</section>
			<h1>Enrolled Courses</h1>

			<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{courses?.map(course => (
					<CourseCards
						key={course.id}
						course={course}
						onClick={() => HandleViewCourses(course)}
					/>
				))}
			</section>
		</Navbarin>
	);
};

export default CoursesList;
