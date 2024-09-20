import {Disclosure} from "@headlessui/react";
// import Link from 'next/link';
import React, {useContext, useEffect, useState} from "react";
import {Bars3Icon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import logo from "../../../assets/Logo/kendra-re.png";
import {AuthContext} from "../../../context";
import {FaSearch} from "react-icons/fa";
import {PrivatePaths} from "../../../routes/path";
import {CartDrawer} from "../../Home/components/cartdrawer";
import {MdShoppingCart} from "react-icons/md";
import Drawer from "./drawer";
import {AvatarMenu} from "./avatarmenu";
import Drawerdata from "./drawerdata";

interface NavigationItem {
	name: string;
	href: string;
	current: boolean;
	key?: string;
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

const CustomLink = ({
	href,
	onClick,
	children,
}: {
	href: string;
	onClick: () => void;
	children: React.ReactNode;
}) => {
	return (
		<Link to={href}>
			<span onClick={onClick} className="px-3 py-4 text-lg font-normal">
				{children}
			</span>
		</Link>
	);
};

const Navbar = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const {user} = useContext(AuthContext);
	const [userData, setUserData] = useState<typeof user | null>(null);

	useEffect(() => {
		if (user) {
			setUserData(user);
		}
	}, [user]);

	const [currentLink, setCurrentLink] = useState("/");
	const cartCount = userData?.cart || 0;

	const handleLinkClick = (href: string) => {
		setCurrentLink(href);
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSearch = () => {};

	const adminNavigation: NavigationItem[] = [
		{
			name: "Dashboard",
			href: `${PrivatePaths.ADMIN}dashboard`,
			current: false,
			key: "dashbaord",
		},
		{
			name: "Manage Courses",
			href: `${PrivatePaths.ADMIN}courses-view`,
			current: false,
			key: "manage-courses",
		},
		// {
		// 	name: "Admin Panel",
		// 	href: `${PrivatePaths.ADMIN}admin-panel`,
		// 	current: false,
		// 	key: "admin-panel",
		// },
		{
			name: "User Management",
			href: `${PrivatePaths.ADMIN}user-management`,
			current: false,
			key: "user-management",
		},
		{
			name: "Reports",
			href: `${PrivatePaths.ADMIN}reports`,
			current: false,
			key: "reports",
		},
		{
			name: "Mentor",
			href: `${PrivatePaths.ADMIN}mentorships`,
			current: false,
			key: "mentor",
		},
		{
			name: "Programs",
			href: `${PrivatePaths.ADMIN}programs-view`,
			current: false,
			key: "programs",
		},
	];

	const instructorNavigation: NavigationItem[] = [
		{
			name: "Dashboard",
			href: `${PrivatePaths.INSTRUCTOR}dashbaord`,
			current: false,
			key: "dashboard",
		},
		{
			name: "My Courses",
			href: `${PrivatePaths.INSTRUCTOR}courses-view`,
			current: false,
			key: "my-courses",
		},
		{
			name: "Mentorship",
			href: `${PrivatePaths.INSTRUCTOR}mentorships`,
			current: false,
			key: "mentor",
		},
		// {
		// 	name: "Groups",
		// 	href: `${PrivatePaths.INSTRUCTOR}groups`,
		// 	current: false,
		// 	key: "groups",
		// },
		{
			name: "Programs",
			href: `${PrivatePaths.INSTRUCTOR}programs-view`,
			current: false,
			key: "programs",
		},
		{
			name: "Assignments",
			href: `${PrivatePaths.INSTRUCTOR}assignments`,
			current: false,
			key: "assignments",
		},
		{
			name: "Messages",
			href: `${PrivatePaths.INSTRUCTOR}messages`,
			current: false,
			key: "messages",
		},
	];

	const userNavigation: NavigationItem[] = [
		{
			name: "Dashboard",
			href: `${PrivatePaths.USER}dashboard`,
			current: false,
			key: "dashbaord",
		},
		{
			name: "Learning Path",
			href: `${PrivatePaths.USER}courses-enrolled`,
			current: false,
			key: "learning-path",
		},
		// {
		// 	name: "Community",
		// 	href: `${PrivatePaths.USER}community`,
		// 	current: false,
		// 	key: "community",
		// },
		{
			name: "Progress",
			href: `${PrivatePaths.USER}progress`,
			current: false,
			key: "progress",
		},
		{
			name: "Assignments",
			href: `${PrivatePaths.USER}assignments`,
			current: false,
			key: "assignments",
		},
		{
			name: "Messages",
			href: `${PrivatePaths.USER}messages`,
			current: false,
			key: "messages",
		},
		{
			name: "Certificates",
			href: `${PrivatePaths.USER}certificates`,
			current: false,
			key: "certificates",
		},
	];

	let navigation: NavigationItem[] = [];

	if (userData?.role === "Admin") {
		navigation = adminNavigation;
	} else if (userData?.role === "Instructor") {
		navigation = instructorNavigation;
	} else if (userData?.role === "User") {
		navigation = userNavigation;
	}

	let disclosureClassName = "navbar bg-white text-black h-16"; // default
	if (userData?.role === "Admin") {
		disclosureClassName = "navbar bg-white dark:bg-black text-white h-16";
	} else if (userData?.role === "Instructor") {
		disclosureClassName = "navbar bg-white dark:bg-yellow-900 text-white h-16";
	} else if (userData?.role === "User") {
		disclosureClassName = "navbar bg-white dark:bg-green-900 text-white h-16";
	}

	return (
		<Disclosure as="nav" className={disclosureClassName}>
			<>
				<div className="mx-auto max-w-7xl px-6 py-4 md:px-8">
					<div className="relative flex h-8 md:h-8 items-center justify-between">
						<div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
							{/* LOGO */}

							<Link
								to={
									userData?.role === "Admin"
										? `${PrivatePaths.ADMIN}dashboard`
										: userData?.role === "Instructor"
										? `${PrivatePaths.INSTRUCTOR}dashboard`
										: `${PrivatePaths.USER}dashboard`
								}
								className="flex flex-shrink-0 items-center"
							>
								<img
									className="block h-16 w-16 md:hidden"
									src={logo}
									alt="logo"
								/>
								<img
									className="hidden h-16 w-16 md:block"
									src={logo}
									alt="logo"
								/>
							</Link>

							{/* LINKS */}

							<div className="hidden md:block m-auto ">
								<div className="flex space-x-0">
									{navigation.map(item => (
										<CustomLink
											key={item.key}
											href={item.href}
											onClick={() => handleLinkClick(item.href)}
										>
											<span
												className={classNames(
													item.href === currentLink
														? "underline-links"
														: "text-slategray",
													"px-1 py-4 text-lg font-normal opacity-75 hover:opacity-100"
												)}
												aria-current={item.href ? "page" : undefined}
											>
												{item.name}
											</span>
										</CustomLink>
									))}
								</div>
							</div>
						</div>

						<div className="flex gap-x-3 items-center">
							<div className="flex items-center">
								<div className="relative flex items-center">
									<input
										type="text"
										value={searchQuery}
										onChange={e => setSearchQuery(e.target.value)}
										className="border w-44 md:w-[70px] text-sm text-gray-500 border-gray-400 rounded-full pl-4 pr-12 md:pr-16 py-1 outline-none"
										// placeholder="Search..."
									/>
									<FaSearch
										onClick={handleSearch}
										style={{fontSize: "14px"}}
										className="absolute right-3 cursor-pointer text-gray-500"
									/>
								</div>
							</div>
							<div className="flex relative">
								<AvatarMenu
								// userData={userData}
								/>
							</div>

							{userData?.role === "User" && (
								<div onClick={handleOpen} className="flex relative">
									<MdShoppingCart style={{fontSize: "20px"}} />
									<span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
										{cartCount}
									</span>
									{/* <CartDrawer /> */}
									<CartDrawer open={open} setOpen={handleClose} />
								</div>
							)}
						</div>

						<div className="block md:hidden">
							<Bars3Icon
								className="block h-6 w-6"
								aria-hidden="true"
								onClick={() => setIsOpen(true)}
							/>
						</div>

						<Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
							<Drawerdata
								navigation={navigation}
								handleLinkClick={handleLinkClick}
								currentLink={currentLink}
							/>
						</Drawer>
					</div>
				</div>
			</>
		</Disclosure>
	);
};

export default Navbar;
