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
	// instructor: Instructor;
	InstructorBio: any;
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
							{coursedata.InstructorBio.firstName}{" "}
							{coursedata.InstructorBio.lastName}
						</h5>
					</div>
					<div className="flex-1">
						<label htmlFor="instructorEmail" className="text-xs font-bold mb-2">
							INSTRUCTOR EMAIL{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.InstructorBio.email || ""}
						</h5>
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-6 py-4">
					<div className="flex-1">
						<label htmlFor="instructorPhone" className="text-xs font-bold mb-2">
							INSTRUCTOR PHONE{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.InstructorBio.phone_number || ""}
						</h5>
					</div>
					<div className="flex-1">
						<label
							htmlFor="instructorStatus"
							className="text-xs font-bold mb-2"
						>
							INSTRUCTOR STATUS{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.InstructorBio.status === "Active" ? (
								<span className="bg-green-500 text-white px-2 py-1 rounded">
									{coursedata.InstructorBio.status}
								</span>
							) : coursedata.InstructorBio.status === "Pending" ? (
								<span className="bg-orange-500 text-white px-2 py-1 rounded">
									{coursedata.InstructorBio.status}
								</span>
							) : coursedata.InstructorBio.status === "Inactive" ? (
								<span className="bg-red-500 text-white px-2 py-1 rounded">
									{coursedata.InstructorBio.status}
								</span>
							) : (
								""
							)}
						</h5>
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-6 py-4">
					<div className="flex-1">
						<label
							htmlFor="instructorCertification"
							className="text-xs font-bold mb-2"
						>
							CERTIFICATION{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.InstructorBio.certification || ""}
						</h5>
					</div>
					<div className="flex-1">
						<label
							htmlFor="instructorWebsite"
							className="text-xs font-bold mb-2"
						>
							WEBSITE{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.InstructorBio.website || ""}
						</h5>
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-6 py-4">
					<div className="flex-1">
						<label
							htmlFor="instructorYoutube"
							className="text-xs font-bold mb-2"
						>
							YOUTUBE{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.InstructorBio.youtube || ""}
						</h5>
					</div>
					<div className="flex-1">
						<label
							htmlFor="instructorFacebook"
							className="text-xs font-bold mb-2"
						>
							FACEBOOK{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.InstructorBio.facebook || ""}
						</h5>
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-6 py-4">
					<div className="flex-1">
						<label
							htmlFor="instructorInstagram"
							className="text-xs font-bold mb-2"
						>
							INSTAGRAM{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.InstructorBio.instagram || ""}
						</h5>
					</div>
					<div className="flex-1">
						<label
							htmlFor="instructorTwitter"
							className="text-xs font-bold mb-2"
						>
							TWITTER{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.InstructorBio.twitter || ""}
						</h5>
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-6 py-4">
					<div className="flex-1">
						<label
							htmlFor="instructorLinkedin"
							className="text-xs font-bold mb-2"
						>
							LINKEDIN{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.InstructorBio.linkedin || ""}
						</h5>
					</div>
					<div className="flex-1">
						<label htmlFor="instructorRole" className="text-xs font-bold mb-2">
							ROLE{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.InstructorBio.role || ""}
						</h5>
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-6 py-4">
					<div className="flex flex-col">
						<img
							src={coursedata.InstructorBio.photo || ""}
							alt={`${coursedata.InstructorBio.firstName} ${coursedata.InstructorBio.lastName}`}
							className="w-32 h-32 object-cover rounded-full"
						/>
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-6 py-4">
					<div className="flex flex-col">
						<label htmlFor="instructorBio" className="text-xs font-bold mb-2">
							INSTRUCTOR BIO{" "}
						</label>
						<h5 className="text-lg font-medium text-accent-500">
							{coursedata.InstructorBio.bio || ""}
						</h5>
					</div>
				</div>
			</div>
		</>
	);
};

export default Informationtabs;
