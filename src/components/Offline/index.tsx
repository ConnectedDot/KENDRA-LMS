import React from "react";
import Logo from "../../assets/Logo/3-re.png";

export function OfflinePageUpdate() {
	return (
		<>
			<div className="flex-col fixed inset-0 h-screen flex items-center justify-center z-50 bg-gray-900 py-10 sm:py-20 lg:py-10">
				<div>
					<img src={Logo} alt="logo" className="w-32" />
				</div>

				<div className="text-center">
					<h2 className="text-3xl font-semibold text-white">
						You are offlines
					</h2>
					<p className="text-white mt-4">
						Please check your internet connection and try again
					</p>
				</div>
			</div>
		</>
	);
}
