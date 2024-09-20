import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {AiFillBackward, AiFillForward} from "react-icons/ai";
import {IoMdBusiness} from "react-icons/io";
import {TbSortAscending} from "react-icons/tb";
import {Flex, message, Progress, TabsProps} from "antd";
import {DocumentArrowUpIcon} from "@heroicons/react/24/outline";
import {LoadingOutlined, UploadOutlined} from "@ant-design/icons";
import {MdArrowBack} from "react-icons/md";
import UserManagementTabs from "./usermanagement";
import CourseManagementTabs from "./coursesmanagement";
import PaymentManagementTabs from "./paymentmanagement";
import {Course} from "../../../../../interface";
import Informationtabs from "./components/informationtabs";
import Courseinfo from "./components/courseinfo";
import CourseInfomationTabs from "./components/courseinfo";
import CoursevideoTabs from "./components/coursevideos";
import Updatecoursetab from "./components/updatecoursetab";

interface CoursesViewProps {
	course: Course;
}

interface SingleCourseViewProps {
	onCourseDetails: (course: Course) => void;
}

const SingleCourseView: React.FC<SingleCourseViewProps> = ({
	onCourseDetails,
}) => {
	const location = useLocation();
	const {course} = location.state as any;
	const courseData = course as any;
	// const [courseData, setCourseData] = React.useState<[]>([]);
	console.log(course, "course");
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};

	// Setting course details back to the parent component
	// useEffect(() => {
	// 	if (course) {
	// 		setCourseData(course as any);
	// 	}
	// }, [course]);

	// Setting course details back to the parent component
	useEffect(() => {
		if (course) {
			onCourseDetails(course);
		}
	}, [course, onCourseDetails]);

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		duration: "",
		price: "",
	});

	// useEffect(() => {
	//     setFormData({
	//         title: course.Title,
	//         description: course.Description,
	//         duration: course.Duration,
	//         price: course.Price,
	//     });
	// }, [course]);

	const [updateLoading, setUpdateLoading] = useState(false);
	const [currentTabIndex, setcurrentTabIndex] = useState(0);

	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "Course's Info",
			icon: <DocumentArrowUpIcon />,
			children: <CourseInfomationTabs coursedata={courseData} />,
		},
		{
			key: "2",
			label: "Instructors's Info",
			icon: <TbSortAscending />,
			children: <Informationtabs coursedata={courseData} />,
		},

		{
			key: "3",
			label: "Course videos",
			icon: <IoMdBusiness />,
			children: <CoursevideoTabs coursedata={courseData} />,
		},
		{
			key: "4",
			label: "Update Course",
			icon: <IoMdBusiness />,
			children: <Updatecoursetab coursedata={courseData} />,
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
		<div className="mt-12">
			<div className="flex flex-col justify-center items-center mb-4">
				<div className="flex">
					<div className="flex">
						{" "}
						<button
							className="flex items-center text-sm gap-3 font-medium text-gray-700 rounded-xl py-2 px-4 dark:bg-white dark:text-gray-600 dark:hover:text-black"
							onClick={handleGoBack}
						>
							<MdArrowBack /> Go Back
						</button>
					</div>

					<div className="flex">
						<h1 className="mb-4 mx-8 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-3xl">
							{course.Title}
						</h1>
					</div>
				</div>
			</div>

			<div className="flex flex-row">
				<div className="mt-6 w-[15%] md:w-[20%] transition-all duration-300">
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
						<div className="flex justify-between mt-4 mb-4 px-6"></div>{" "}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleCourseView;
