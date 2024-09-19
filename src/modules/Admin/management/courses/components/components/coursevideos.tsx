import React from "react";
import {useNavigate} from "react-router-dom";
import {Course} from "../../../../../../interface";

interface CoursevideoTabsTabsProps {
	coursedata: Course;
}

const CoursevideoTabs: React.FC<CoursevideoTabsTabsProps> = ({coursedata}) => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};
	return (
		<>
			<div>coursevideos</div>
		</>
	);
};

export default CoursevideoTabs;
