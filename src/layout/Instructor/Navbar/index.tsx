"use client";
import Navbar from "./Navbar";
import React, {useEffect} from "react";

const Navbarin: React.FC<{children: any}> = ({children}) => {
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
			<Navbar />
			<div className=" mx-auto max-w-7xl py-4 md:px-8 px-2 sm:px-6 lg:px-8 mt-4">
				{children}
			</div>
		</>
	);
};

export default Navbarin;
