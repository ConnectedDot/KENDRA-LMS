import React from "react";
import {useNavigate} from "react-router-dom";
import {Course} from "../../../../../../interface";

interface UpdatecoursetabProps {
	coursedata: Course;
}

const Updatecoursetab: React.FC<UpdatecoursetabProps> = ({coursedata}) => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<>
			<div>updatecoursetab</div>
		</>
	);
};

export default Updatecoursetab;
