import React from "react";
import Navbarin from "../../../layout/Instructor/Navbar";
import {MdError} from "react-icons/md";
import {useNavigate} from "react-router-dom";

const ReportingPage = () => {
	const navigate = useNavigate();

	return (
		<Navbarin title={"Admin's Report Page | Kendra LMS"}>
			<>
				<main className="h-[80vh] grid place-items-center bg-white">
					<div className="flex flex-col justify-center items-center text-center">
						<MdError style={{fontSize: "48px", color: "black"}} />
						<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
							Reporting Page
						</h1>
						<p className="px-32 mt-6 text-lg leading-7 text-gray-600">
							On this page, admins will be able to generate and view various
							reports related to user activities, course progress, and overall
							system performance. Stay tuned for this upcoming feature!
						</p>
					</div>
				</main>
			</>
		</Navbarin>
	);
};

export default ReportingPage;
