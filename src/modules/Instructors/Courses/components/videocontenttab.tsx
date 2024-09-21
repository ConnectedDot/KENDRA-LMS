import React, {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../../../Firebase";
import {message, Progress, Modal, Button} from "antd";
import {Link} from "react-router-dom";
import {AiFillForward} from "react-icons/ai";

interface VideoContentTabProps {
	formData: {
		Title: string;
		Content: {Title: string; Lectures: string[]}[];
		Videos: {
			id: number;
			title: string;
			youtubeId: string;
			thumbnailUrl: string;
			playtime: string;
			watched: boolean;
		}[];
	};
	onUpdateData: (data: any) => void;
}

const VideoContentTab: React.FC<VideoContentTabProps> = ({
	formData,
	onUpdateData,
}) => {
	const [localFormData, setLocalFormData] = useState(formData);
	// const [uploadProgress, setUploadProgress] = useState();
	const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>(
		{}
	);
	const [uploadingFiles, setUploadingFiles] = useState();
	const [open, setOpen] = React.useState<boolean>(false);
	const [loading, setLoading] = React.useState<boolean>(true);

	const showLoading = () => {
		setOpen(true);
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	const handleModalClose = () => {
		setOpen(false);
		// setLoading(false);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const {name, value} = e.target;
		setLocalFormData(prevData => ({...prevData, [name]: value}));
		onUpdateData({[name]: value});
	};

	const handleContentChange = (
		index: number,
		field: "Title" | "Lectures",
		value: string
	) => {
		setLocalFormData(prevData => {
			const updatedContent = [...prevData.Content];
			if (field === "Title") {
				updatedContent[index][field] = value;
			} else {
				updatedContent[index].Lectures = value
					.split(",")
					.map(lecture => lecture.trim());
			}
			return {...prevData, Content: updatedContent};
		});
		onUpdateData({Content: localFormData.Content});
	};

	const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOpen(true);
		const files = e.target.files;
		setUploadingFiles(files as any);
		if (!files) return;

		const uploadPromises = Array.from(files).map(async (file, index) => {
			const uploadUrl = await uploadVideo(file);
			const playtime = await getVideoDuration(uploadUrl);
			return {
				id: localFormData.Videos.length + index + 1,
				title: file.name,
				youtubeId: uploadUrl,
				thumbnailUrl: "",
				playtime: playtime,
				watched: false,
			};
		});

		const uploadedVideos = await Promise.all(uploadPromises);
		setLocalFormData(prevData => ({
			...prevData,
			Videos: [...prevData.Videos, ...uploadedVideos],
		}));
		onUpdateData({Videos: [...localFormData.Videos, ...uploadedVideos]});
	};

	const uploadVideo = async (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const storageRef = ref(
				storage,
				`courses/${formData.Title}/videos/${file.name}`
			);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				"state_changed",
				snapshot => {
					const progress = (
						(snapshot.bytesTransferred / snapshot.totalBytes) *
						100
					).toFixed(3);

					setUploadProgress(prevProgress => ({
						...prevProgress,
						[file.name]: parseFloat(progress),
					}));
					console.log(`Upload is ${progress}% done`);
				},
				error => {
					console.error("Error uploading file:", error);
					reject(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
						resolve(downloadURL);
					});
				}
			);
		});
	};

	const getVideoDuration = (url: string): Promise<string> => {
		return new Promise(resolve => {
			const video = document.createElement("video");
			video.preload = "metadata";
			video.src = url;
			video.onloadedmetadata = () => {
				const duration = video.duration;
				const hours = Math.floor(duration / 3600);
				const minutes = Math.floor((duration % 3600) / 60);
				const seconds = Math.floor(duration % 60);
				const formattedDuration = `${hours
					.toString()
					.padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
					.toString()
					.padStart(2, "0")}`;
				resolve(formattedDuration);
			};
		});
	};

	useEffect(() => {
		setLocalFormData(formData);
	}, [formData]);

	return (
		<div className="mb-14 px-4">
			<h2 className="mb-2 mt-0 font-bold text-xl md:text-xl">
				Video Content Section
			</h2>

			{[0, 1].map(index => (
				<div className="flex flex-col md:flex-row gap-6 py-4" key={index}>
					<div className="flex-1">
						<label htmlFor={`sectionTitle${index}`} className="sr-only">
							Section Title {index + 1}
						</label>
						<input
							id={`sectionTitle${index}`}
							name={`sectionTitle${index}`}
							value={localFormData.Content[index].Title}
							onChange={e =>
								handleContentChange(index, "Title", e.target.value)
							}
							className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
							placeholder={`Section Title ${index + 1}`}
						/>
					</div>
					<div className="flex-1">
						<label htmlFor={`lectures${index}`} className="sr-only">
							Lectures {index + 1}
						</label>
						<input
							id={`lectures${index}`}
							name={`lectures${index}`}
							value={localFormData.Content[index].Lectures.join(", ")}
							onChange={e =>
								handleContentChange(index, "Lectures", e.target.value)
							}
							className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
							placeholder={`Lectures (comma separated) ${index + 1}`}
						/>
					</div>
				</div>
			))}

			<div className="flex flex-col gap-4 mt-4 mb-10">
				<label htmlFor="videoUpload" className="sr-only">
					Upload Videos
				</label>
				<input
					id="videoUpload"
					type="file"
					multiple
					onChange={handleVideoUpload}
					className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
				/>
			</div>

			<Button
				type="text"
				className="text-sm mt-4 mb-4 text-white bg-gray-800"
				onClick={() => setOpen(true)}
			>
				Open Upload Modal
			</Button>

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

			<Modal
				open={open}
				title={
					<div>
						<div>Uploading {formData.Title}</div>
						<div className="flex flex-col mt-2 text-sm text-red-500">
							<p>
								Please do not close the modal or click outside until the upload
								is finished.
							</p>
							<p>Uploaded videos might be lost.</p>
						</div>
					</div>
				}
				closable={false}
				onCancel={() => setOpen(false)}
				footer={
					<Button
						size="small"
						className="text-sm mt-4 mb-4 text-white bg-gray-800"
						type="text"
						onClick={handleModalClose}
					>
						Proceed <AiFillForward />
					</Button>
				}
			>
				{uploadProgress && (
					<div className="mt-4">
						{Object.keys(uploadProgress).map(fileName => (
							<div
								key={fileName}
								className="mb-2 py-3 border-b border-gray-300"
							>
								<p className="mr-4 text-sm">{fileName}</p>
								<Progress
									className="w-36"
									size={"small"}
									percent={uploadProgress[fileName]}
								/>
							</div>
						))}
					</div>
				)}
			</Modal>
		</div>
	);
};

export default VideoContentTab;
