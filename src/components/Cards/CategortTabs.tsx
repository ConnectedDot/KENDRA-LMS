// import React from 'react';

// const CategoryTabs = ({ categories }: { categories: string[] }) => {
//   return (
//     <div className="flex space-x-4 overflow-x-auto border-b mb-4">
//       {categories.map((category, index) => (
//         <button
//           key={index}
//           className="text-sm font-semibold text-gray-600 hover:text-black py-2 border-none outline-none bg-white"
//         >
//           {category}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default CategoryTabs;

import React from "react";

type CategoryTabsProps = {
  categories: string[];
  // onCategoryChange: (category: string) => void;
};

const CategoryTabs = ({ categories }: CategoryTabsProps) => {
  return (
    <div className="flex space-x-4 overflow-x-auto border-b mb-4">
      {categories.map((category, index) => (
        <button
          key={index}
          className="text-sm font-semibold text-gray-600 hover:text-black py-2 border-none outline-none bg-white"
          // onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
