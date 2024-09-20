import React, { useState } from 'react';

const Carousels = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? React.Children.count(children) - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1
    );
  };

  const slidesToShow = () => {
    if (window.innerWidth >= 1024) return 4; // lg
    if (window.innerWidth >= 768) return 3; // md
    if (window.innerWidth >= 640) return 2; // sm
    return 1; // default
  };

  const visibleChildren = React.Children.toArray(children).slice(
    currentIndex,
    currentIndex + slidesToShow()
  );

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        {visibleChildren.map((child, index) => (
          <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            {child}
          </div>
        ))}
      </div>
      <button
        onClick={handlePrevClick}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={handleNextClick}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousels;
