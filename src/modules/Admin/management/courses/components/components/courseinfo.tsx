import React, {useEffect, useRef, useState} from "react";
import {Course} from "../../../../../../interface";
import {useNavigate} from "react-router-dom";

interface CourseTabsProps {
	coursedata: Course;
}

const CourseInfomationTabs: React.FC<CourseTabsProps> = ({coursedata}) => {
	const [showFullDescription, setShowFullDescription] = useState(false);
	const [contentHeight, setContentHeight] = useState(0);
	const [isHeightSet, setIsHeightSet] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current && !isHeightSet) {
			setContentHeight(contentRef.current.scrollHeight);
			setIsHeightSet(true);
		}
	}, [coursedata?.Fullbrief, isHeightSet]);

	const handleToggleDescription = () => {
		setShowFullDescription(!showFullDescription);
	};

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
							STATUS{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{/* {coursedata.price ? coursedata.price : "Free"} */}

							{coursedata.isApproved ? (
								<span className="bg-green-500 text-white text-lg font-semibold px-2.5 py-0.5 rounded">
									Approved
								</span>
							) : (
								<span className="bg-red-100 text-red-800 text-lg font-semibold px-2.5 py-0.5 rounded">
									Pending approval
								</span>
							)}
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
						{/* <p className="text-lg font-medium text-accent-500">
							{coursedata?.Fullbrief || ""}
						</p> */}

						<div
							ref={contentRef}
							style={{
								maxHeight: showFullDescription ? `${contentHeight}px` : "200px", // Toggle full or limited height
								overflow: "hidden", // Hide overflow
								transition: "max-height 0.5s ease", // Smooth transition for expanding and collapsing
							}}
							dangerouslySetInnerHTML={{__html: coursedata?.Fullbrief}} // Ensure the HTML is rendering properly
						/>
						<button
							className="text-blue-500 mt-2 border-none outline-none"
							onClick={handleToggleDescription}
						>
							{showFullDescription ? "See Less" : "See More"}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default CourseInfomationTabs;
