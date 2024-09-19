import React, {useContext} from "react";
import {AuthContext} from "../../context";
import {Link} from "react-router-dom";

const Footer = () => {
	const {user} = useContext(AuthContext);

	let footerClassName =
		"rounded mt-8 py-4 bg-gray-100 dark:bg-gray-800 text-center text-gray-600 dark:text-gray-400"; // default
	if (user?.role === "Admin") {
		footerClassName =
			"rounded mt-8 py-4 bg-gray-100 dark:bg-black text-center text-white";
	} else if (user?.role === "Instructor") {
		footerClassName =
			"rounded mt-8 py-4 bg-gray-100 dark:bg-yellow-900 text-center text-white";
	} else if (user?.role === "User") {
		footerClassName =
			"rounded mt-8 py-4 bg-gray-100 dark:bg-green-900 text-center text-white";
	}

	return (
		<>
			<footer className={footerClassName}>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					&copy; {new Date().getFullYear()} Kendra LMS. All rights reserved.
				</p>
				<div className="flex justify-center mt-2 space-x-4">
					<Link
						to=""
						className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
					>
						Privacy Policy
					</Link>
					<Link
						to=""
						className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
					>
						Terms of Service
					</Link>
					<Link
						to=""
						className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
					>
						Contact Us
					</Link>
				</div>
			</footer>
		</>
	);
};

export default Footer;
