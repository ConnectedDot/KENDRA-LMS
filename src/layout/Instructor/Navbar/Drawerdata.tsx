import React from "react";
import {Link} from "react-router-dom";

interface NavigationItem {
	name: string;
	href: string;
	current: boolean;
}

interface DrawerdataProps {
	navigation: NavigationItem[];
	handleLinkClick: (href: string) => void;
	currentLink: string;
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

const Drawerdata: React.FC<DrawerdataProps> = ({
	navigation,
	handleLinkClick,
	currentLink,
}) => {
	return (
		<div className="rounded-md max-w-sm w-full mx-auto ">
			<div className="flex-1 space-y-4 py-1">
				<div className="sm:block">
					<div className="space-y-1 px-5 pt-2 pb-3 w-full">
						{navigation.map(item => (
							<Link
								key={item.name}
								to={item.href}
								onClick={() => handleLinkClick(item.href)}
								className={classNames(
									item.href === currentLink
										? "text-black hover:opacity-100"
										: "hover:text-black hover:opacity-100",
									"text-gray-500 py-1 text-lg font-normal opacity-75 block"
								)}
								aria-current={item.current ? "page" : undefined}
							>
								{item.name}
							</Link>
						))}
						<div className="mt-4"></div>
						{/* <button className="bg-white w-full text-Blueviolet border border-semiblueviolet font-medium py-2 px-4 rounded">
              Log In
            </button>
            <button className="bg-semiblueviolet w-full hover:bg-Blueviolet hover:text-white text-Blueviolet font-medium my-2 py-2 px-4 rounded">
              Sign up
            </button> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Drawerdata;
