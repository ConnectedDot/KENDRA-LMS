import {Disclosure} from "@headlessui/react";
// import Link from 'next/link';
import React, {useContext, useState} from "react";
import {Bars3Icon} from "@heroicons/react/24/outline";
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signdialog from "./Signdialog";
import Registerdialog from "./Registerdialog";
import {Link} from "react-router-dom";
import logo from "../../../assets/Logo/kendra-re.png";
import {AuthContext} from "../../../context";
import {AvatarMenu} from "./AvatarMenu";
import {FaSearch} from "react-icons/fa";

interface NavigationItem {
	name: string;
	href: string;
	current: boolean;
}

const navigation: NavigationItem[] = [
	{name: "Home", href: "#/", current: true},
	{name: "Courses", href: "#courses", current: false},
	{name: "Mentor", href: "#mentor", current: false},
	{name: "Group", href: "/", current: false},
	{name: "Testimonial", href: "#testimonial", current: false},
];

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
	const [searchQuery, setSearchQuery] = useState("");
	const {user} = useContext(AuthContext);
	console.log(user, "user in navbar");
	const [currentLink, setCurrentLink] = useState("/");

	const handleLinkClick = (href: string) => {
		setCurrentLink(href);
	};

	const handleSearch = () => {
		// Handle the search functionality here
		console.log("Searching for:", searchQuery);
	};

	return (
		<Disclosure as="nav" className="navbar bg-black text-white h-16">
			<>
				<div className="mx-auto max-w-7xl px-6 py-4 md:px-8">
					<div className="relative flex h-8 md:h-8 items-center justify-between">
						<div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
							{/* LOGO */}

							<div className="flex flex-shrink-0 items-center">
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
							</div>

							{/* LINKS */}

							<div className="hidden md:block m-auto ">
								<div className="flex space-x-0">
									{navigation.map(item => (
										<CustomLink
											key={item.name}
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
										className="border text-sm bg-black border-gray-400 rounded-full pl-4 pr-16 py-1"
										// placeholder="Search..."
									/>
									<FaSearch
										onClick={handleSearch}
										style={{fontSize: "14px"}}
										className="absolute right-3 cursor-pointer"
									/>
								</div>
							</div>
							<div className="flex">
								<AvatarMenu user={user} />
							</div>
						</div>

						{/* <Signdialog />

            <Registerdialog /> */}

						<div className="block md:hidden">
							<Bars3Icon
								className="block h-6 w-6"
								aria-hidden="true"
								onClick={() => setIsOpen(true)}
							/>
						</div>

						{/* DRAWER LINKS DATA */}

						<Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
							<Drawerdata />
						</Drawer>
					</div>
				</div>
			</>
		</Disclosure>
	);
};

export default Navbar;
