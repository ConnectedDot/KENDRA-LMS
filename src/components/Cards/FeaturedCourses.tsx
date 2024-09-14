import React from "react";
import CourseCard from "./CourseCard";
import Carousels from "../Carousel";
import { Carousel } from "antd";
import CarouselComponent from "../CarouselComponent";
import { categories, category } from "../../Data";
// import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "50px",
  textAlign: "center",
  background: "#364d79",
};

const FeaturedCourses = ({ courses }: { courses: any[] }) => {
  const groupedCourses: any[] = [];
  for (let i = 0; i < courses.length; i += 4) {
    groupedCourses.push(courses.slice(i, i + 4));
  }

  const groupedCourse: any[] = [];
  for (let i = 0; i < courses.length; i += 4) {
    groupedCourse.push(courses.slice(i, i + 4));
  }

  return (
    <div
      // style={{
      //   border: "1px solid black",
      //   borderRadius: "0px",
      //   padding: "20px",
      // }}
      className=" py-6 mb-8 border-2 px-12 border-black rounded-3xl"
    >
      <h2 className="text-4xl font-semibold mb-4">
        Expand your career opportunities with Python
      </h2>
      <p className="mb-4">
        Take one of Kendra's range of Python courses and learn how to code using
        this incredibly useful language...
      </p>
      {/* <button
        // className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
        className="rounded-md bg-black text-white hover:text-black hover:bg-slate-300 hover:text-primary-100 px-3.5 py-2.5 text-sm font-semibold text-primary-100 shadow-sm hover:bg-primary-100 border-none"
      >
        Explore Python
      </button> */}

      <div className="flex space-x-4 overflow-x-auto border-b mb-4">
        {category.slice(0, 8).map((category: any, index: number) => (
          <button
            key={index}
            className="text-sm font-semibold text-gray-600 hover:text-black py-2 border-none outline-none bg-white"
          // onClick={() => onCategoryChange(category)}
          >
            {category.title}
          </button>
        ))}
        {/* <button
            key={index}
            className="text-sm font-semibold text-gray-600 hover:text-black py-2 border-none outline-none bg-white"
            // onClick={() => onCategoryChange(category)}
          >
            {category.title}
          </button> */}
        {/* ))} */}
      </div>

      <CarouselComponent carouselState={""}>
        {courses?.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </CarouselComponent>
    </div>
  );
};

export default FeaturedCourses;
