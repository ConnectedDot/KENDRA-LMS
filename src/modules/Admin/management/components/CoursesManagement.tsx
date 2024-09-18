import React, {useEffect, useState} from "react";
import Navbarin from "../../../../layout/Instructor/Navbar";
import {MdArrowBack} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import TableComponent from "./tablecomponent";

const CourseManagementTabs = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<Navbarin title={"Admin's Dashboard | Kendra LMS"}>
			<section className="flex justify-between mt-6">
				<button
					className="flex items-center mb-6 text-sm gap-3 font-medium text-gray-700 bg-gray-100 rounded-xl py-2 px-4 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
					onClick={handleGoBack}
				>
					<MdArrowBack /> Go Back
				</button>
			</section>

			<section className="mt-10">{/* <TableComponent /> */}</section>
		</Navbarin>
	);
};

export default CourseManagementTabs;
