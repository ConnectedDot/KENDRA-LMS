import React from "react";
import {MdError} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import Navbarin from "../../../../layout/Instructor/Navbar";

const Programs = () => {
	const navigate = useNavigate();

	return (
		<Navbarin title={"Admin's Mentorship Program | Kendra LMS"}>
			<>
				<main className="h-[80vh] grid place-items-center bg-white">
					<div className="mt-46 flex flex-col justify-center items-center text-center">
						<MdError
							style={{fontSize: "48px", color: "black", marginTop: "24px"}}
						/>
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
						<p className="px-32 mt-4 text-lg leading-7 text-gray-600">
							In addition to mentorship, our platform allows users to create and
							participate in a variety of events and webinars. These activities
							are designed to foster user learning and bridge the communication
							gap between tutors and tutees. Whether it's a live webinar on the
							latest industry trends, a workshop on new skills, or a networking
							event, there's something for everyone.
						</p>
						<p className="px-32 mt-4 text-lg leading-7 text-gray-600">
							Our events and webinars are meticulously planned to ensure that
							participants gain the most value. Admins can schedule events, send
							out invitations, and manage attendee lists with ease. Each event
							is an opportunity for users to expand their knowledge, interact
							with experts, and connect with peers.
						</p>
						<p className="px-32 mt-4 text-lg leading-7 text-gray-600">
							We also provide detailed documentation and resources to help users
							make the most of our platform. From how-to guides to best
							practices, our documentation covers everything you need to know to
							effectively use our tools and features. Whether you're a new user
							or an experienced admin, you'll find valuable information to
							enhance your experience.
						</p>
						<p className="px-32 mt-4 text-lg leading-7 text-gray-600">
							Join us in creating a vibrant learning community where knowledge
							is shared, skills are developed, and connections are made. Our
							goal is to provide a comprehensive platform that supports the
							growth and success of all our users. Stay tuned for more updates
							and new features that will continue to enhance your learning
							experience!
						</p>
					</div>
				</main>
			</>
		</Navbarin>
	);
};

export default Programs;
