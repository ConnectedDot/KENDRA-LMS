import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { FaThumbsUp } from "react-icons/fa";

type ReviewCardProps = {
  // avatar: string;
  // name: string;
  text: string;
  author: string;
  // rating: number;
  // year: number;
  // reviewText: string;
  // likes: number;
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  // avatar,
  // name,
  text,
  author,
}) => {
  const truncateName = (name: string, maxLength: number) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };

  const calculateTimeAgo = (year: number) => {
    const currentYear = new Date().getFullYear();
    const yearsAgo = currentYear - year;
    return `${yearsAgo} years ago`;
  };

  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");
    return initials.substring(0, 2).toUpperCase();
  };

  return (
    <div className="p-4 ml-4 mr-4 rounded-lg bg-gray-800 text-white max-w-md">
      <div className="flex flex-row mb-2">
        <div className="flex">
          {/* {avatar ? (
            <img
              src={avatar}
              alt={author}
              className="w-12 h-12 rounded-full mr-3"
            />
          ) : ( */}
          <div className="w-12 h-12 rounded-full mr-3 bg-gray-500 flex items-center justify-center text-white font-bold">
            {getInitials(author)}
          </div>
          {/* )} */}
        </div>
        <div className="flex flex-col mb-2 items-start bg-black">
          <h3 className="font-semibold">{author}</h3>
          <p className="text-sm text-gray-400 mb-2">{text}</p>

          {/* <div className="flex flex-col mb-2 items-start">
            <div className="flex">
              {Array(rating)
                .fill(0)
                .map((_, index) => (
                  <StarIcon key={index} className="h-5 w-5 text-yellow-400" />
                ))}
            </div>{" "}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
