import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context";
import Navbarin from "../../layout/Instructor/Navbar";
import {PrivatePaths} from "../../routes/path";

const Dashboard = () => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};

	const {user} = useContext(AuthContext);
	console.log(user, "user");

	const quickLinks = [
		{to: `${PrivatePaths.ADMIN}users`, text: "Manage Users"},
		{to: `${PrivatePaths.ADMIN}courses`, text: "Manage Courses"},
		{to: `${PrivatePaths.ADMIN}reports`, text: "View Reports"},
	];

	return (
		<Navbarin title={"Admin's Dashboard | Kendra LMS"}>
			<section className="mt-12 px-0 md:mx-0 rounded-3xl bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
				<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
					<Link
						to="#"
						className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg- dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500"
					>
						<span className="text-xs bg-gray-600 rounded-full text-white px-4 py-1.5 me-3">
							New
						</span>{" "}
						<span className="text-sm text-black font-medium">
							New Feature: Interactive Quizzes! Engage your students with our
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
						Welcome to Our Admin Dashboard
					</h1>
					<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
						At Kendra, we empower administrators with the tools and resources
						needed to manage the platform. Manage users, courses, and view
						reports.
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
									className="text-sm font-medium text-gray-700 bg-gray-100 rounded-full py-2 px-4 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
								>
									{link.text}
								</Link>
							))}
						</div>
					</div>
				</div>
			</section>
		</Navbarin>
	);
};

export default Dashboard;
