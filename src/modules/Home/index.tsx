import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {PublicPaths} from "../../routes/path";
import Footer from "../../components/Footer";
import HomeLayout from "../../layout/Home";
import FeaturedCourses from "../../components/Cards/featuredcourses";
import {Testimonials} from "../../components/Cards/testimonials";
import LearnersAreViewing from "../../components/Cards/learnersviewing";
import {featuredCourses, learnersAreViewing, testimonials} from "../../Data";
import {CarouselImages} from "../../components/CarouselComponent/carouselimages";

const Home = () => {
	return (
		<HomeLayout>
			<div className="bg-white">
				<div className="relative isolate px-6 pt-14 lg:px-8">
					<div className="mx-auto max-w-2xl py-4 sm:py-14 lg:py-18">
						<div className="hidden sm:mb-8 sm:flex sm:justify-center">
							<div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
								Exciting new courses{" "}
								<a
									href="/"
									className="font-semibold text-black hover:text-gray-500"
								>
									<span className="absolute inset-0" aria-hidden="true" />
									Explore now <span aria-hidden="true">&rarr;</span>
								</a>
							</div>
						</div>
						<div className="text-center">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
								Empower Your Knowledge. Build Your Future.
							</h1>
							<p className="mt-6 text-lg leading-8 text-gray-600">
								Discover limitless learning with top-tier courses designed for
								professionals, hobbyists, and students alike. Expand your skills
								with ease and on your terms.
							</p>
							<div className="mt-10 flex items-center justify-center gap-x-6">
								<a
									href="/create-account"
									className="rounded-md bg-black text-white hover:text-black hover:bg-slate-300 px-3.5 py-2.5 text-sm font-semibold text-primary-100 shadow-sm hover:bg-primary-100 "
								>
									Get started
								</a>
								<a
									href="/about"
									className="text-md font-semibold leading-6 text-black hover:text-gray-500"
								>
									Learn more <span aria-hidden="true">→</span>
								</a>
							</div>
						</div>
					</div>
					<div
						className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
						aria-hidden="true"
					>
						<div
							className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
							style={{
								clipPath:
									"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
							}}
						/>
					</div>
				</div>

				<div className="p-6 mx-auto md:mx-44 w-8xl py-4 sm:py-8 lg:py-16">
					<CarouselImages
						images={featuredCourses.map(course => course.image)}
					/>
				</div>

				<div className="p-6 mx-auto md:mx-44 w-8xl py-4 sm:py-8 lg:py-16">
					<div className="relative isolate px-6 pt-14 lg:px-8">
						<div className="text-4xl">A broad selection of courses</div>
						<div className="text-xl mb-6 ">
							Choose from over 220,000 online video courses with new additions
							published every month
						</div>
						<div className="">
							{/* <CategoryTabs categories={categories} /> */}
							<FeaturedCourses courses={featuredCourses} />
							<Testimonials testimonials={testimonials} />
							<LearnersAreViewing courses={learnersAreViewing} />
						</div>
					</div>
				</div>

				<></>

				{/* import ReviewCarousel from "../../components/ReviewCard"; */}

				<section className=" px-4 mx-auto md:mx-24 w-8xl rounded-3xl bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
					<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
						<Link
							to="#"
							className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg- dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500"
						>
							<span className="text-xs bg-gray-600 rounded-full text-white px-4 py-1.5 me-3">
								New
							</span>{" "}
							<span className="text-sm text-black font-medium">
								New Course Available: Advanced React! Enroll now to enhance your
								skills.
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
						<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
							Unlock Your Learning Potential
						</h1>
						<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
							At Kendra, we provide cutting-edge courses and resources to help
							you excel in your educational journey. Join us to explore new
							horizons and achieve your academic goals.
						</p>
						<form className="w-full max-w-md mx-auto">
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
						</form>
					</div>
					{/* <div className="bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-900 w-full h-full absolute top-0 left-0 z-0"></div> */}
				</section>
			</div>
			<Footer />
		</HomeLayout>
	);
};

export default Home;
