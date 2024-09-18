import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AiFillBackward, AiFillForward} from "react-icons/ai";
import {IoMdBusiness} from "react-icons/io";
import {TbSortAscending} from "react-icons/tb";
import {Flex, message, Progress, TabsProps} from "antd";
import {DocumentArrowUpIcon} from "@heroicons/react/24/outline";
import {LoadingOutlined, UploadOutlined} from "@ant-design/icons";
import {MdArrowBack} from "react-icons/md";
import UserManagementTabs from "./components/usermanagement";
import CourseManagementTabs from "./components/coursesmanagement";
import PaymentManagementTabs from "./components/paymentmanagement";

const UserManagement = () => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};
	const [updateLoading, setUpdateLoading] = useState(false);
	const [currentTabIndex, setcurrentTabIndex] = useState(0);

	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "Basic Information",
			icon: <DocumentArrowUpIcon />,
			children: <UserManagementTabs />,
		},
		{
			key: "2",
			label: "Contact Information",
			icon: <TbSortAscending />,
			children: <CourseManagementTabs />,
		},

		{
			key: "3",
			label: "Professional Information",
			icon: <IoMdBusiness />,
			children: <PaymentManagementTabs />,
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
			<div className="flex">
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
						User Managemrnt
					</h1>
				</div>
			</div>

			<div className="flex flex-row">
				<div className="w-[60px] md:w-[22%] transition-all duration-300">
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
			</div>
		</div>
	);
};

export default UserManagement;
