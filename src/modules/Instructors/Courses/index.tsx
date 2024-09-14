import React, {useContext, useState} from "react";
import {AuthContext} from "../../../context";
import {useNavigate} from "react-router-dom";
import Navbarin from "../../../layout/Instructor/Navbar";
import {Course, CourseProps} from "../../../interface";
import {AiFillBackward, AiFillForward} from "react-icons/ai";
import {IoMdBusiness} from "react-icons/io";
import {GiBriefcase} from "react-icons/gi";
import {TbSortAscending} from "react-icons/tb";
import {TabsProps} from "antd";
import BasicInfoTab from "../components/BasicInfo";
import {DocumentArrowUpIcon} from "@heroicons/react/24/outline";
import {UploadOutlined} from "@ant-design/icons";
import {MdArrowBack} from "react-icons/md";

const CourseRegForm = () => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};
	const [questionaireResponse, setQuestionaireResponse] = useState([]);
	const [formID, setFormID] = useState<string>("");
	const [category, setCategory] = useState([]);
	const [updateLoading, setUpdateLoading] = useState(false);
	const [currentTabIndex, setcurrentTabIndex] = useState(0);

	const [formData, setFormData] = useState<Course | (() => Course)>({
		_id: "",
		Title: "",
		Description: "",
		Rating: 0,
		ReviewsCount: 0,
		price: "",
		image: null,
		LearningPoints: [],
		Content: [],
		Questions: [],
		Videos: [],
		category: [],
		subcategoryId: [],
		// Add the remaining properties here
	});

	const handleUpdateCourse = (data: any) => {
		setFormData(prevData => ({...prevData, ...data}));
	};

	const {user} = useContext(AuthContext);

	const handleUpdate = () => {
		setUpdateLoading(true);
		// const UpdatedData = { data: questionaireData };
		// Update(UpdatedData as any);
	};

	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "Basic Information",
			icon: <DocumentArrowUpIcon />,
			children: <BasicInfoTab onUpdateData={handleUpdateCourse} />,
		},
	];

	const handleNext = () => {
		if (currentTabIndex < items.length - 1) {
			setcurrentTabIndex(currentTabIndex + 1);
		}

		// if (currentTabIndex >= 1) {
		//   const formChanged = hasFormChanged(initialData, questionaireData);

		//   if (formChanged) {
		//     if (!formID) {
		//       handleCreate();
		//     } else {
		//       handleUpdate();
		//     }
		//   } else {
		//   }
		// }
	};

	const handlePrev = () => {
		if (currentTabIndex > 0) {
			setcurrentTabIndex(currentTabIndex - 1);
		}
	};

	return (
		<Navbarin>
			<div className="flex">
				<button
					className="flex  items-center mb-6 text-sm gap-3 font-medium text-gray-700 bg-gray-100 rounded-full py-2 px-4 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
					onClick={handleGoBack}
				>
					<MdArrowBack /> Go Back
				</button>
			</div>
			<div className="flex justify-center items-center">
				<h1 className="mb-12 mx-8 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-4xl">
					New Course Details
				</h1>
			</div>

			<div className="flex flex-row">
				<div className="w-[60px] md:w-[22%] transition-all duration-300">
					{" "}
					<div className="flex flex-col">
						{items &&
							items.map((tab, index) => (
								<div
									key={tab.key}
									className={`p-3 cursor-pointer rounded-2xl ${
										currentTabIndex === index
											? "bg-gray-200 text-black  dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
											: "text-gray-400"
									}`}
									onClick={() => setcurrentTabIndex(index)}
								>
									<div className="flex items-center">
										<div className="flex items-center">
											<span className="mr-2 md:mr-4 ml-4 md:ml-6 text-xs">
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

				<div className="md:w-[75%] mb-12 bg ml-6 mr-6">
					<div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-lg relative">
						{items[currentTabIndex].children}
						<div className="flex justify-between mt-4 mb-4">
							{currentTabIndex > 0 && (
								<button
									onClick={handlePrev}
									className="w-[10%] bg-gray-500 hover:bg-blue-500 text-white p-2 rounded flex justify-center items-center"
								>
									<AiFillBackward /> <span className="ml-2 text-xs">Prev</span>
								</button>
							)}

							{currentTabIndex < items.length - 1 ? (
								<button
									onClick={handleNext}
									className="w-[10%] bg-gray-500 hover:bg-blue-500 text-white p-2 rounded flex justify-center items-center"
								>
									<span className="mr-2 text-xs">Next</span>
									<AiFillForward />
								</button>
							) : (
								<button
									onClick={handleUpdate}
									className="w-[14%] bg-gray-500 hover:bg-blue-500 text-white p-2 rounded flex justify-center items-center"
								>
									<span className="mr-2 text-xs">
										{updateLoading ? "Submitting..." : "Update"}
									</span>
									<UploadOutlined />
								</button>
							)}
						</div>{" "}
					</div>
				</div>
			</div>
		</Navbarin>
	);
};

export default CourseRegForm;
