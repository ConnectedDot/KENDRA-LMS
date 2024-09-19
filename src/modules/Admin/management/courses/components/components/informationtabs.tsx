import React from "react";
import {useNavigate} from "react-router-dom";
// import {Course} from "../../../../../../interface";

interface Instructor {
	firstName: string;
	lastName: string;
	bio: string;
	email: string;
	phone_number: string;
}

interface Course {
	Title: string;
	Description: string;
	instructor: Instructor;
}

interface InformationtabsProps {
	coursedata: Course;
}

const Informationtabs: React.FC<InformationtabsProps> = ({coursedata}) => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<>
			<div className="mb-14 px-4">
				<h2 className=" mb-2 mt-0 font-bold text-xl md:text-xl">
					About Instructor
				</h2>

				<div className="flex flex-col md:flex-row gap-6 py-4">
					<div className="flex-1">
						<label htmlFor="instructorName" className="text-xs font-bold mb-2">
							INSTRUCTOR NAME{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.instructor.firstName} {coursedata.instructor.lastName}
						</h5>
					</div>
					<div className="flex-1">
						<label htmlFor="instructorBio" className="text-xs font-bold mb-2">
							INSTRUCTOR BIO{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.instructor.bio}
						</h5>
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-6 py-4">
					<div className="flex-1">
						<label htmlFor="instructorEmail" className="text-xs font-bold mb-2">
							INSTRUCTOR EMAIL{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.instructor.email}
						</h5>
					</div>
					<div className="flex-1">
						<label htmlFor="instructorPhone" className="text-xs font-bold mb-2">
							INSTRUCTOR PHONE{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.instructor.phone_number}
						</h5>
					</div>
				</div>
			</div>{" "}
		</>
	);
};

export default Informationtabs;
