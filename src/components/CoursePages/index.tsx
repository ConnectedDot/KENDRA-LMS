import React from 'react';

const CourseDetailsPage = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-4">
        <span className="mr-2">Development</span> &gt;
        <span className="mx-2">Programming Languages</span> &gt;
        <span className="ml-2 text-gray-800">Python</span>
      </nav>

      <div className="flex flex-col lg:flex-row lg:space-x-4">
        {/* Course Info Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-2">
            Python Programming - From Basics to Advanced level
          </h1>
          <p className="text-gray-600 mb-2">
            This Python for beginners course will help you to become Zero to Hero. Learn Python
            Programming in Easy Way.
          </p>
          <div className="flex items-center text-yellow-500 mb-4">
            <span className="text-lg mr-1">4.4</span>
            <span className="text-sm">({`7,270 ratings`})</span>
            <span className="text-sm ml-2">346,170 students</span>
          </div>
          <p className="text-gray-600 mb-4">
            Created by <span className="font-semibold">EdYoda for Business, Dipesh Sharma</span>
          </p>
          <p className="text-gray-600 mb-4">Last updated 2/2020</p>
          <p className="text-gray-600 mb-4">English</p>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">What you'll learn</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Introduction to Python and Python 3</li>
              <li>
                Understand the basics: Data types, Loops, Conditional statements, Functions, and
                Modules
              </li>
              <li>Learn object-oriented programming in Python</li>
              <li>Learn how to make your own web-scraping tool using Python</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Course content</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800">Introduction & Basics</h3>
                <p className="text-gray-600">5 lectures • 51min</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800">Conditional Statements and Loops</h3>
                <p className="text-gray-600">5 lectures • 40min</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800">
                  Python Data Types - String, Lists, Tuple, Dictionaries
                </h3>
                <p className="text-gray-600">9 lectures • 1hr 56min</p>
              </div>
              {/* Add more sections similarly */}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-0 lg:self-start">
          <div className="border rounded-lg overflow-hidden shadow-lg p-4 bg-white">
            <img
              src="/path/to/image.png"
              alt="Course preview"
              className="w-full h-40 object-cover mb-4"
            />
            <h2 className="text-3xl font-semibold text-purple-700 mb-4">₦5,900</h2>
            <p className="text-gray-600 mb-4 line-through">₦24,900</p>
            <p className="text-red-500 mb-4">76% off</p>
            <p className="text-gray-600 mb-4">2 days left at this price!</p>
            <button className="bg-purple-700 text-white py-2 px-4 rounded-lg w-full mb-4">
              Add to cart
            </button>
            <button className="bg-gray-900 text-white py-2 px-4 rounded-lg w-full mb-4">
              Buy now
            </button>
            <p className="text-gray-600 text-center mb-4">30-Day Money-Back Guarantee</p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">This course includes:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>8 hours on-demand video</li>
                <li>Access on mobile and TV</li>
                <li>Full lifetime access</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">Share</button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
              Gift this course
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
              Apply Coupon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
