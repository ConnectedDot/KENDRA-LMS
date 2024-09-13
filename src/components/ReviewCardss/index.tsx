import React from "react";
import Slider from "react-slick";
// import {ReviewCard} from "../ReviewCard";
import { testimonials } from "../../Data";
import ReviewCard from "./ReviewCard";

export const ReviewCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 2000,
    pauseOnHover: false,
    pauseOnFocus: false,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="text-center my-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Reviews from our happy Clients
          </h2>

          <a
            href="https://www.google.com/search?q=gubtish+movers+international&oq=&gs_lcrp=EgZjaHJvbWUqCQgCECMYJxjqAjIJCAAQIxgnGOoCMgkIARAjGCcY6gIyCQgCECMYJxjqAjIJCAMQIxgnGOoCMgkIBBAjGCcY6gIyCQgFECMYJxjqAjIJCAYQIxgnGOoCMgkIBxAjGCcY6gIyCQgIECMYJxjqAjIJCAkQIxgnGOoCMgkIChAjGCcY6gIyCQgLECMYJxjqAjIJCAwQIxgnGOoCMgkIDRAjGCcY6gIyCQgOECMYJxjqAjIRCA8QABgDGEIYjwEYtAIY6gIyEQgQEAAYAxhCGI8BGLQCGOoCMg8IERAuGAMYjwEYtAIY6gIyEQgSEAAYAxhCGI8BGLQCGOoCMg8IExAuGAMYjwEYtAIY6gLSAQYtMWowajeoAhSwAgE&client=ms-android-samsung-ss&sourceid=chrome-mobile&ie=UTF-8#"
            target="_blank"
            className="mt-0 text-red-500 hover:underline group"
            rel="noreferrer"
          >
            SEE MORE{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </div>

        <div className="py-8">
          <Slider {...settings}>
            {testimonials.map((item) => (
              <div className="bg-brown-500" key={item.id}>
                <ReviewCard {...item} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
