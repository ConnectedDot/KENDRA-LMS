import React from "react";
import Navbarin from "../../../layout/Instructor/Navbar";
import {MdError} from "react-icons/md";
import {useNavigate} from "react-router-dom";

const MentorshipProgram = () => {
	const navigate = useNavigate();

	return (
		<Navbarin title={"Admin's Mentorship Program | Kendra LMS"}>
			<>
				<main className="h-[80vh] grid place-items-center bg-white">
					<div className="flex flex-col justify-center items-center text-center">
						<MdError style={{fontSize: "48px", color: "black"}} />
						<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
							Mentorship Program
						</h1>
						<p className="px-32 mt-6 text-lg leading-7 text-gray-600">
							Welcome to the Admin's Mentorship Program page! Here, admins can
							create, manage, and monitor mentorship plans to foster growth and
							development among users. Our program aims to connect experienced
							mentors with mentees seeking guidance in their learning journey.
						</p>
						<p className="px-32 mt-4 text-lg leading-7 text-gray-600">
							Admins can assign mentors, track progress, and ensure that both
							mentors and mentees are achieving their goals. Stay tuned for more
							features that will help streamline and enhance the mentorship
							experience!
						</p>
					</div>
				</main>
			</>
		</Navbarin>
	);
};

export default MentorshipProgram;
