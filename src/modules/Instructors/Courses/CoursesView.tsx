import React, {useState, useEffect, startTransition} from "react";
import {Card, Checkbox, Col, List, Row, Spin, TabsProps} from "antd";
import {
	LoadingOutlined,
	PlayCircleFilled,
	SearchOutlined,
} from "@ant-design/icons";
// import DecriptionTab from "./components/DecriptionTab";
// import CourseOverview from "./components/Overview";
// import CourseQnA from "./components/FAQ";
import videojs from "video.js";
import {Course} from "../../../interface";
import CourseOverview from "../../Learners/components/Overview";
import CourseQnA from "../../Learners/components/FAQ";
import DecriptionTab from "../../Learners/components/DecriptionTab";
// import { Course } from "../../interface";

interface CoursesViewProps {
	course: Course;
}

const CoursesView: React.FC<CoursesViewProps> = ({course}) => {
	const [currentVideo, setCurrentVideo] = useState(
		course?.Videos?.length > 0 ? course?.Videos[0].youtubeId : ""
	);
	const [loading, setLoading] = useState(false);
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

	const handleVideoEnd = () => {
		const currentIndex = course.Videos.findIndex(
			(video: {youtubeId: any}) => video.youtubeId === currentVideo
		);
		const updatedPlaylists = playlists.map((video: any, index: any) => {
			if (index === currentIndex) {
				return {...video, watched: true};
			}
			return video;
		});
		setPlaylists(updatedPlaylists);

		if (currentIndex < playlists.length - 1) {
			setCurrentVideo(playlists[currentIndex + 1].youtubeId);
		}
	};

	useEffect(() => {
		setLoading(false);
	}, [currentVideo]);

	useEffect(() => {
		const player = videojs("my-player");
		player.src({type: "video/mp4", src: getVideoUrl(currentVideo)});

		player.on("ended", handleVideoEnd);

		return () => {
			player.dispose();
		};
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
		<div className="overflow-x-hidden">
			<Row gutter={[0, 0]} justify="center">
				<Col xs={24} sm={24} md={19} lg={19}>
					{loading ? (
						<Spin indicator={<LoadingOutlined style={{fontSize: 48}} spin />} />
					) : (
						<div className="video-container">
							<video
								id="my-player"
								className="video-js"
								controls
								preload="auto"
								poster="//vjs.zencdn.net/v/oceans.png"
								data-setup='{"controls": true, "autoplay": false, "preload": "auto"}'
								style={{width: "100%"}}
							>
								<source
									src={getVideoUrl(currentVideo)}
									type="video/mp4"
								></source>
							</video>
						</div>
					)}

					<div className="flex min-h-[50px] flex !p-0 mb-5 w-full bg-gray-800">
						<div className="flex text-center items-center justify-center ml-10 flex h-full">
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
									className="flex items-center mt-3 p-2 text-white"
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
											<div className="font-bold">{playlist.title}</div>
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
	);
};

export default CoursesView;
