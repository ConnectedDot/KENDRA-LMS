import React from "react";

interface PasswordPopoverProps {
  password: string;
}

const PasswordPopover: React.FC<PasswordPopoverProps> = ({ password }) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 12;

  const strength = [
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
    isLongEnough,
  ].filter(Boolean).length;

  return (
    <div
      data-popover
      id="popover-password"
      role="tooltip"
      className="absolute z-10 inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
    >
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Must have at least 6 characters
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`h-1 ${
                index < strength
                  ? "bg-orange-300 dark:bg-orange-400"
                  : "bg-gray-200 dark:bg-gray-600"
              }`}
            ></div>
          ))}
        </div>
        <p>It’s better to have:</p>
        <ul>
          <li className="flex items-center mb-1">
            <svg
              className={`w-3.5 h-3.5 me-2 ${
                hasUpperCase && hasLowerCase
                  ? "text-green-400 dark:text-green-500"
                  : "text-gray-300 dark:text-gray-400"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
            Upper & lower case letters
          </li>
          <li className="flex items-center mb-1">
            <svg
              className={`w-3 h-3 me-2.5 ${
                hasSpecialChar
                  ? "text-green-400 dark:text-green-500"
                  : "text-gray-300 dark:text-gray-400"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            A symbol (#$&)
          </li>
          <li className="flex items-center">
            <svg
              className={`w-3 h-3 me-2.5 ${
                isLongEnough
                  ? "text-green-400 dark:text-green-500"
                  : "text-gray-300 dark:text-gray-400"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            A longer password (min. 12 chars.)
          </li>
        </ul>
      </div>
      <div data-popper-arrow></div>
    </div>
  );
};

export default PasswordPopover;
