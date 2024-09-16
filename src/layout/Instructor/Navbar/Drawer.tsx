import React, {ReactNode} from "react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import logo from "../../../assets/Logo/kendra-re.png";
import {Link} from "react-router-dom";

interface DrawerProps {
	children: ReactNode;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const Drawer = ({children, isOpen, setIsOpen}: DrawerProps) => {
	return (
		<main
			className={
				" fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
				(isOpen
					? " transition-opacity opacity-100 duration-500 translate-x-0  "
					: " transition-all delay-500 opacity-0 -translate-x-full  ")
			}
		>
			<section
				className={
					"w-540px max-w-2xl left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
					(isOpen ? "translate-x-0" : "-translate-x-full")
				}
			>
				<article className="relative ml-6 w-[200px] max-w-2xl pb-10 flex flex-col space-y-6 h-full">
					<header className="p-4 flex items-center justify-between">
						<>
							<Link to="">
								<img className="h-24 w-24 rounded-full" src={logo} alt="Logo" />
							</Link>
							<XMarkIcon
								className="block h-6 w-6"
								onClick={() => {
									setIsOpen(false);
								}}
							/>
						</>
					</header>
					<div
						onClick={() => {
							setIsOpen(false);
						}}
					>
						{children}
					</div>
				</article>
			</section>
			<section
				className=" w-screen h-full cursor-pointer "
				onClick={() => {
					setIsOpen(false);
				}}
			></section>
		</main>
	);
};

export default Drawer;
