import React, {useContext, useState} from "react";
import BasicInfoTab from "./basicinfo";
import {TbSortAscending} from "react-icons/tb";
import {DocumentArrowUpIcon} from "@heroicons/react/20/solid";
import VideoContentTab from "./videocontenttab";
import ContentTab from "./contenttab";
import {MdArrowBack} from "react-icons/md";
import {IoMdBusiness} from "react-icons/io";
import {message, TabsProps} from "antd";
import {Course} from "../../../../interface";
import useCourseForm from "../../../../hooks/upload";
import {AuthContext} from "../../../../context";
import {useNavigate} from "react-router-dom";
import {AiFillBackward, AiFillForward} from "react-icons/ai";
import {LoadingOutlined, UploadOutlined} from "@ant-design/icons";

const CourseRegistrationForm = () => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};
	const [currentTabIndex, setcurrentTabIndex] = useState(0);
	const {user} = useContext(AuthContext);
	const {
		handleSubmit,
		isLoading,
	}: {
		handleSubmit: Function;
		isLoading: boolean;
	} = useCourseForm();

	const [formData, setFormData] = useState<Course>({
		_id: "",
		id: "",
		Title: "",
		Description: "",
		price: "",
		category: [{id: "", title: ""}],
		subcategoryId: [{id: "", title: ""}],
		Fullbrief: "",
		isApproved: false,
		Questions: [
			{question: "", answer: ""},
			{question: "", answer: ""},
		],
		Content: [
			{Title: "", Lectures: [""]},
			{Title: "", Lectures: [""]},
		],
		Videos: [],
		students: 0,
		Level: "",
		Language: "",
		Thumbnail: "",
		Tags: [],
		Rating: 0,
		Reviews: [],
		EnrollmentDate: "",
		LastUpdated: "",
		Prerequisites: [],
		Objectives: [],
		Resources: [],
		InstructorBio: user,
		Certificate: {
			awarded: false,
			details: "",
		},
		ReviewsCount: 0,
		LearningPoints: [],
	});

	console.log(formData, "formData");
	console.log(formData, "formData");

	const handleUpdateData = (data: Partial<Course>) => {
		setFormData(prevData => ({...prevData, ...data}));
	};

	const HandleSubmission = (e?: any) => {
		e.preventDefault();
		if (!formData.Title) {
			message.error("Course Title is required");
			return;
		}
		handleSubmit(formData);
	};

	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "Basic Information",
			icon: <DocumentArrowUpIcon />,
			children: (
				<BasicInfoTab onUpdateData={handleUpdateData} formData={formData} />
			),
		},
		{
			key: "2",
			label: "Content Information",
			icon: <TbSortAscending />,
			children: (
				<ContentTab onUpdateData={handleUpdateData} formData={formData} />
			),
		},
		{
			key: "3",
			label: "Video Contents",
			icon: <IoMdBusiness />,
			children: (
				<VideoContentTab onUpdateData={handleUpdateData} formData={formData} />
			),
		},
	];

	const handleNext = () => {
		if (currentTabIndex < items.length - 1) {
			setcurrentTabIndex(currentTabIndex + 1);
		}
	};

	const handlePrev = () => {
		if (currentTabIndex > 0) {
			setcurrentTabIndex(currentTabIndex - 1);
		}
	};

	return (
		<>
			<>
				<div className="flex mt-6">
					<button
						className="flex  items-center text-sm gap-3 font-medium text-gray-700 bg-gray-100 rounded-full py-2 px-4 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
						onClick={handleGoBack}
					>
						<MdArrowBack /> Go Back
					</button>{" "}
				</div>
				<div className="flex flex-col justify-center items-center mb-4">
					<div className="flex">
						<h1 className="mb-4 mx-8 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-4xl">
							New Course Details
						</h1>
					</div>
				</div>

				<div className="flex flex-row">
					<div className="w-[15%] md:w-[20%] transition-all duration-300">
						{" "}
						<div className="flex flex-col space-y-4">
							{items &&
								items.map((tab, index) => (
									<div
										key={tab.key}
										className={`p-3 cursor-pointer rounded-2xl ${
											currentTabIndex === index
												? "bg-gray-200 text-black  dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
												: "text-gray-500 bg-gray-200"
										}`}
										onClick={() => setcurrentTabIndex(index)}
									>
										<div className="flex items-center">
											<div className="flex items-center">
												<span className="mr-2 md:mr-4 ml-4 md:ml-6 text-xs text-gray-300">
													{tab.icon}
												</span>
												<span className="hidden md:inline text-xs font-bold">
													{tab.label}
												</span>
											</div>
										</div>
									</div>
								))}
						</div>
					</div>

					<div className="w-[85%] md:w-[80%] mb-12 bg ml-6 mr-6">
						<div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-lg relative">
							{items[currentTabIndex].children}
							<div className="flex justify-between mt-4 mb-4 px-4">
								{currentTabIndex > 0 && (
									<button
										onClick={handlePrev}
										className="w-[15%] bg-gray-500  hover:text-white hover:bg-slate-600 text-black p-2 rounded flex justify-center items-center"
									>
										<AiFillBackward />{" "}
										<span className="ml-2 text-xs">Prev</span>
									</button>
								)}

								{currentTabIndex < items.length - 1 ? (
									<button
										onClick={handleNext}
										className="w-[15%] bg-gray-500 hover:text-white hover:bg-slate-600 text-black p-2 rounded flex justify-center items-center"
									>
										<span className="mr-2 text-xs">Next</span>
										<AiFillForward />
									</button>
								) : (
									<button
										disabled={isLoading}
										onClick={HandleSubmission}
										className="w-[20%] bg-gray-500 hover:text-white hover:bg-slate-600 text-black p-2 rounded flex justify-center items-center "
									>
										<span className="mr-2 text-xs text-black">
											<span className="ml-3">
												{isLoading && (
													<span>
														<LoadingOutlined
															style={{
																fontSize: 16,
																fontWeight: "500",
																// color: "black",
															}}
															spin
														/>
													</span>
												)}
											</span>
										</span>

										<span className="mr-2 text-xs">Upload Course</span>
										<UploadOutlined />
									</button>
								)}
							</div>{" "}
						</div>
					</div>
				</div>
			</>
		</>
	);
};

export default CourseRegistrationForm;
