import {SetStateAction, Suspense, useState} from "react";
import {Loader} from "../../components";
import {AdminLayoutProps} from "../../interface";
import {MdArrowDownward, MdShoppingCart} from "react-icons/md";
import {categories} from "./components/menu";
import Logo from "../../assets/Logo/kendra-re.png";

import {Link} from "react-router-dom";
import MobileNavigation from "./components/MobileNavigation";
import {CartDrawer} from "./components/Cartdrawer";

const HomeLayout: React.FC<AdminLayoutProps> = ({
	children,
}: AdminLayoutProps) => {
	const [activeCat, setActiveCat] = useState<{
		name: string;
		subcategories: {name: string; path: string}[];
	} | null>(null);
	const [open, setOpen] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	const handleMouseEnter = (
		category: SetStateAction<{
			name: string;
			subcategories: {name: string; path: string}[];
		} | null>
	) => {
		setActiveCat(category);
	};
	const cartCount = 5;

	const handleMouseLeave = () => {
		setActiveCat(null);
	};

	return (
		<div className="">
			<div className="bg-gray-200">
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<img
							className="h-24 w-24 rounded-full mr-6 hidden md:block"
							src={Logo}
							alt=""
						/>

						<div>
							<div className="block md:hidden">
								<MobileNavigation />
							</div>
							<div className="w-48 mt-14"></div>
						</div>

						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<Link
								to="/kendra-teachers"
								className="mr-6 flex-none text-gray-600 hover:text-black px-3.5 py-2.5 text-sm font-semibold outline-none border-none hidden lg:block"
							>
								Teach on Kendra
							</Link>

							<Link
								to="/create-account"
								className="mr-2 flex-none text-gray-600 hover:text-black px-3.5 py-2.5 text-sm font-semibold hidden md:block"
							>
								Get Started
							</Link>

							<Link
								to="/login"
								className="flex-none border-none text-gray-600 hover:text-black px-3.5 py-2.5 text-sm font-semibold hidden md:block"
							>
								Login
							</Link>
							{/* <div
                onClick={handleOpen}
                className="relative mr-2 flex-none text-black px-3.5 py-2.5 text-sm font-semibold outline-none border-none"
              >
                <div className="relative">
                  <MdShoppingCart style={{ fontSize: "20px" }} />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {cartCount}
                  </span>
                  <CartDrawer open={isOpen} setOpen={handleClose} />
                </div>
              </div> */}
						</div>
						{/* <CartDrawer /> */}
					</div>
				</div>
			</div>

			<div className="bg-gray-500 hidden md:block">
				<span className="flex items-center justify-center mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative" onMouseLeave={handleMouseLeave}>
						<div className="flex">
							{categories.map(category => (
								<div
									key={category.name}
									className="relative p-2 cursor-pointer"
									onMouseEnter={() => handleMouseEnter(category)}
									onMouseLeave={handleMouseLeave}
								>
									<span className="font-semibold text-gray-900">
										{category.name}
									</span>

									{activeCat?.name === category.name && (
										<div className="absolute items-center justify-start top-full mt-0 bg-black w-screen text-white p-2 z-10">
											{/* Flex layout for subcategories */}
											<div className="flex gap-x-4 w-screen">
												{activeCat.subcategories.map(subcategory => (
													<Link
														key={subcategory.name}
														to={subcategory.path}
														className="text-sm font-semibold px-3 py-2"
													>
														{subcategory.name}
													</Link>
												))}
											</div>
											{/* Arrow indicating the dropdown */}
											{/* <div
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0"
                        style={{
                          borderLeft: "5px solid transparent",
                          borderRight: "5px solid transparent",
                          borderBottom: "5px solid gray",
                        }}
                      /> */}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</span>
			</div>

			<div className="mt-10">
				<Suspense fallback={<Loader />}>{children}</Suspense>
			</div>
		</div>
	);
};

export default HomeLayout;
