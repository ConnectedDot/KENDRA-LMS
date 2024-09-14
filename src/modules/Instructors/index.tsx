import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context";
import InstLayout from "../../layout/Instructor";
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
		{to: `${PrivatePaths.INSTRUCTOR}courses-view`, text: "Manage Courses"},
		{to: "/student-progress", text: "Track Student Progress"},
		{to: "/community", text: "Community"},
	];

	return (
		<Navbarin>
			<section className="px-0 md:mx-0 rounded-3xl bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
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
						Welcome to Our Instructor Dashboard
					</h1>
					<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
						At Kendra, we empower educators with the tools and resources needed
						to deliver exceptional learning experiences. Manage your courses,
						track student progress, and engage with your community.
					</p>
					{/* <form className="w-full max-w-md mx-auto">
						<label
							htmlFor="default-email"
							className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
						>
							Email sign-up
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
								<svg
									className="w-4 h-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 16"
								>
									<path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
									<path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
								</svg>
							</div>
							<input
								type="email"
								id="default-email"
								className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
								placeholder="Enter your email here..."
								required
							/>
							<button
								type="submit"
								className="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
							>
								Sign up
							</button>
						</div>
					</form> */}

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
