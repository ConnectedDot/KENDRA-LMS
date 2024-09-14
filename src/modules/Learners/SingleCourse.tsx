import {Card, Checkbox, Col, List, Row, Spin, TabsProps} from "antd";
import React, {useState, useEffect, startTransition} from "react";
import DecriptionTab from "./components/DecriptionTab";
import {
	LoadingOutlined,
	PlayCircleFilled,
	SearchOutlined,
} from "@ant-design/icons";
import CourseOverview from "./components/Overview";
import CourseQnA from "./components/FAQ";
import videojs from "video.js";
import {Course} from "../../interface";

const SingleCourse = () => {
	const course = DataCourse;
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

export default SingleCourse;

export const DataCourse: Course = {
	Title: "Introduction to the Course",
	Description: "This is a course that will teach you the basics of programming",
	Rating: 4.5,
	ReviewsCount: 100,
	LearningPoints: ["Variables", "Functions", "Loops"],
	Content: [
		{
			Title: "Section 1: Introduction",
			Lectures: ["Welcome to the course", "What is programming"],
		},
		{
			Title: "Section 2: Variables",
			Lectures: ["What are variables", "Declaring variables"],
		},
	],

	Questions: [
		{
			question: "What is the course about?",
			answer: "This course is about programming",
		},
		{
			question: "What will I learn in this course?",
			answer: "You will learn the basics of programming",
		},
	],

	Videos: [
		{
			id: 1,
			title: "1. Introduction to the Course",
			youtubeId: "https://www.youtube.com/watch?v=4LYDQLhx3Es",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "10:00",
			watched: false,
		},
		{
			id: 2,
			title: "2. Setting Up Your Environment",
			youtubeId:
				"https://drive.google.com/file/d/1z79uxrDdoZoSjSjQhlLaDKSQu242SHDT/view?usp=sharing",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "15:30",
			watched: false,
		},
		{
			id: 3,
			title: "3, Your First Program",
			youtubeId: "https://www.youtube.com/watch?v=4s6iBllDl14",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "20:45",
			watched: false,
		},
		{
			id: 4,
			title: "4. Understanding Variables",
			youtubeId:
				"https://drive.google.com/file/d/1z5kl8kGINK4Rzh6dmcijvEhZCVJ7qxiX/view?usp=drive_link",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "12:00",
			watched: false,
		},
		{
			id: 5,
			title: "Introduction to the Course",
			youtubeId: "https://www.youtube.com/watch?v=4LYDQLhx3Es",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "10:00",
			watched: false,
		},
		{
			id: 6,
			title: "Setting Up Your Environment",
			youtubeId:
				"https://drive.google.com/file/d/1z79uxrDdoZoSjSjQhlLaDKSQu242SHDT/view?usp=sharing",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "15:30",
			watched: false,
		},
		{
			id: 7,
			title: "Your First Program",
			youtubeId: "https://www.youtube.com/watch?v=4s6iBllDl14",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "20:45",
			watched: false,
		},
		{
			id: 8,
			title: "Understanding Variables",
			youtubeId:
				"https://drive.google.com/file/d/1z5kl8kGINK4Rzh6dmcijvEhZCVJ7qxiX/view?usp=drive_link",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "12:00",
			watched: false,
		},
		{
			id: 9,
			title: "Introduction to the Course",
			youtubeId: "https://www.youtube.com/watch?v=4LYDQLhx3Es",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "10:00",
			watched: false,
		},
		{
			id: 10,
			title: "Setting Up Your Environment",
			youtubeId:
				"https://drive.google.com/file/d/1z79uxrDdoZoSjSjQhlLaDKSQu242SHDT/view?usp=sharing",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "15:30",
			watched: false,
		},
		{
			id: 11,
			title: "Your First Program",
			youtubeId: "https://www.youtube.com/watch?v=4s6iBllDl14",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "20:45",
			watched: false,
		},
		{
			id: 12,
			title: "Understanding Variables",
			youtubeId:
				"https://drive.google.com/file/d/1z5kl8kGINK4Rzh6dmcijvEhZCVJ7qxiX/view?usp=drive_link",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "12:00",
			watched: false,
		},
		{
			id: 13,
			title: "1. Introduction to the Course",
			youtubeId: "https://www.youtube.com/watch?v=4LYDQLhx3Es",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "10:00",
			watched: false,
		},
		{
			id: 14,
			title: "2. Setting Up Your Environment",
			youtubeId:
				"https://drive.google.com/file/d/1z79uxrDdoZoSjSjQhlLaDKSQu242SHDT/view?usp=sharing",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "15:30",
			watched: false,
		},
		{
			id: 15,
			title: "3, Your First Program",
			youtubeId: "https://www.youtube.com/watch?v=4s6iBllDl14",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "20:45",
			watched: false,
		},
		{
			id: 16,
			title: "4. Understanding Variables",
			youtubeId:
				"https://drive.google.com/file/d/1z5kl8kGINK4Rzh6dmcijvEhZCVJ7qxiX/view?usp=drive_link",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "12:00",
			watched: false,
		},
		{
			id: 17,
			title: "Introduction to the Course",
			youtubeId: "https://www.youtube.com/watch?v=4LYDQLhx3Es",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "10:00",
			watched: false,
		},
		{
			id: 18,
			title: "Setting Up Your Environment",
			youtubeId:
				"https://drive.google.com/file/d/1z79uxrDdoZoSjSjQhlLaDKSQu242SHDT/view?usp=sharing",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "15:30",
			watched: false,
		},
		{
			id: 19,
			title: "Your First Program",
			youtubeId: "https://www.youtube.com/watch?v=4s6iBllDl14",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "20:45",
			watched: false,
		},
		{
			id: 20,
			title: "Understanding Variables",
			youtubeId:
				"https://drive.google.com/file/d/1z5kl8kGINK4Rzh6dmcijvEhZCVJ7qxiX/view?usp=drive_link",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "12:00",
			watched: false,
		},
		{
			id: 21,
			title: "Introduction to the Course",
			youtubeId: "https://www.youtube.com/watch?v=4LYDQLhx3Es",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "10:00",
			watched: false,
		},
		{
			id: 22,
			title: "Setting Up Your Environment",
			youtubeId:
				"https://drive.google.com/file/d/1z79uxrDdoZoSjSjQhlLaDKSQu242SHDT/view?usp=sharing",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "15:30",
			watched: false,
		},
		{
			id: 23,
			title: "Your First Program",
			youtubeId: "https://www.youtube.com/watch?v=4s6iBllDl14",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "20:45",
			watched: false,
		},
		{
			id: 23,
			title: "Understanding Variables",
			youtubeId:
				"https://drive.google.com/file/d/1z5kl8kGINK4Rzh6dmcijvEhZCVJ7qxiX/view?usp=drive_link",
			thumbnailUrl: "https://i.ytimg.com/vi/4LYDQLhx3Es/hqdefault.jpg",
			playtime: "12:00",
			watched: false,
		},
	],
	category: [
		{
			id: 1,
			title: "Development",
		},
	],
	subcategoryId: [
		{
			id: 1,
			title: "Web Development",
		},
	],
	_id: "",
	price: "",
	fullbrief: "",
};

//  <Checkbox
// style={{ paddingRight: '-15rem' }}
// checked={playlist.watched}
// onChange={() => {
//   const updatedPlaylists = playlists.map((video, idx) => {
//     if (idx === index) {
//       return { ...video, watched: !video.watched };
//     }
//     return video;
//   });
//   setPlaylists(updatedPlaylists);
// }}
// />

{
	/* <ReactPlayer
                url={getVideoUrl(currentVideo)}
                width="100%"
                height="400px"
                playing
                controls
                onEnded={handleVideoEnd}
              /> */
}

{
	/* <iframe
                src={getVideoUrl(currentVideo)}
                width="100%"
                height="400px"
                // playing
                title="video"
                // controls={true}
                onEnded={handleVideoEnd}
              /> */
}
