import React, {useEffect, useState} from "react";
import Navbarin from "../../../layout/Instructor/Navbar";
import {useLocation} from "react-router-dom";
import {Course} from "../../../interface";
import rcvideo from "../../../assets/rec.mp4";
import {getStorage, ref, getDownloadURL} from "firebase/storage";

interface CoursesViewProps {
	course: Course;
}

const CoursePage = () => {
	const location = useLocation();
	const {course} = location.state as CoursesViewProps;
	console.log(course);
	const [videoUrl, setVideoUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	// Initialize Firebase Storage
	const storage = getStorage();
	// https://firebasestorage.googleapis.com/v0/b/kendra-lms.appspot.com/o/courses%2Fcourse_1726339084612%2Fvideos%2FNode.js%20Tutorial%20-%203%20-%20Chrome's%20V8%20Engine.mkv?alt=media&token=4915f9f8-c942-4fae-a827-d2ab40008c2a
	// Create a reference to the file
	// const fileRef = ref(storage, "courses/course_1726322548642/videos");
	const fileRef = ref(
		storage,
		"courses/course_1726322548642/videos/AZ-204 Exam EP 01_ Developing Solutions for Microsoft Azure.mkv"
	);

	console.log(fileRef);

	getDownloadURL(fileRef)
		.then(url => {
			// Use the URL to download the file
			// ...
			console.log(url, "url");
		})
		.catch(error => {
			console.log(error);
			// Handle any errors
			console.error(error);
		});

	return (
		<Navbarin title={`${course.Title} | Kendra LMS`}>
			{" "}
			<div className="mt-6 container mx-auto p-4">
				{/* Top Section */}
				<div className="md:flex md:justify-between">
					{/* Left Section */}
					<div className="md:w-8/12">
						<h1 className="text-2xl font-bold">{course.Title}</h1>
						<p className="text-lg text-gray-600">{course.Description}</p>

						<div className="flex items-center my-4">
							<span className="text-yellow-500 font-bold text-lg">
								{course.Rating}
							</span>
							<span className="ml-2 text-gray-500">
								({course.ReviewsCount} students)
							</span>
						</div>

						<p className="text-gray-600">
							Created by{" "}
							<span className="text-blue-500">{course.instructor}</span>
						</p>
						<p className="text-gray-500">
							{/* Last updated {lastUpdated} | Language: {language} */}
						</p>
					</div>

					{/* Right Section */}
					<div className="md:w-4/12 bg-gray-100 p-4 rounded-lg mt-4 md:mt-0">
						{/* <video
							className="w-full rounded-lg"
							// src={rcvideo}
							src="https://firebasestorage.googleapis.com/v0/b/kendra-lms.appspot.com/o/courses%2Fcourse_1726322548642%2Fvideos%2FAZ-204%20Exam%20EP%2001_%20Developing%20Solutions%20for%20Microsoft%20Azure.mkv?alt=media&token=9824bcae-f190-4750-9eb4-c4e881a79056"
							controls
							poster={course.image}
						/> */}

						<video width="640" height="360" controls>
							<source
								src="courses/course_1726322548642/videos/AZ-204 Exam EP 01_ Developing Solutions for Microsoft Azure.mkv"
								type="video/mp4"
							/>
							Your browser does not support the video tag.
						</video>

						<p className="mt-4 text-2xl font-bold text-gray-900">
							{course.price}
						</p>
						<button className="mt-2 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
							Add to Cart
						</button>
						<button className="mt-2 w-full border border-gray-400 py-2 rounded-lg">
							Try Personal Plan for Free
						</button>
					</div>
				</div>

				{/* What You'll Learn */}
				<div className="mt-8">
					<h2 className="text-xl font-bold">What you'll learn</h2>
					<ul className="list-disc pl-5 mt-4 space-y-2">
						{course.Content.map((feature, index) => (
							<li key={index} className="text-gray-600">
								{/* {feature} */}
							</li>
						))}
					</ul>
				</div>
			</div>
		</Navbarin>
	);
};

export default CoursePage;
