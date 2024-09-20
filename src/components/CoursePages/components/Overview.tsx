import React, {useEffect, useRef, useState} from "react";

const CourseOverview = ({course}: {course: any}) => {
	const [showFullDescription, setShowFullDescription] = useState(false);
	const [contentHeight, setContentHeight] = useState(0); // Full height of the content
	const [isHeightSet, setIsHeightSet] = useState(false); // Track if the height has been set
	const contentRef = useRef<HTMLDivElement>(null);

	// Calculate full height of content once it's rendered
	useEffect(() => {
		if (contentRef.current && !isHeightSet) {
			setContentHeight(contentRef.current.scrollHeight); // Set the full content height
			setIsHeightSet(true); // Mark the height as set
		}
	}, [course?.Fullbrief, isHeightSet]);

	const handleToggleDescription = () => {
		setShowFullDescription(!showFullDescription);
	};

	const calculateTotalReviewsAndRating = () => {
		const totalReviews = course.Videos.reduce(
			(acc: any, video: {reviewsCount: any}) => acc + video.reviewsCount,
			0
		);
		const totalRating = course.Videos.reduce(
			(acc: number, video: {rating: number; reviewsCount: number}) =>
				acc + video.rating * video.reviewsCount,
			0
		);
		const averageRating = totalRating / totalReviews;
		return {totalReviews, averageRating};
	};

	const {totalReviews, averageRating} = calculateTotalReviewsAndRating();

	return (
		<div className="p-4 bg-white ">
			<h1 className="text-3xl font-bold mb-2">{course?.Title}</h1>
			<p className="text-gray-700 mb-4">{course?.Description}</p>
			<div className="flex items-center mb-4">
				<span className="text-yellow-500 text-xl font-bold mr-2">
					{course?.Rating}
				</span>
				<span className="text-gray-600">({course?.ReviewsCount} reviews)</span>
			</div>
			<div className="mb-4">
				<h2 className="text-xl font-bold mb-2 mt-16">What you'll learn</h2>
				<ul className="list-disc list-inside">
					{course?.LearningPoints?.map((point: any, index: any) => (
						<li key={index}>{point}</li>
					))}
				</ul>
			</div>
			<div className="mb-4">
				<h2 className="text-xl font-bold mb-2 mt-10">Course Content</h2>
				<ul>
					{course?.Content?.map((section: any, index: any) => (
						<li key={index} className="mb-2">
							<h3 className="font-bold">{section?.Title}</h3>
							<ul className="list-disc list-inside">
								{section?.Lectures?.map((lecture: any, idx: any) => (
									<li key={idx}>{lecture}</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</div>
			{/* <div className="mb-4">
				<h1 className="text-3xl font-bold mb-6 mt-12">Full Description</h1>
				<div dangerouslySetInnerHTML={{__html: course?.Fullbrief}} />
			</div> */}

			<div className="mb-4">
				<h1 className="text-3xl font-bold mb-6 mt-12 border-none outline-none">
					Full Description
				</h1>
				<div
					ref={contentRef}
					style={{
						maxHeight: showFullDescription ? `${contentHeight}px` : "200px", // Toggle full or limited height
						overflow: "hidden", // Hide overflow
						transition: "max-height 0.5s ease", // Smooth transition for expanding and collapsing
					}}
					dangerouslySetInnerHTML={{__html: course?.Fullbrief}} // Ensure the HTML is rendering properly
				/>
				<button
					className="text-blue-500 mt-2 border-none outline-none"
					onClick={handleToggleDescription}
				>
					{showFullDescription ? "See Less" : "See More"}
				</button>
			</div>
		</div>
	);
};

export default CourseOverview;
