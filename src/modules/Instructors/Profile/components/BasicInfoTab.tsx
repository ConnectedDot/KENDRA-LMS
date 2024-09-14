import React, {useContext, useEffect, useState} from "react";
import type {GetProp, UploadProps} from "antd";
import {message, Upload} from "antd";
import {TiCameraOutline} from "react-icons/ti";
import imageUrl from "../../../../assets/background/overlay_2.jpg";
import {ConfigProvider, Popover} from "antd";
import TextArea from "antd/es/input/TextArea";
import {AuthContext} from "../../../../context";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface BasicInfoTabProps {
	formData: {
		firstName: string;
		lastName: string;
		gender: string;
		email: string;
		bio: string;
		photo?: string;
	};
	onUpdateData: (data: any) => void;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
	formData,
	onUpdateData,
}) => {
	const [uploadError, setUploadError] = useState<any>({});
	const [previewImage, setPreviewImage] = useState<string | null>(
		formData.photo || imageUrl
	);
	const [files, setFiles] = useState<string | null>(null);

	const beforeUpload = (file: FileType) => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
			message.error("You can only upload JPG/PNG file!");
			setUploadError({
				type: "format",
				message: "You can only upload JPG/PNG file!",
			});
			return false;
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error("Image must be smaller than 2MB!");
			setUploadError({
				type: "size",
				message: "Image must be smaller than 2MB!",
			});
			return false;
		}
		setUploadError(null);
		return true;
	};

	// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	//     const files = e.target.files;
	//     if (files && files.length > 0) {
	//       setFormData((prevData) => ({ ...prevData, imageUrl: files[0] }));
	//     }
	//   };

	const handleFileChange = async (info: any) => {
		if (uploadError) {
			return;
		}

		const file = info.file;
		setFiles(file);

		if (info.fileList.length > 0) {
			const file = info.fileList[0].originFileObj;
			if (file) {
				const reader = new FileReader();
				reader.onload = e => {
					setPreviewImage(e.target?.result as string);
				};
				reader.readAsDataURL(file);
				onUpdateData({photo: file});
			} else {
				setPreviewImage(null);
			}
		}

		const formData = new FormData();
		onUpdateData({photo: file});
		if (files) {
			formData.append("photo", files);
		}
	};

	const handleInputChange = (e?: any) => {
		const {name, value} = e.target;
		onUpdateData({[name]: value});
	};

	const props = {
		name: "file",
		multiple: false,
		beforeUpload: {beforeUpload},
		fileList: [],
		onChange: handleFileChange,
	};

	return (
		<div className="mb-14 px-4">
			<h2 className=" mb-2 mt-0 font-bold text-xl md:text-xl">
				Basic Information
			</h2>

			<div className="flex flex-col md:flex-row gap-6 py-4">
				<div className="flex-1">
					<label htmlFor="firstName" className="sr-only">
						First Name
					</label>
					<input
						id="firstName"
						name="firstName"
						value={formData.firstName}
						readOnly
						className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
						placeholder="First Name"
					/>
				</div>
				<div className="flex-1">
					<label htmlFor="lastName" className="sr-only">
						Last Name
					</label>
					<input
						id="lastName"
						name="lastName"
						value={formData.lastName}
						readOnly
						className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
						placeholder="Last Name"
					/>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-6 py-4">
				<div className="flex-1">
					<label htmlFor="gender" className="sr-only">
						Gender
					</label>
					<select
						id="gender"
						name="gender"
						value={formData.gender}
						onChange={handleInputChange}
						className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					>
						<option value="">Select Gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
					</select>
				</div>
				<div className="flex-1">
					<label htmlFor="email" className="sr-only">
						Email
					</label>
					<input
						id="email"
						name="email"
						value={formData.email}
						readOnly
						className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
						placeholder="Email"
					/>
				</div>
			</div>

			<div className="flex flex-col gap-6 py-4">
				<div className="flex-1">
					<label htmlFor="bio" className="sr-only">
						Bio
					</label>
					<TextArea
						id="bio"
						name="bio"
						value={formData.bio}
						onChange={handleInputChange}
						className="w-full focus:outline-none border py-1 appearance-none bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
						placeholder="Bio"
						rows={4}
					/>
				</div>
			</div>

			<div className="flex justify-between items-center min-h-[150px] mb-4 mt-4">
				<div className="flex">
					<Upload
						{...props}
						name="photo"
						className="avatar-uploader"
						showUploadList={false}
						beforeUpload={beforeUpload}
					>
						<div className="relative w-100 h-60">
							{previewImage ? (
								<img
									src={previewImage}
									alt="profile"
									className="w-full h-full rounded-lg object-cover"
								/>
							) : (
								<TiCameraOutline className="bg-gray-500 text-white text-xl" />
							)}
							<div className="absolute inset-0 bg-gray-500 bg-opacity-70 rounded-lg flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
								<TiCameraOutline className="text-white text-xl" />
							</div>
						</div>
					</Upload>
				</div>
			</div>
		</div>
	);
};

export default BasicInfoTab;
