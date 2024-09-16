import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {PrivatePaths} from "../../../routes/path";
import {useFullLogout} from "../../../context/hooks";

export const AvatarMenu = ({user}: {user: any}) => {
	const [open, setOpen] = useState(false);
	const [userData, setUserData] = useState(user);

	useEffect(() => {
		if (user) {
			setUserData(user);
		}
	}, [user]);

	const getPathPrefix = (role: string) => {
		switch (role) {
			case "Admin":
				return PrivatePaths.ADMIN;
			case "Instructor":
				return PrivatePaths.INSTRUCTOR;
			case "User":
				return PrivatePaths.USER;
			default:
				return "";
		}
	};

	const fullLogout = useFullLogout();

	const handleLogout = () => {
		fullLogout();
	};

	const pathPrefix = getPathPrefix(userData?.role);

	const dropdownItems = [
		{
			name: "Dashboard",
			href: `${pathPrefix}dashboard`,
			current: true,
		},
		{name: "Profile", href: `${pathPrefix}profile`, current: false},
		{
			name: "Settings",
			href: `${pathPrefix}settings`,
			current: false,
		},

		...(userData?.role === "Instructor"
			? [
					{
						name: "Earnings",
						href: `${pathPrefix}earnings`,
						current: false,
					},
			  ]
			: []),

		{
			name: "Sign Out",
			href: "#",
			current: false,
			onClick: handleLogout,
		},
	];

	const getInitials = (firstName: string, lastName: string) => {
		const initials = `${firstName} ${lastName}`
			.trim()
			.replace(/\s+/, " ")
			.split(" ")
			.map(word => word[0])
			.join("");
		return initials.substring(0, 2).toUpperCase();
	};

	return (
		<nav
			className="relative top-0 left-0 right-0 z-50"
			// Add the "z-50" class to make sure the menu appears on top of other elements
		>
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<div className="flex items-center space-x-3 rtl:space-x-reverse"></div>
				<div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
					<button
						onClick={() => setOpen(!open)}
						type="button"
						className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
						id="user-menu-button"
						aria-expanded={open}
						aria-haspopup="true"
					>
						<span className="sr-only">Open user menu</span>
						{userData?.photo ? (
							<img
								className="w-8 h-8 rounded-full"
								src={userData?.photo}
								alt={userData?.firstName}
							/>
						) : (
							<div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
								{getInitials(userData?.firstName, userData?.lastName)}
							</div>
						)}
					</button>
					{open && (
						<div
							className="absolute -right-12 top-12 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 dark:divide-gray-600"
							id="user-dropdown"
						>
							<div className="px-4 py-3">
								<span className="block text-sm text-gray-900 dark:text-white">
									{user?.firstName} {userData?.lastName}
								</span>
								<span className="block text-sm text-gray-500 truncate dark:text-gray-400">
									{userData?.email}
								</span>
							</div>
							<ul className="py-2" aria-labelledby="userData-menu-button">
								{dropdownItems.slice(0, -1).map((item, index) => (
									<li key={index}>
										<Link
											to={item.href}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
										>
											{item.name}
										</Link>
									</li>
								))}
								<li className="border-t border-dashed mt-2 pt-2">
									<button
										className="block w-full items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
										onClick={dropdownItems[dropdownItems.length - 1].onClick}
										// to="#"
										// onClick={useFullLogout}
									>
										{dropdownItems[dropdownItems.length - 1].name}
									</button>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};
