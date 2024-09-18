import React from "react";
import {useLocation} from "react-router-dom";
import {Course} from "../../../interface";
import Navbarin from "../../../layout/Instructor/Navbar";
import {CoursePlayer} from "../../../components/CoursePages/courseplayer";

interface CoursesViewProps {
	course: Course;
}

const Coursesview: React.FC = () => {
	const location = useLocation();
	const {course} = location.state as CoursesViewProps;

	return (
		<Navbarin title={course.Title}>
			<CoursePlayer course={course} />
		</Navbarin>
	);
};

export default Coursesview;
