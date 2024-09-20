import React, {useEffect, useState} from "react";

interface ContactInfoTabProps {
	formData: {
		phone_number: string;
		website: string;
		twitter: string;
		linkedin: string;
		facebook: string;
		instagram: string;
		youtube: string;
	};
	onUpdateData: (data: any) => void;
}

const ContactInfoTab: React.FC<ContactInfoTabProps> = ({
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

	useEffect(() => {
		setLocalFormData(formData);
	}, [formData]);

	return (
		<div className="mb-14 px-4">
			<h2 className="mb-2 mt-0 font-bold text-xl md:text-xl">
				Contact Information
			</h2>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="phone_number" className="sr-only">
					Phone Number
				</label>
				<input
					id="phone_number"
					name="phone_number"
					value={localFormData.phone_number}
					onChange={handleInputChange}
					className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					placeholder="Phone Number"
				/>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="website" className="sr-only">
					Website
				</label>
				<input
					id="website"
					name="website"
					value={localFormData.website}
					onChange={handleInputChange}
					className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					placeholder="Website"
				/>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="twitter" className="sr-only">
					Twitter
				</label>
				<input
					id="twitter"
					name="twitter"
					value={localFormData.twitter}
					onChange={handleInputChange}
					className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					placeholder="Twitter"
				/>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="linkedin" className="sr-only">
					LinkedIn
				</label>
				<input
					id="linkedin"
					name="linkedin"
					value={localFormData.linkedin}
					onChange={handleInputChange}
					className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					placeholder="LinkedIn"
				/>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="facebook" className="sr-only">
					Facebook
				</label>
				<input
					id="facebook"
					name="facebook"
					value={localFormData.facebook}
					onChange={handleInputChange}
					className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					placeholder="Facebook"
				/>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="instagram" className="sr-only">
					Instagram
				</label>
				<input
					id="instagram"
					name="instagram"
					value={localFormData.instagram}
					onChange={handleInputChange}
					className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					placeholder="Instagram"
				/>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="youtube" className="sr-only">
					YouTube
				</label>
				<input
					id="youtube"
					name="youtube"
					value={localFormData.youtube}
					onChange={handleInputChange}
					className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					placeholder="YouTube"
				/>
			</div>
			<div className="text-transparent">
				<p>
					This is a profile page for the user. save the user's information and
					display it here. The user can also update their information here.
				</p>
			</div>
		</div>
	);
};

export default ContactInfoTab;
