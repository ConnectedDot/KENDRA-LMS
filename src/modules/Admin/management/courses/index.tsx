import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {PrivatePaths} from "../../../../routes/path";
import Navbarin from "../../../../layout/Instructor/Navbar";
import {Course} from "../../../../interface";
import {useFetchCourses} from "../../../../hooks/Querry";
import {MdArrowBack} from "react-icons/md";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
// import TableComponent from "../../components/tablecomponent";
// import {useFetchCourses} from "../../../../../hooks/Querry";

const CourseManagementTabs = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	const {courses, error, loading} = useFetchCourses();
	console.log(courses, "courses");

	const HandleViewCourses = (course: Course) => {
		navigate(`${PrivatePaths.ADMIN}courses-view/${course.id}`, {
			state: {course},
		});
	};

	return (
		<Navbarin title={"Admin's Dashboard | Kendra LMS"}>
			<section className="flex justify-between mt-2">
				<button
					className="flex items-center mb-1 text-sm gap-3 font-medium text-gray-700 rounded-xl py-2 px-4 dark:bg-white dark:text-gray-600 dark:hover:text-black"
					onClick={handleGoBack}
				>
					<MdArrowBack /> Go Back
				</button>
			</section>
			<section className="mt-1 px-0 md:mx-0 rounded-3xl bg-white dark:bg-black bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
				<div className="py-2 px-4 mx-auto max-w-screen-xl text-center lg:py-6 z-10 relative">
					<h1 className="mb-4 mx-8 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
						Course management
					</h1>
					<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
						Manage all courses, including adding, editing, and removing courses.
					</p>
				</div>
			</section>
			<section className="mt-4">
				<div className="mx-auto px-6 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
					{loading ? (
						<div className="flex justify-center items-center h-64">
							<Spin
								indicator={
									<LoadingOutlined
										style={{fontSize: 48, color: "black"}}
										spin
									/>
								}
							/>
						</div>
					) : (
						courses.map(feature => (
							<div
								onClick={() => HandleViewCourses(feature)}
								key={feature.id}
								className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
							>
								<video className="p-0 rounded-t-lg" controls>
									<source
										src={feature.Videos?.[0]?.youtubeId}
										type="video/mp4"
									/>
									Your browser does not support the video tag.
								</video>

								<div className="p-4">
									<h5 className="mb-0 text-lg font-bold tracking-tight text-gray-500 dark:text-white">
										{feature.Title}
									</h5>
									<h5 className="mt-2 mb-2 font-thin text-xs tracking-tight text-gray-500 dark:text-white">
										{feature.Description}
									</h5>

									<p className="mb-0 font-bold text-gray-700 dark:text-gray-400 border-white">
										{Number(feature.price) === 0 || feature.price === undefined
											? "Free"
											: `$${feature.price}`}
									</p>
								</div>
							</div>
						))
					)}
				</div>
			</section>

			<section className="mt-10">{/* <TableComponent /> */}</section>
		</Navbarin>
	);
};

export default CourseManagementTabs;
