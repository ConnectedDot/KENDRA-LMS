import React, {useState} from "react";
import Navbarin from "../../../../../layout/Instructor/Navbar";
import SingleCourseView from ".";
import {Course} from "../../../../../interface";

const SingleCourseViewComponent = () => {
	const [courseDetails, setCourseDetails] = useState<Course | null>(null);

	const handleCourseDetails = (course: Course) => {
		setCourseDetails(course);
	};

	const title = courseDetails
		? `${courseDetails.Title} | Kendra LMS`
		: "Kendra LMS";
	return (
		<Navbarin title={title} showFooter={false}>
			<SingleCourseView onCourseDetails={handleCourseDetails} />
		</Navbarin>
	);
};

export default SingleCourseViewComponent;
