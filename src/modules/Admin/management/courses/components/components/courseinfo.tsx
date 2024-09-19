import React, {useState} from "react";
import {Course} from "../../../../../../interface";
import {useNavigate} from "react-router-dom";

interface CourseTabsProps {
	coursedata: Course;
}

const CourseInfomationTabs: React.FC<CourseTabsProps> = ({coursedata}) => {
	const navigate = useNavigate();
	console.log(coursedata, "coursedata");
	const handleGoBack = () => {
		navigate(-1);
	};

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		duration: "",
		price: "",
	});

	return (
		<>
			<div className="mb-14 px-4">
				<h2 className=" mb-2 mt-0 font-bold text-xl md:text-xl">
					Course Information
				</h2>
				<div className="flex flex-col md:flex-row gap-6 py-4">
					<div className="flex-1">
						<label htmlFor="lastName" className="text-xs font-bold mb-2">
							COURSE TITLE{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.Title || ""}
						</h5>
					</div>
					<div className="flex-1">
						<label htmlFor="lastName" className="text-xs font-bold mb-2">
							CATEGORY{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.Description || ""}
						</h5>
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-6 py-4">
					<div className="flex-1">
						<label htmlFor="lastName" className="text-xs font-bold mb-2">
							CATEGORY{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.category[0]?.title || ""}
						</h5>
					</div>
					<div className="flex-1">
						<label htmlFor="lastName" className="text-xs font-bold mb-2">
							SUB-CATEGORY{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.subcategoryId[0]?.title || ""}
						</h5>
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-6 py-4">
					<div className="flex-1">
						<label htmlFor="lastName" className="text-xs font-bold mb-2">
							CATEGORY{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.price ? coursedata.price : "Free"}
						</h5>
					</div>
					<div className="flex-1">
						<label htmlFor="lastName" className="text-xs font-bold mb-2">
							ENROLLED{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.students ? coursedata.students : "None"}
						</h5>
					</div>
				</div>{" "}
				<div className="flex flex-col gap-6 py-4">
					<div className="flex-1">
						<label htmlFor="lastName" className="text-xs font-bold mb-2">
							BRIEF DESCRIPTION{" "}
						</label>
						<p className="text-lg font-medium text-accent-500">
							{coursedata?.Fullbrief || ""}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default CourseInfomationTabs;
