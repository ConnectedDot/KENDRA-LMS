import React from 'react';

const CourseOverview = ({ course }: { course: any }) => {
  const calculateTotalReviewsAndRating = () => {
    const totalReviews = course.Videos.reduce(
      (acc: any, video: { reviewsCount: any }) => acc + video.reviewsCount,
      0
    );
    const totalRating = course.Videos.reduce(
      (acc: number, video: { rating: number; reviewsCount: number }) =>
        acc + video.rating * video.reviewsCount,
      0
    );
    const averageRating = totalRating / totalReviews;
    return { totalReviews, averageRating };
  };

  const { totalReviews, averageRating } = calculateTotalReviewsAndRating();

  return (
    <div className="p-4 bg-white ">
      <h1 className="text-3xl font-bold mb-2">{course?.Title}</h1>
      <p className="text-gray-700 mb-4">{course?.Description}</p>
      <div className="flex items-center mb-4">
        <span className="text-yellow-500 text-xl font-bold mr-2">{course?.Rating}</span>
        <span className="text-gray-600">({course?.ReviewsCount} reviews)</span>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 mt-16">What you'll learn</h2>
        <ul className="list-disc list-inside">
          {course?.LearningPoints?.map((point: any, index: any) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 mt-10">Course Content</h2>
        <ul>
          {course?.Content?.map((section: any, index: any) => (
            <li key={index} className="mb-2">
              <h3 className="font-bold">{section?.Title}</h3>
              <ul className="list-disc list-inside">
                {section?.Lectures?.map((lecture: any, idx: any) => (
                  <li key={idx}>{lecture}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseOverview;
