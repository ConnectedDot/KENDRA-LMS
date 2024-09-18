"use client";
import Navbar from "./navbar";
import React, {useEffect} from "react";
import {Helmet} from "react-helmet";

interface NavbarinProps {
	title: string;
	children: React.ReactNode;
}

const Navbarin: React.FC<NavbarinProps> = ({title, children}) => {
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

			<div className="mx-auto max-w-7xl md:px-8 px-2 sm:px-6 lg:px-8">
				{children}
			</div>
		</>
	);
};

export default Navbarin;
