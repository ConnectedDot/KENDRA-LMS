import React from "react";

// const OfflinePage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

export function OfflinePage() {
	return (
		<>
			{/* <div className=" bg-gray-800 bg-opacity-75 flex items-center justify-center "> */}

			<div className="fixed inset-0 h-screen flex items-center justify-center z-50 bg-gray-900 py-10 sm:py-20 lg:py-10">
				<div className="text-center">
					<h2 className="text-3xl font-semibold text-white">You are offline</h2>
					<p className="text-white mt-4">
						Please check your internet connection and try again
					</p>
					{/* <button
            onClick={handleBackClick}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Go Back
          </button> */}
				</div>
			</div>
		</>
	);
}
