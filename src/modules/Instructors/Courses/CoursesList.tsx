import React from "react";
import Navbarin from "../../../layout/Instructor/Navbar";
import {useNavigate} from "react-router-dom";
import {MdArrowBack, MdLibraryBooks} from "react-icons/md";
import {PrivatePaths} from "../../../routes/path";

const CoursesList = () => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};

	const HandleCourses = () => {
		navigate(`${PrivatePaths.INSTRUCTOR}courses-new`);
	};

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
		</Navbarin>
	);
};

export default CoursesList;
