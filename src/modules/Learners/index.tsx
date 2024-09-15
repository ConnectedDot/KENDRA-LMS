import React, {useContext} from "react";
import {PrivatePaths} from "../../routes/path";
import Navbarin from "../../layout/Instructor/Navbar";
import {AuthContext} from "../../context";
import {Link, useNavigate} from "react-router-dom";
import FeaturedCourse from "./courses/components/FeaturedCourse";
import {useFetchCourses} from "../../hooks/Querry";
import {Course} from "../../interface";
import {useFirebaseUserSignedIn, useObserveAuthState} from "../../hooks/auth";
// import {useObserveAuthState} from "../../hooks/auth";

const Dashboard = () => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};
	const {courses, error} = useFetchCourses();
	const {user} = useContext(AuthContext);
	// const userFire = useFirebaseUserSignedIn();
	const userFire = useObserveAuthState();
	console.log(userFire, "userFire");
	const HandleCourses = () => {
		navigate(`${PrivatePaths.INSTRUCTOR}courses-new`);
	};

	const HandleViewCourses = (course: Course) => {
		navigate(`${PrivatePaths.INSTRUCTOR}courses-view/${course.id}`, {
			state: {course},
		});
	};

	const getInitials = (firstName: string = "", lastName: string = "") => {
		const initials = `${firstName} ${lastName}`
			.trim()
			.replace(/\s+/, " ")
			.split(" ")
			.map(word => word[0])
			.join("");
		return initials.substring(0, 2).toUpperCase();
	};

	const quickLinks = [
		{to: `${PrivatePaths.USER}courses-view`, text: "My Courses"},
		{to: `${PrivatePaths.USER}tracker`, text: "Track My Progress"},
		{to: `${PrivatePaths.USER}community`, text: "Community"},
	];

	return (
		<>
			<Navbarin>
				<section className="px-0 md:mx-0  mx-auto mb-6 mt-6">
					<div className="flex items-center">
						{" "}
						<div className="flex">
							{user?.photo ? (
								<img
									className="w-20 h-20 rounded-full"
									src={user?.photo as any}
									alt={user?.firstName}
								/>
							) : (
								<div className="w-20 h-20 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
									{getInitials(user?.firstName, user?.lastName)}
								</div>
							)}
						</div>
						<div className="flex flex-col ml-4">
							{" "}
							<span className="flex"> Welcome back,</span>
							<span className="flex font-bold text-2xl">
								{" "}
								{user?.firstName}
							</span>
						</div>
					</div>
				</section>
				<section className="px-0 md:mx-0 rounded-3xl bg-white dark:bg-green-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
					<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
						<Link
							to="#"
							className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg- dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500"
						>
							<span className="text-xs bg-gray-600 rounded-full text-white px-4 py-1.5 me-3">
								New
							</span>{" "}
							<span className="text-sm text-black font-medium">
								New Feature: Interactive Quizzes! Test your knowledge with our
								new tool.
							</span>
							<svg
								className="w-2.5 h-2.5 ms-2 rtl:rotate-180 text-black "
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 9 4-4-4-4"
								/>
							</svg>
						</Link>
						<h1 className="mb-4 mx-8 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
							Welcome to Your Learning Dashboard
						</h1>
						<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
							At Kendra, we provide you with the tools and resources needed to
							excel in your learning journey. Access your courses, track your
							progress, and engage with your peers.
						</p>

						<div className="mt-8">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
								Quick Links
							</h2>
							<div className="flex justify-center mt-4 space-x-4">
								{quickLinks.map(link => (
									<Link
										key={link.to}
										to={link.to}
										className="text-sm font-medium text-gray-700 bg-gray-100 rounded-full py-2 px-4 dark:bg-white dark:text-green- hover:bg-gray-200 dark:hover:bg-gray-400"
									>
										{link.text}
									</Link>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="px-0 md:mx-0  mx-auto mb-24 mt-14">
					<div className="relative isolate px-6 pt-14 lg:px-8">
						<div className="text-4xl">A broad selection of courses</div>
						<div className="text-xl mb-6 ">
							Choose from over 220,000 online video courses with new additions
							published every month
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{courses.map(course => (
								<FeaturedCourse
									key={course.id}
									title={course.Title}
									category={
										course.category && course.category.length > 0
											? course.category[0].title
											: "No Category"
									}
									description={course.Description}
									imageUrl={course.image} // Ensure this field exists in your course object
									link={`${PrivatePaths.USER}course-details/${course.id}`} // Adjust the link as necessary
								/>
							))}
						</div>
					</div>
				</section>
			</Navbarin>{" "}
		</>
	);
};

export default Dashboard;
