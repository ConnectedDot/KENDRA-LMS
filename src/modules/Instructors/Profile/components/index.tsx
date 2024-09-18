import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../../context";
import {useNavigate} from "react-router-dom";
import {AiFillBackward, AiFillForward} from "react-icons/ai";
import {IoMdBusiness} from "react-icons/io";
import {TbSortAscending} from "react-icons/tb";
import {Flex, message, Progress, TabsProps} from "antd";
import {DocumentArrowUpIcon} from "@heroicons/react/24/outline";
import {LoadingOutlined, UploadOutlined} from "@ant-design/icons";
import {MdArrowBack} from "react-icons/md";
import BasicInfoTab from "./basicinfotab";
import ContactInfoTab from "./contactinfotab";
import ProfessionalInfoTab from "./professionaiInfotab";
// import {useUpdateUser} from "../../../../hooks/auth";
import {useIsMutating} from "react-query";
import {useUpdateUser} from "../../../../hooks/crud-ops";

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

const ProfilePageAll = () => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};

	const [updateLoading, setUpdateLoading] = useState(false);
	const [currentTabIndex, setcurrentTabIndex] = useState(0);
	const {user} = useContext(AuthContext);
	const usersId = user?.uid;

	useEffect(() => {
		if (user) {
			setFormData(user as unknown as Instructor);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	console.log(formData, "sending this");
	const handleUpdateData = (data: Partial<Instructor>) => {
		setFormData(prevData => ({...prevData, ...data}));
	};

	const {updateUser} = useUpdateUser();
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

	const handleUpdate = async (e?: any) => {
		setUpdateLoading(true);
		if (usersId) {
			try {
				await updateUser(usersId, formData);
				// message.success("Update successful");
			} catch (error) {
				message.error("Update failed");
			} finally {
				setUpdateLoading(false);
			}
		} else {
			message.warning("User ID is not available");
			setUpdateLoading(false);
		}
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
			label: "Contact Information",
			icon: <TbSortAscending />,
			children: (
				<ContactInfoTab onUpdateData={handleUpdateData} formData={formData} />
			),
		},
		...(user?.role === "Instructor"
			? [
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
			  ]
			: []),
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
						{user?.role === "Instructor"
							? "Instructor's Profile"
							: user?.role === "Student"
							? "Student's Profile"
							: user?.role === "Admin"
							? "Admin's Profile"
							: "User's Profile"}
					</h1>
				</div>
				{user?.role === "Instructor" && (
					<div className="flex items-center">
						<Flex vertical gap="small" style={{width: 200}}>
							<Progress percent={progress} size="small" />
						</Flex>
						<span className="ml-3 fontmd font-bold"> Completion</span>
					</div>
				)}
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
						<div className="flex justify-between mt-4 mb-4 px-6">
							{currentTabIndex > 0 && (
								<button
									onClick={handlePrev}
									className="w-[15%] bg-gray-500  hover:text-white hover:bg-slate-600 text-black p-2 rounded flex justify-center items-center"
								>
									<AiFillBackward /> <span className="ml-2 text-xs">Prev</span>
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
									disabled={updateLoading}
									onClick={handleUpdate}
									className="w-[20%] bg-gray-500 hover:text-white hover:bg-slate-600 text-black p-2 rounded flex justify-center items-center "
								>
									<span className="mr-2 text-xs">
										<span className="ml-3">
											{updateLoading && (
												<LoadingOutlined
													style={{
														fontSize: 16,
														fontWeight: "500",
														// color: "black",
													}}
													spin
												/>
											)}
										</span>
										<span className="tsxt-sx">Update profile</span>
									</span>

									<UploadOutlined />
								</button>
							)}
						</div>{" "}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePageAll;
