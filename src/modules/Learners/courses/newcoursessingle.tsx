import React from "react";
import {useLocation} from "react-router-dom";
import {Course} from "../../../interface";
import Navbarin from "../../../layout/Instructor/Navbar";
import {CoursePlayer} from "../../../components/CoursePages/courseplayer";
import CourseDetailsPage from "../../../components/CoursePages/coursepagedetails";

interface CoursesViewProps {
	course: Course;
}

const SingleNEwCourseView: React.FC = () => {
	const location = useLocation();
	const {course} = location.state as CoursesViewProps;

	return (
		<Navbarin title={course.Title}>
			<CourseDetailsPage />
			{/* <CoursePlayer course={course} /> */}
		</Navbarin>
	);
};

export default SingleNEwCourseView;
