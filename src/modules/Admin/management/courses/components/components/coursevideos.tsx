import React from "react";
import {useNavigate} from "react-router-dom";
import {Course} from "../../../../../../interface";

interface CoursevideoTabsTabsProps {
	coursedata: Course;
}

const CoursevideoTabs: React.FC<CoursevideoTabsTabsProps> = ({coursedata}) => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	const [currentVideo, setCurrentVideo] = React.useState(
		coursedata.Videos[0].youtubeId
	);

	const handleVideoChange = (youtubeId: string) => {
		const videoElement = document.querySelector("video");
		if (videoElement) {
			videoElement.src = youtubeId;
			videoElement.addEventListener(
				"canplay",
				() => {
					videoElement.play();
				},
				{once: true}
			);
			setCurrentVideo(youtubeId);
		}
	};

	return (
		<>
			<div className="flex">
				<div className="flex-1">
					<video width="100%" controls>
						<source src={coursedata.Videos[0].youtubeId} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</div>
				<div className="w-1/3 p-4 ml-4">
					<p className="mb-4 mt-0 font-bold text-lg">VIDEO CONTENTS</p>
					<ul className="space-y-4">
						{coursedata.Videos.map(video => (
							<li
								key={video.id}
								className={`cursor-pointer ${
									video.youtubeId === currentVideo ? "font-bold" : ""
								}`}
								onClick={() => handleVideoChange(video.youtubeId)}
							>
								<div className="flex flex-col">
									<div className="flex flex-col">
										<div className="flex">
											<span className="text-sm">{video.title}</span>
										</div>
										<div className="flex">
											{video.youtubeId === currentVideo && (
												<span className="text-sm font-bold text-green-500">
													(Now Playing)
												</span>
											)}
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="flex justify-end mt-4">
				<button
					className={`px-4 py-2 rounded ${
						coursedata.isApproved === false ? "bg-red-500" : "bg-green-500"
					} text-white`}
					onClick={() => {
						coursedata.isApproved = !coursedata.isApproved;
					}}
				>
					{coursedata.isApproved === true
						? "Disapprove Course"
						: "Approve Course"}
				</button>
			</div>
		</>
	);
};

export default CoursevideoTabs;
