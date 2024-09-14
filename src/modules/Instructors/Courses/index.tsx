import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context";
import {useNavigate} from "react-router-dom";
import Navbarin from "../../../layout/Instructor/Navbar";
// import {Course, CourseProps} from "../../../interface";
import {AiFillBackward, AiFillForward} from "react-icons/ai";
import {IoMdBusiness} from "react-icons/io";
import {GiBriefcase} from "react-icons/gi";
import {TbSortAscending} from "react-icons/tb";
import {Flex, Progress, TabsProps} from "antd";
import BasicInfoTab from "../components/BasicInfo";
import {DocumentArrowUpIcon} from "@heroicons/react/24/outline";
import {UploadOutlined} from "@ant-design/icons";
import {MdArrowBack} from "react-icons/md";
import ContentTab from "../components/ContentTab";
import VideoContentTab from "../components/VideoContentTab";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import {getFirestore, doc, setDoc} from "firebase/firestore";
import videojs from "video.js";
import {toBlob} from "canvas-to-blob";

interface Course {
	Title: string;
	Description: string;
	price: string;
	category: {id: string; title: string}[];
	subcategoryId: {id: string; title: string}[];
	Fullbrief: string;
	Questions: {question: string; answer: string}[];
	Content: {Title: string; Lectures: string[]}[];
	id?: string;
	instructorId?: string;
	Videos: {
		id: number;
		title: string;
		youtubeId: string;
		thumbnailUrl: string;
		playtime: string;
		watched: boolean;
	}[];
}

const CourseRegForm = () => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};
	const [updateLoading, setUpdateLoading] = useState(false);
	const [currentTabIndex, setcurrentTabIndex] = useState(0);
	const {user} = useContext(AuthContext);

	useEffect(() => {
		if (user) {
			setFormData(prevData => ({...prevData, instructorId: user.uid}));
		}
	}, [user]);

	const [formData, setFormData] = useState<Course>({
		Title: "",
		Description: "",
		price: "",
		category: [],
		subcategoryId: [],
		Fullbrief: "",
		Questions: [
			{question: "", answer: ""},
			{question: "", answer: ""},
		],
		Content: [
			{Title: "", Lectures: [""]},
			{Title: "", Lectures: [""]},
		],
		Videos: [],
		instructorId: "", // Set this based on your logic
	});

	const handleUpdateData = (data: Partial<Course>) => {
		setFormData(prevData => ({...prevData, ...data}));
	};

	console.log(formData, "following parent's data");

	const [progress, setProgress] = useState<number>(0);

	// useEffect(() => {
	// 	const calculateProgress = () => {
	// 		const totalFields = 12; // Total number of fields in the formData
	// 		let filledFields = 0;

	// 		if (formData._id) filledFields++;
	// 		if (formData.Title) filledFields++;
	// 		if (formData.Description) filledFields++;
	// 		if (formData.fullbrief) filledFields++;
	// 		if (formData.Rating) filledFields++;
	// 		if (formData.ReviewsCount) filledFields++;
	// 		if (formData.price) filledFields++;
	// 		if (formData.image) filledFields++;
	// 		if (formData.LearningPoints.length > 0) filledFields++;
	// 		if (formData.Content.length > 0) filledFields++;
	// 		if (formData.Questions.length > 0) filledFields++;
	// 		if (formData.Videos.length > 0) filledFields++;
	// 		if (formData.category.length > 0) filledFields++;
	// 		if (formData.subcategoryId.length > 0) filledFields++;

	// 		const progress = (filledFields / totalFields) * 100;
	// 		setProgress(progress);
	// 	};

	// 	calculateProgress();
	// }, [formData]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const {name, value} = e.target;
		setFormData(prevData => ({...prevData, [name]: value}));
	};

	const handleUpdateCourse = (data: any) => {
		setFormData(prevData => ({...prevData, ...data}));
	};

	// const handleUpdate = () => {
	// 	setUpdateLoading(true);
	// 	// const UpdatedData = { data: questionaireData };
	// 	// Update(UpdatedData as any);
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
		// {
		// 	key: "4",
		// 	label: "Questions",
		// 	icon: <GiBriefcase />,
		// 	children: <BasicInfoTab onUpdateData={handleUpdateCourse} />,
		// },
	];

	// Define storageRef before using it
	// const storage = getStorage();
	// const storageRef = ref(storage, 'some-child');

	// Ensure file and metadata are defined
	// const file = new File([""], "filename");
	// const metadata = {
	//   contentType: 'image/jpeg'
	// };

	// const getVideoDuration = (file: File): Promise<string> => {
	//   return new Promise((resolve) => {
	//     const video = document.createElement("video");
	//     video.preload = "metadata";

	//     video.onloadedmetadata = () => {
	//       window.URL.revokeObjectURL(video.src);
	//       const duration = video.duration;
	//       const formattedDuration = new Date(duration * 1000).toISOString().substr(11, 8); // Format HH:mm:ss
	//       resolve(formattedDuration);
	//     };
	//     video.src = URL.createObjectURL(file);
	//   });
	// };

	// const getVideoThumbnail = (file: File): Promise<string> => {
	//   return new Promise((resolve) => {
	//     const video = document.createElement("video");
	//     video.preload = "metadata";

	//     video.onloadeddata = () => {
	//       const canvas = document.createElement("canvas");
	//       canvas.width = video.videoWidth;
	//       canvas.height = video.videoHeight;
	//       const context = canvas.getContext("2d");

	//       if (context) {
	//         context.drawImage(video, 0, 0, canvas.width, canvas.height);
	//         const thumbnailUrl = canvas.toDataURL("image/png");
	//         resolve(thumbnailUrl);
	//       }
	//     };

	//     video.src = URL.createObjectURL(file);
	//   });
	// };

	// const uploadVideoToFirebase = (file: File): Promise<string> => {
	//   const storage = getStorage();
	//   const storageRef = ref(storage, `videos/${file.name}`);
	//   const uploadTask = uploadBytesResumable(storageRef, file);

	//   return new Promise((resolve, reject) => {
	//     uploadTask.on(
	//       "state_changed",
	//       (snapshot) => {
	//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	//         console.log("Upload is " + progress + "% done");
	//       },
	//       (error) => {
	//         reject(error);
	//       },
	//       () => {
	//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
	//           resolve(downloadURL);
	//         });
	//       }
	//     );
	//   });
	// };

	// const saveVideoToFirestore = async (videoData: any) => {
	//   const db = getFirestore();
	//   const videoDocRef = doc(db, "videos", videoData.id);

	//   await setDoc(videoDocRef, videoData);
	//   console.log("Video metadata saved to Firestore");
	// };

	// const progress = uploadBytesResumable(storageRef, file, metadata);

	// const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
	//   const files = e.target.files;
	//   if (!files) return;

	//   const uploadPromises = Array.from(files).map(async (file, index) => {
	//     const uploadUrl = await uploadVideoToFirebase(file);
	//     const playtime = await getVideoDuration(file);
	//     const thumbnailUrl = await getVideoThumbnail(file);

	//     const videoData = {
	//       id: formData.Videos.length + index + 1,
	//       title: file.name,
	//       youtubeId: uploadUrl,
	//       thumbnailUrl,
	//       playtime,
	//       watched: false,
	//     };

	//     await saveVideoToFirestore(videoData); // Save metadata to Firestore
	//     return videoData;
	//   });

	//   const uploadedVideos = await Promise.all(uploadPromises);
	//   setFormData(prevData => ({
	//     ...prevData,
	//     Videos: [...prevData.Videos, ...uploadedVideos],
	//   }));

	//   alert("Videos uploaded successfully!");
	// };

	//////////////
	/////////////
	////////////

	const uploadVideo = async (file: File): Promise<string> => {
		const storage = getStorage();
		const storageRef = ref(storage, `videos/${file.name}`); // Customize the path

		const uploadTask = uploadBytesResumable(storageRef, file);

		return new Promise((resolve, reject) => {
			uploadTask.on(
				"state_changed",
				snapshot => {
					// Optional: Track progress (e.g., update a progress bar)
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
				},
				error => {
					reject(error); // Handle upload errors
				},
				() => {
					// Upload complete
					getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
						resolve(downloadURL);
					});
				}
			);
		});
	};

	// const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
	//     const files = e.target.files;
	//     if (!files) return;

	//     const uploadPromises = Array.from(files).map(async (file, index) => {
	//         const uploadUrl = await uploadVideo(file);
	//         const duration = await extractVideoMetadata(uploadUrl);
	//         const thumbnailUrl = await generateThumbnail(uploadUrl);

	//         return {
	//             id: formData.Videos.length + index + 1,
	//             title: file.name,
	//             youtubeId: uploadUrl,
	//             thumbnailUrl: thumbnailUrl,
	//             playtime: formatTime(duration),
	//             watched: false,
	//         };
	//     });

	// 	const uploadedVideos = await Promise.all(uploadPromises);
	// 	setFormData(prevData => ({
	// 		...prevData,
	// 		Videos: [...prevData.Videos, ...uploadedVideos.map(video => ({ ...video, thumbnailUrl: video.thumbnailUrl || "" }))],
	// 	}));
	// };

	// const handleUpdate = async () => {
	// 	setUpdateLoading(true);

	// 	// Upload videos and update formData
	// 	const uploadedVideos = await Promise.all(
	// 		formData.Videos.map(async (video) => {
	// 			const uploadUrl = await uploadVideo(video.file);
	// 			const duration = await extractVideoMetadata(uploadUrl);
	// 			const thumbnailUrl = await generateThumbnail(uploadUrl);

	// 			return {
	// 				...video,
	// 				youtubeId: uploadUrl,
	// 				thumbnailUrl: thumbnailUrl,
	// 				playtime: formatTime(duration ?? 0),
	// 			};
	// 		})
	// 	);
	// 	// Update formData with uploaded videos
	// 	setFormData((prevData) => ({
	// 		...prevData,
	// 		Videos: uploadedVideos,
	// 	}));

	// 	// Submit formData to backend
	// 	try {
	// 		// Make API call to submit formData
	// 		// Replace `apiEndpoint` with your actual API endpoint
	// 		const response = await fetch(apiEndpoint, {
	// 			method: "POST",
	// 			body: JSON.stringify(formData),
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 		});

	// 		if (response.ok) {
	// 			// Handle successful submission
	// 			console.log("Form data submitted successfully!");
	// 		} else {
	// 			// Handle submission error
	// 			console.error("Failed to submit form data");
	// 		}
	// 	} catch (error) {
	// 		// Handle network error
	// 		console.error("Network error:", error);
	// 	}

	// 	setUpdateLoading(false);
	// };

	//  return new Promise((resolve, reject) => {
	//     uploadTask.on('state_changed',
	//         (snapshot) => {
	//             // Optional: Track progress (e.g., update a progress bar)
	//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	//             console.log('Upload is ' + progress + '% done');
	//         },
	//         (error) => {
	//             reject(error); // Handle upload errors
	//         },
	//         () => {
	//             // Upload complete
	//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
	//                 resolve(downloadURL);
	//             });
	//         }
	//     );
	// });

	// const uploadVideo = async (file: File): Promise<string> => {
	//     // ... (Implementation from previous example)
	// };

	// const extractVideoMetadata = async (videoUrl: string) => {
	//     // ... (Implementation from previous example)
	// };

	// const generateThumbnail = async (videoUrl: string) => {
	//     // ... (Implementation from previous example)
	// };

	// const formatTime = (seconds: number) => {
	//     // ... (Implementation from previous example)
	// };

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
				<div className="flex">
					<Flex vertical gap="small" style={{width: 300}}>
						<Progress percent={progress} size="small" />
					</Flex>
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
									// onClick={handleUpdate}
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
