import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context";
import {useNavigate} from "react-router-dom";
import Navbarin from "../../../layout/Instructor/Navbar";
import {AiFillBackward, AiFillForward} from "react-icons/ai";
import {IoMdBusiness} from "react-icons/io";
import {GiBriefcase} from "react-icons/gi";
import {TbSortAscending} from "react-icons/tb";
import {Flex, message, Progress, TabsProps} from "antd";
// import BasicInfoTab from "../components/BasicInfoTab";
// import ContactInfoTab from "../components/ContactInfoTab";
// import ProfessionalInfoTab from "../components/ProfessionalInfoTab";
import {DocumentArrowUpIcon} from "@heroicons/react/24/outline";
import {LoadingOutlined, UploadOutlined} from "@ant-design/icons";
import {MdArrowBack} from "react-icons/md";
import useProfileForm from "../../../hooks/upload";
import BasicInfoTab from "./components/BasicInfoTab";
import ContactInfoTab from "./components/ContactInfoTab";
import ProfessionalInfoTab from "./components/ProfessionalInfoTab";
import {useUpdateUser} from "../../../hooks/auth";
import {useIsMutating} from "react-query";

interface Instructor {
	_id: string;
	id: string;
	uid: string | undefined;
	gender: string;
	email: string;
	password: string;
	role?: string;
	token: string;
	photo?: string;
	photoURL?: string;
	emailVerified?: string;
	firstName: string;
	lastName: string;
	bio: string;
	phone_number: string;
	expertise: string;
	courses: string[];
	isVerified: boolean;
	imageUrl: string;
	total_students: number;
	total_courses: any[];
	total_reviews: any[];
	skill_level: any[];
	website: string;
	twitter: string;
	linkedin: string;
	facebook: string;
	instagram: string;
	youtube: string;
	certification: string | null;
	status: "Pending" | "Active" | "Inactive";
}

const ProfilePage = () => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};

	const [updateLoading, setUpdateLoading] = useState(false);
	const [currentTabIndex, setcurrentTabIndex] = useState(0);
	const {user} = useContext(AuthContext);
	const userId = user?.uid;

	useEffect(() => {
		if (user) {
			setFormData(prevData => ({...prevData, uid: user.uid}));
		}
	}, [user]);

	const [formData, setFormData] = useState<Instructor>({
		_id: "",
		id: "",
		uid: undefined,
		gender: "",
		email: "",
		password: "",
		role: "",
		token: "",
		photo: "",
		photoURL: "",
		emailVerified: "",
		firstName: "",
		lastName: "",
		bio: "",
		phone_number: "",
		expertise: "",
		courses: [],
		isVerified: false,
		imageUrl: "",
		total_students: 0,
		total_courses: [],
		total_reviews: [],
		skill_level: [],
		website: "",
		twitter: "",
		linkedin: "",
		facebook: "",
		instagram: "",
		youtube: "",
		certification: null,
		status: "Pending",
	} as Instructor);

	const handleUpdateData = (data: Partial<Instructor>) => {
		setFormData(prevData => ({...prevData, ...data}));
	};

	const {mutate: updateUser} = useUpdateUser();
	const [progress, setProgress] = useState<number>(0);

	useEffect(() => {
		const calculateProgress = () => {
			const totalFields = Object.keys(formData).length;
			const filledFields = Object.values(formData).filter(
				value => value !== "" && value !== null && value !== undefined
			).length;
			return Math.round((filledFields / totalFields) * 100);
		};

		setProgress(calculateProgress());
	}, [formData]);

	useEffect(() => {
		if (user) {
			setFormData(user as unknown as Instructor);
		}
	}, [user]);

	const handleUpdate = (e?: any) => {
		if (userId) {
			updateUser({userId, updatedData: formData});
		} else {
			message.warning("User ID is not available");
		}
	};

	// const handleUpdate = () => {
	// 	if (userId) {
	// 		updateUser({userId, updatedData: formData});
	// 		message.info("button clicked");
	// 	} else {
	// 		message.warning("User ID is not available");
	// 	}
	// };

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
			label: "Contact Information",
			icon: <TbSortAscending />,
			children: (
				<ContactInfoTab onUpdateData={handleUpdateData} formData={formData} />
			),
		},
		{
			key: "3",
			label: "Professional Information",
			icon: <IoMdBusiness />,
			children: (
				<ProfessionalInfoTab
					onUpdateData={handleUpdateData}
					formData={formData}
				/>
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
		<Navbarin>
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
						Instructor Profile
					</h1>
				</div>
				<div className="flex">
					<Flex vertical gap="small" style={{width: 300}}>
						<Progress percent={progress} size="small" />
					</Flex>
				</div>
				{/* <div className="flex">
					{Object.keys(uploadProgress).map(videoTitle => (
						<div key={videoTitle}>
							<p>
								{videoTitle}: {uploadProgress[videoTitle]}%
							</p>
							<p>{uploadPercentage}</p>
						</div>
					))}
				</div> */}
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
									// disabled={isLoading}
									onClick={handleUpdate}
									className="w-[10%] rounded-md bg-black text-white hover:text-black hover:bg-slate-300 px-3.5 py-2.5 text-sm font-semibold text-primary-100 shadow-sm hover:bg-primary-100 "
								>
									<span className="mr-2 text-xs">
										<span className="ml-3">
											{/* {isLoading && (
												<LoadingOutlined
													style={{
														fontSize: 16,
														fontWeight: "500",
														color: "black",
													}}
													spin
												/>
											)} */}
										</span>
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

export default ProfilePage;
