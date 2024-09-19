"use client";
import Navbar from "./navbar";
import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import Footer from "../../../components/Footer";

interface NavbarinProps {
	title: string;
	children: React.ReactNode;
	showFooter?: boolean;
}

const Navbarin: React.FC<NavbarinProps> = ({
	title,
	children,
	showFooter = true,
}) => {
	useEffect(() => {
		const debounce = (fn: Function) => {
			let frame: number;

			return (...params: any[]) => {
				if (frame) {
					cancelAnimationFrame(frame);
				}

				frame = requestAnimationFrame(() => {
					fn(...params);
				});
			};
		};

		const storeScroll = () => {
			document.documentElement.dataset.scroll = window.scrollY.toString();
		};

		document.addEventListener("scroll", debounce(storeScroll), {passive: true});

		storeScroll();
	}, []);

	return (
		<>
			<Helmet>
				<title>{title || ""}</title>
			</Helmet>
			<Navbar />

			<div className="flex flex-col min-h-screen">
				<div className="flex-grow mx-auto max-w-7xl md:px-8 px-2 sm:px-6 lg:px-8">
					{children}
				</div>

				{showFooter && (
					<div className="mt-auto">
						<Footer />
					</div>
				)}
			</div>
		</>
	);
};

export default Navbarin;

// <div className="flex flex-col min-h-screen">
// <div className="flex-grow mx-auto max-w-7xl md:px-8 px-2 sm:px-6 lg:px-8">
// 	{children}
// </div>

// {showFooter && (
// 	<div className="mt-24">
// 		<Footer />
// 	</div>
// )}
// </div>
