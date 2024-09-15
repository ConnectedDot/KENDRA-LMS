import React, {useState, useEffect, useRef, startTransition} from "react";
import {Card, Checkbox, Col, List, Row, Spin, TabsProps} from "antd";
import {
	LoadingOutlined,
	PlayCircleFilled,
	SearchOutlined,
} from "@ant-design/icons";
import videojs from "video.js";
import CourseOverview from "../../Learners/components/Overview";
import CourseQnA from "../../Learners/components/FAQ";
import DecriptionTab from "../../Learners/components/DecriptionTab";
import {useLocation} from "react-router-dom";
import {Course} from "../../../interface";
import {getStorage, ref, getDownloadURL} from "firebase/storage"; // Import Firebase Storage functions
import "video.js/dist/video-js.css"; // Import video.js CSS
import Navbarin from "../../../layout/Instructor/Navbar";

interface CoursesViewProps {
	course: Course;
}

const CoursesView: React.FC = () => {
	const location = useLocation();
	const {course} = location.state as CoursesViewProps;

	// const videoRef = useRef<HTMLVideoElement | null>(null);
	const storage = getStorage(); // Initialize Firebase Storage

	// const [currentVideo, setCurrentVideo] = useState(
	// 	course?.Videos?.length > 0 ? course?.Videos[0].youtubeId : ""
	// );
	// const [loading, setLoading] = useState(false);
	const [playlists, setPlaylists] = useState(course.Videos);
	const [currentTabIndex, setcurrentTabIndex] = useState(0);
	const [searchVisible, setSearchVisible] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const isGoogleDrive = (url: string) => url.includes("drive.google");
	const getGoogleDriveDirectLink = (url: string) => {
		const fileId = url.split("/d/")[1]?.split("/")[0];
		return `https://drive.google.com/file/d/${fileId}/preview`;
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	// console.log(currentVideo, "currentVideo");

	const getVideoUrl = (url: string) => {
		if (isGoogleDrive(url)) {
			return getGoogleDriveDirectLink(url);
		}
		return url;
	};

	const handleVideoChange = (url: string) => {
		startTransition(() => {
			setLoading(true);
			setCurrentVideo(url);
		});
	};

	// const handleVideoEnd = () => {
	// 	const currentIndex = course.Videos.findIndex(
	// 		(video: {youtubeId: any}) => video.youtubeId === currentVideo
	// 	);
	// 	const updatedPlaylists = playlists.map((video: any, index: any) => {
	// 		if (index === currentIndex) {
	// 			return {...video, watched: true};
	// 		}
	// 		return video;
	// 	});
	// 	setPlaylists(updatedPlaylists);

	// 	if (currentIndex < playlists.length - 1) {
	// 		setCurrentVideo(playlists[currentIndex + 1].youtubeId);
	// 	}
	// };

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [currentVideo, setCurrentVideo] = useState(
		"https://firebasestorage.googleapis.com/v0/b/kendra-lms.appspot.com/o/courses%2Fcourse_1726339084612%2Fvideos%2FNode.js%20Tutorial%20-%202%20-%20ECMAScript.mkv?alt=media&token=c44a5fa1-cc92-418b-89b8-42bd39da0486"
	);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(false);
	}, [currentVideo]);

	useEffect(() => {
		if (videoRef.current) {
			const player = videojs(videoRef.current);

			// Get the download URL for the current video
			const downloadUrl = getDownloadURL(ref(storage, currentVideo));

			// Set the source of the video player
			player.src({type: "video/mp4", src: downloadUrl});

			player.on("ended", handleVideoEnd);

			return () => {
				player.dispose();
			};
		}
	}, [currentVideo, storage]); // Include storage in the dependency array

	// Handle video end (for automatic switching between videos, etc.)
	const handleVideoEnd = () => {
		console.log("Video ended");
		// Logic for next video can be placed here
	};

	useEffect(() => {
		if (videoRef.current) {
			const player = videojs(videoRef.current, {
				controls: true,
				autoplay: false,
				preload: "auto",
				sources: [
					{
						src: currentVideo,
						type: "video/mp4",
					},
				],
			});

			player.on("ended", handleVideoEnd);

			// Once the video is loaded, stop showing the loader
			player.on("loadeddata", () => setLoading(false));

			// Cleanup the player on unmount
			return () => {
				if (player) {
					player.dispose();
				}
			};
		}
	}, [currentVideo]);

	const items: TabsProps["items"] = [
		{
			label: "Overview",
			children: <CourseOverview course={course} />,
			key: "1",
		},
		{
			label: "Q&A",
			children: <CourseQnA course={course} />,
			key: "2",
		},
		{
			label: "Notes",
			children: <DecriptionTab />,
			key: "3",
		},
		{
			label: "Announcements",
			children: <DecriptionTab />,
			key: "4",
		},
		{
			label: "Reviews",
			children: <DecriptionTab />,
			key: "5",
		},
		{
			label: "Learning Tools",
			children: <DecriptionTab />,
			key: "6",
		},
	];

	return (
		<Navbarin>
			<div className="overflow-x-hidden ">
				<Row gutter={[0, 0]} justify="center">
					<Col xs={24} sm={24} md={19} lg={19}>
						{loading ? (
							<>
								<div
									role="status"
									className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
								>
									<div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
										<svg
											className="w-10 h-10 text-gray-200 dark:text-gray-600"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 20 18"
										>
											<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
										</svg>
									</div>
									<div className="w-full">
										<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
										<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
										<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
										<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
										<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
										<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
									</div>
									<span className="sr-only">Loading...</span>
								</div>
							</>
						) : (
							// <Spin
							// 	className="flex justify-center items-center"
							// 	indicator={<LoadingOutlined style={{fontSize: 48}} spin />}
							// />
							<div className="video-container max-w-screen-2xl h-96 bg-black">
								{/* <div
									role="status"
									className="max-w-4xl animate-pulse w-screen h-auto"
								>
									<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
									<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
									<span className="sr-only">Loading...</span>
								</div> */}
								{/* <video
									ref={videoRef}
									className="video-js vjs-default-skin"
									width="100%"
									height="auto"
									controls
								/> */}
								{/* <iframe
									width="100%"
									height="100%"
									src="https://www.youtube.com/embed/3JZ_D3ELwOQ"
									// src={currentVideo}
									title="YouTube video player"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe> */}

								<video className="w-full" autoPlay controls>
									<source
										// src="https://www.youtube.com/embed/3JZ_D3ELwOQ"
										src={currentVideo}
										type="video/mp4"
									/>
									Your browser does not support the video tag.
								</video>
							</div>
						)}
						<div className="flex mt-24 min-h-[50px] !p-0 mb-5 w-full bg-gray-800">
							<div className="flex text-center items-center justify-center ml-10 h-full">
								<SearchOutlined
									onClick={() => setSearchVisible(!searchVisible)}
									style={{
										fontSize: "16px",
										cursor: "pointer",
										marginRight: "40px",
										marginTop: "10px",
										color: searchVisible ? "white" : "gray",
									}}
								/>
								{items.map((tab: any, index: any) => (
									<button
										onClick={() => setcurrentTabIndex(index)}
										className="flex items-center text-sm mt-3 p-2 text-white"
										key={tab.key}
										type="button"
										style={{
											marginRight: index >= items.length - 1 ? "0px" : "40px",
											opacity: index === currentTabIndex ? 1 : 0.5,
											borderBottom:
												index === currentTabIndex ? `2px solid white` : "",
										}}
									>
										{tab.icon}
										{tab.label}
									</button>
								))}
							</div>
						</div>
						<div className="mt-25 mx-20">{items[currentTabIndex].children}</div>
					</Col>
					<Col xs={24} sm={24} md={5} lg={5}>
						<div className="text-white font-bold mb-4 pl-4 bg-gray-700 w-full h-12 flex items-center">
							Course Contents{" "}
						</div>
						<div
							className="playlist-container sm:h-screen"
							style={{height: "", overflowY: "auto"}}
						>
							{course?.Videos.map((playlist: any, index: any) => (
								<div
									key={index}
									onClick={() => handleVideoChange(playlist.youtubeId)}
									style={{
										padding: "4px",
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										backgroundColor:
											currentVideo === playlist.youtubeId
												? "#f0f2f5"
												: "transparent",
										borderLeft:
											currentVideo === playlist.youtubeId
												? "5px solid #374151"
												: "none",
										marginBottom: "5px",
									}}
								>
									<div className="flex mr-2xl">
										{" "}
										<Checkbox
											className="mr-2 mb-5"
											checked={playlist.watched}
											onChange={() => {
												const updatedPlaylists = course?.Videos.map(
													(video: any, idx: any) => {
														if (idx === index) {
															return {...video, watched: !video.watched};
														}
														return video;
													}
												);
												setPlaylists(updatedPlaylists);
											}}
										/>
										<div className="flex flex-col">
											<div className="flex-col">
												<div>
													<h4 className="font-bold text-xs">
														{" "}
														{playlist.title}
													</h4>
												</div>
												<div className="mt-1 text-sm text-gray-500">
													<PlayCircleFilled size={10} className="mr-2" />
													{playlist.playtime}
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</Col>
				</Row>
			</div>
		</Navbarin>
	);
};

export default CoursesView;
