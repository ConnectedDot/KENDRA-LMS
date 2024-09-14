import React, {useContext, useState} from "react";
import type {GetProp, UploadProps} from "antd";
import {message, Upload} from "antd";
import {TiCameraOutline} from "react-icons/ti";
import imageUrl from "../../../assets/background/overlay_2.jpg";
import {ConfigProvider, Popover} from "antd";
import {AuthContext} from "../../../context";
import TextArea from "antd/es/input/TextArea";
import {category} from "../../../Data";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
interface BasicInfoTabProps {
	onUpdateData: (data: any) => void;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({onUpdateData}) => {
	const {user} = useContext(AuthContext);
	const [uploadError, setUploadError] = useState<any>({});
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedSubcategory, setSelectedSubcategory] = useState("");
	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(e.target.value);
		setSelectedSubcategory("");
		setFormData(prevData => ({
			...prevData,
			category: e.target.value,
			subcategoryId: "",
		}));
	};

	const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedSubcategory(e.target.value);
		setFormData(prevData => ({
			...prevData,
			subcategoryId: e.target.value,
		}));
	};

	const [formData, setFormData] = useState<{
		Title?: string;
		Description?: any;
		price?: string;
		image?: FileType | undefined;
		category?: string;
		subcategoryId?: string;
		id?: string;
		instructorId?: string;
	}>({
		Title: "",
		Description: "",
		price: "",
		image: undefined,
		category: "",
		subcategoryId: "",
		instructorId: user?.id || "",
	});
	console.log(formData);

	const [previewImage, setPreviewImage] = useState<string | null>(imageUrl);

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
				onUpdateData({image: file});
			} else {
				setPreviewImage(null);
			}
		}

		const formData = new FormData();
		formData.append("image", file);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}));
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
			<div className="flex justify-between items-center mb-0 min-h-[150px]">
				{" "}
				<div className="flex">
					<>
						{" "}
						<ConfigProvider button={{style: {width: 20, margin: 4}}}>
							<Popover
								placement="top"
								title=""
								content={
									<div>
										<p>Upload a cover picture</p>
									</div>
								}
							>
								<Upload
									{...props}
									name="image"
									// listType="picture-circle"
									className="avatar-uploader"
									showUploadList={false}
									beforeUpload={beforeUpload}
								>
									<div className="relative w-60 h-32">
										{previewImage ? (
											<img
												src={previewImage}
												alt="images"
												className="w-full h-full rounded-lg object-cover"
											/>
										) : (
											<TiCameraOutline className="bg-gray-500 text-white text-xl" />
										)}
										<div className="absolute inset-0 bg-gray-500 bg-opacity-70 rounded-lg flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
											<TiCameraOutline className="text-white text-xl" />
										</div>{" "}
									</div>
								</Upload>{" "}
							</Popover>
						</ConfigProvider>
					</>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-6 py-4">
				<div className="flex-1">
					<label htmlFor="Title" className="sr-only">
						Title
					</label>
					<input
						id="Title"
						name="Title"
						value={formData.Title}
						onChange={handleInputChange}
						className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
						placeholder="Title"
					/>
				</div>
				<div className="flex-1">
					<label htmlFor="Description" className="sr-only">
						Description
					</label>
					<input
						id="Description"
						name="Description"
						// value={formData.Description}
						onChange={handleInputChange}
						className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
						placeholder="Description"
					/>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-6 py-4">
				<div className="flex-1">
					<label htmlFor="price" className="sr-only">
						Instructor
					</label>
					<input
						id="instid"
						name="instid"
						readOnly
						value={`${user?.firstName} ${user?.lastName}`}
						className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
						placeholder="Price"
					/>
					<input type="hidden" name="instructorId" value={user?.id} />
				</div>
				<div className="flex-1">
					<label htmlFor="image" className="sr-only">
						Image
					</label>
					<input
						id="image"
						name="image"
						type="file"
						onChange={handleFileChange}
						className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
						placeholder="Image"
					/>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-6 py-4">
				<div className="flex-1">
					<label htmlFor="category" className="sr-only">
						Category
					</label>
					<select
						id="category"
						name="category"
						value={selectedCategory}
						onChange={handleCategoryChange}
						className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					>
						<option value="">Select Category</option>
						{category.map(cat => (
							<option key={cat.id} value={cat.id}>
								{cat.title}
							</option>
						))}
					</select>
				</div>
				<div className="flex-1">
					<label htmlFor="subcategory" className="sr-only">
						Subcategory
					</label>
					<select
						id="subcategory"
						name="subcategory"
						value={selectedSubcategory}
						onChange={handleSubcategoryChange}
						className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
						disabled={!selectedCategory}
					>
						<option value="">Select Subcategory</option>
						{category
							.find(cat => cat.id === selectedCategory)
							?.subcategory.map(subcat => (
								<option key={subcat.id} value={subcat.id}>
									{subcat.title}
								</option>
							))}
					</select>
				</div>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="image" className="sr-only">
					Image
				</label>
				<TextArea
					id="description"
					name="description"
					rows={4}
					onChange={handleFileChange}
					className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					placeholder="Image"
				/>
			</div>

			<div className="p-6 bg-gray-200 rounded-3xl">
				<h2 className="text-sm font-semibold mb-4">Disclaimer</h2>
				<div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-[18px]">
					<p className="text-gray-600 flex-1 mb-4 md:mb-0 text-xs">
						Please note that all courses must undergo a verification process
						before they can be approved. Once you have completed the
						verification, your courses will also need to be approved by an admin
						before being published. This process is designed to ensure the
						highest quality of content for our learners. Rest assured, we strive
						to make this process as quick and efficient as possible to better
						serve you.
					</p>
				</div>
			</div>

			<></>
		</div>
	);
};

export default BasicInfoTab;
