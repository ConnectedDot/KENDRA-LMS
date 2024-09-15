import React, {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../../Firebase";
import {message, Progress} from "antd";

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
		const files = e.target.files;
		if (!files) return;

		const uploadPromises = Array.from(files).map(async (file, index) => {
			const uploadUrl = await uploadVideo(file); // Assume this function uploads the video and returns the URL
			return {
				id: localFormData.Videos.length + index + 1,
				title: file.name,
				youtubeId: uploadUrl,
				thumbnailUrl: "", // You can generate or fetch the thumbnail URL
				playtime: "00:00", // You can calculate or fetch the playtime
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
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setUploadProgress(prevProgress => ({
						...prevProgress,
						[file.name]: progress,
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

	useEffect(() => {
		setLocalFormData(formData);
	}, [formData]);

	return (
		<div className="mb-14 px-4">
			<h2 className="mb-2 mt-0 font-bold text-xl md:text-xl">
				Video Content Section
			</h2>
			{uploadProgress && (
				<div className="mt-4">
					{Object.keys(uploadProgress).map(fileName => (
						<div key={fileName} className="mb-2">
							<p>{fileName}</p>
							<Progress percent={uploadProgress[fileName]} />
						</div>
					))}
				</div>
			)}
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

			<div className="flex flex-col gap-4 mt-4">
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
		</div>
	);
};

export default VideoContentTab;
