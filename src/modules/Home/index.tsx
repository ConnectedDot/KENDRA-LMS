import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublicPaths } from "../../routes/path";
import Footer from "../../components/Footer";
import HomeLayout from "../../layout/Home";
import CategoryTabs from "../../components/Cards/CategortTabs";
import FeaturedCourses from "../../components/Cards/FeaturedCourses";
import { Testimonials } from "../../components/Cards/Testimonials";
import LearnersAreViewing from "../../components/Cards/LearnersViewing";
import {
  categories,
  featuredCourses,
  learnersAreViewing,
  testimonials,
} from "../../Data";
import { ReviewCarousel } from "../../components/ReviewCardss";
// import { ReviewCarousel } from "../../components/ReviewCard";
// import ReviewCarousel from "../../components/ReviewCard";
// import { Footer } from 'antd/es/layout/layout';
// import { Dialog, DialogPanel } from '@headlessui/react';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handlePatSignup = () => {
    navigate(PublicPaths.REGISTER);
  };

  // const handleDocSignup = () => {
  //   navigate(PublicPaths.DOCTOR_REG);
  // };

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
          <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="text-4xl">A broad selection of courses</div>
            <div className="text-xl ">
              Choose from over 220,000 online video courses with new additions
              published every month
            </div>
            <div className="">
              <CategoryTabs categories={categories} />
              <FeaturedCourses courses={featuredCourses} />
              <Testimonials testimonials={testimonials} />
              <LearnersAreViewing courses={learnersAreViewing} />
            </div>
          </div>
        </div>

        <>{/* <ReviewCarousel /> */}</>

        <a
          href="/create-account"
          className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-primary-100 shadow-sm hover:bg-primary-100 hover:text-black"
        >
          Start Your Journey
        </a>
      </div>
      <Footer />
    </HomeLayout>
  );
};

export default Home;
