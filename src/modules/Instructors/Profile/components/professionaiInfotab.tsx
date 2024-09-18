import React, {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";

interface ProfessionalInfoTabProps {
	formData: {
		expertise: string;
		certification: string | null;
		status: "Pending" | "Active" | "Inactive";
		total_students: number;
		total_courses: any[];
		total_reviews: any[];
		skill_level: any[];
	};
	onUpdateData: (data: any) => void;
}

const ProfessionalInfoTab: React.FC<ProfessionalInfoTabProps> = ({
	formData,
	onUpdateData,
}) => {
	const [localFormData, setLocalFormData] = useState(formData);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const {name, value} = e.target;
		setLocalFormData(prevData => ({...prevData, [name]: value}));
		onUpdateData({[name]: value});
	};

	const handleArrayChange = (
		field: "total_courses" | "total_reviews" | "skill_level",
		value: string
	) => {
		setLocalFormData(prevData => {
			const updatedArray = value.split(",").map(item => item.trim());
			const updatedFormData = {...prevData, [field]: updatedArray};
			onUpdateData({[field]: updatedArray});
			return updatedFormData;
		});
	};

	useEffect(() => {
		setLocalFormData(formData);
	}, [formData]);

	return (
		<div className="mb-14 px-4">
			<h2 className="mb-2 mt-0 font-bold text-xl md:text-xl">
				Professional Information
			</h2>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="expertise" className="sr-only">
					Expertise
				</label>
				<TextArea
					id="expertise"
					name="expertise"
					rows={4}
					value={localFormData.expertise}
					onChange={handleInputChange}
					className="w-full focus:outline-none border py-1 appearance-none bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					placeholder="Expertise"
				/>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="certification" className="sr-only">
					Certification
				</label>
				<input
					id="certification"
					name="certification"
					value={localFormData.certification || ""}
					onChange={handleInputChange}
					className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					placeholder="Certification"
				/>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="status" className="sr-only">
					Status
				</label>
				<input
					id="status"
					name="status"
					readOnly
					value={localFormData.status}
					// onChange={handleInputChange}
					className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
				>
					{/* <option value="Pending">Pending</option>
					<option value="Active">Active</option>
					<option value="Inactive">Inactive</option> */}
				</input>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="total_students" className="sr-only">
					Total Students
				</label>
				<input
					id="total_students"
					name="total_students"
					type="number"
					value={localFormData.total_students}
					onChange={handleInputChange}
					className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					placeholder="Total Students"
				/>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="total_courses" className="sr-only">
					Total Courses
				</label>
				<TextArea
					id="total_courses"
					name="total_courses"
					rows={4}
					value={localFormData?.total_courses?.join(", ") || ""}
					onChange={e => handleArrayChange("total_courses", e.target.value)}
					className="w-full focus:outline-none border py-1 appearance-none bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					placeholder="Total Courses (comma separated)"
				/>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="total_reviews" className="sr-only">
					Total Reviews
				</label>
				<TextArea
					id="total_reviews"
					name="total_reviews"
					rows={4}
					value={localFormData?.total_reviews?.join(", ") || ""}
					onChange={e => handleArrayChange("total_reviews", e.target.value)}
					className="w-full focus:outline-none border py-1 appearance-none bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					placeholder="Total Reviews (comma separated)"
				/>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="skill_level" className="sr-only">
					Skill Level
				</label>
				<TextArea
					id="skill_level"
					name="skill_level"
					rows={4}
					value={localFormData?.skill_level?.join(", ") || ""}
					onChange={e => handleArrayChange("skill_level", e.target.value)}
					className="w-full focus:outline-none border py-1 appearance-none bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					placeholder="Skill Level (comma separated)"
				/>
			</div>
		</div>
	);
};

export default ProfessionalInfoTab;
