import React, {useState, useEffect, useRef, startTransition} from "react";
import {Checkbox, Col, Row, TabsProps} from "antd";
import {
	DashboardFilled,
	PlayCircleFilled,
	QuestionCircleOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import videojs from "video.js";
import {MdFeedback} from "react-icons/md";
import {GiNotebook, GiSpanner} from "react-icons/gi";
import {IoMdMicrophone} from "react-icons/io";
import {Course} from "../../interface";
import CourseQnA from "./components/FAQ";
import CourseOverview from "./components/Overview";
import DecriptionTab from "./components/DecriptionTab";
import CourseNotes from "./components/Notes";
import AnnouncementTabs from "./components/Announcement";
import LearningTabs from "./components/LearniingTools";
import ReviewTabs from "./components/Reviews";

interface CoursePlayerProps {
	course: Course;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({course}) => {
	const [playlists, setPlaylists] = useState(course.Videos);
	const [currentTabIndex, setcurrentTabIndex] = useState(0);
	const [searchVisible, setSearchVisible] = useState(false);
	const indexVideo = course.Videos.findIndex(
		(video: {youtubeId: any}) => video.youtubeId === course.Videos[0].youtubeId
	);

	const handleVideoChange = (url: string) => {
		startTransition(() => {
			setLoading(true);
			setCurrentVideo(url);
		});
	};

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [currentVideo, setCurrentVideo] = useState(
		course.Videos[indexVideo].youtubeId
	);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(false);
	}, [currentVideo]);

	const handleVideoEnd = () => {
		console.log("Video ended");
	};
	console.log(course);

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
			player.on("loadeddata", () => setLoading(false));

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
			icon: <DashboardFilled />,
			key: "1",
		},
		{
			label: "Q&A",
			children: <CourseQnA course={course} />,
			icon: <QuestionCircleOutlined />,
			key: "2",
		},
		{
			label: "Notes",
			children: <CourseNotes course={course} />,
			icon: <GiNotebook />,
			key: "3",
		},
		{
			label: "Announcements",
			children: <AnnouncementTabs course={course} />,
			icon: <IoMdMicrophone />,
			key: "4",
		},
		{
			label: "Reviews",
			children: <ReviewTabs course={course} />,
			icon: <MdFeedback />,
			key: "5",
		},
		{
			label: "Learning Tools",
			children: <LearningTabs course={course} />,
			icon: <GiSpanner />,
			key: "6",
		},
	];

	return (
		<>
			<div className="overflow-x-hidden ">
				<Row gutter={[0, 0]} justify="center">
					<Col xs={24} sm={24} md={19} lg={19}>
						{loading ? (
							<>
								<div
									role="status"
									className="w-full max-h-svh space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
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
							<div className="video-container bg-black">
								<video className="w-full max-h-svh" autoPlay controls>
									<source src={currentVideo} type="video/mp4" />
								</video>
							</div>
						)}
						<div className="flex mt-0 min-h-[38px] p-0 mb-5 w-full md:w-full bg-gray-800">
							<div className="flex text-center items-center justify-center ml-10 h-full">
								<SearchOutlined
									className="hidden md:block"
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
										className="flex justify-center items-center text-sm mt-1 p-2 text-white"
										key={tab.key}
										type="button"
										style={{
											marginRight: index >= items.length - 1 ? "0px" : "10px",
											opacity: index === currentTabIndex ? 1 : 0.5,
											borderBottom:
												index === currentTabIndex ? `2px solid white` : "",
										}}
									>
										{tab.icon}
										<span className="ml-2 hidden md:block"> {tab.label}</span>
									</button>
								))}
							</div>
						</div>
						<div className="mt-25 mx-5 lg:mx-24">
							{items[currentTabIndex].children}
						</div>
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
			{/* </Navbarin> */}
		</>
	);
};
