import {SetStateAction, Suspense, useState} from "react";
import {Loader} from "../../components";
import {AdminLayoutProps} from "../../interface";
import {categories} from "./components/menu";
import Logo from "../../assets/Logo/kendra-re.png";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import MobileNavigation from "./components/mobilenavigation";
import Footer from "../../components/Footer";

interface NavbarinProps {
	title: string;
	children: React.ReactNode;
}

const HomeLayout: React.FC<NavbarinProps> = ({
	children,
	title,
}: NavbarinProps) => {
	const [activeCat, setActiveCat] = useState<{
		name: string;
		subcategories: {name: string}[];
	} | null>(null);

	const handleMouseEnter = (
		category: SetStateAction<{
			name: string;
			subcategories: {name: string}[];
		} | null>
	) => {
		setActiveCat(category);
	};

	const handleMouseLeave = () => {
		setActiveCat(null);
	};

	return (
		<>
			<Helmet>
				<title>{title || ""}</title>
			</Helmet>
			<div className="">
				<div className="bg-gray-200">
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<Link to="/">
								<img
									className="h-24 w-24 rounded-full mr-6"
									src={Logo}
									alt=""
								/>
							</Link>

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
							</div>
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
												<div className="flex gap-x-4 w-screen">
													{activeCat.subcategories.map(subcategory => (
														<Link
															key={subcategory.name}
															to={`/course/${category.name.replace(
																/\s+/g,
																"-"
															)}/${subcategory.name.replace(/\s+/g, "-")}`}
															className="text-sm font-semibold px-3 py-2"
														>
															{subcategory.name}
														</Link>
													))}
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</span>
				</div>
				<div className="flex flex-col min-h-screen">
					<div className="mt-4 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<Suspense fallback={<Loader />}>{children}</Suspense>
					</div>
					<div className="mt-auto">
						<Footer />
					</div>
				</div>
			</div>
		</>
	);
};

export default HomeLayout;
