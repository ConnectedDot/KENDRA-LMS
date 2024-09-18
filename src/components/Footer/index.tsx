import React from "react";

const Footer = () => {
	return (
		<>
			<footer className="rounded mt-8 py-4 bg-gray-100 dark:bg-gray-800 text-center">
				<p className="text-sm text-gray-600 dark:text-gray-400">
					&copy; {new Date().getFullYear()} Kendra LMS. All rights reserved.
				</p>
				<div className="flex justify-center mt-2 space-x-4">
					<a
						href="#"
						className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
					>
						Privacy Policy
					</a>
					<a
						href="#"
						className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
					>
						Terms of Service
					</a>
					<a
						href="#"
						className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
					>
						Contact Us
					</a>
				</div>
			</footer>
		</>
	);
};

export default Footer;
