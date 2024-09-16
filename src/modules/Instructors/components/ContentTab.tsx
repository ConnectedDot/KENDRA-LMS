import React, {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";

interface ContentTabProps {
	formData: {
		Fullbrief: string;
		Questions: {question: string; answer: string}[];
		Content: {Title: string; Lectures: string[]}[];
	};
	onUpdateData: (data: any) => void;
}

const ContentTab: React.FC<ContentTabProps> = ({formData, onUpdateData}) => {
	const [localFormData, setLocalFormData] = useState(formData);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const {name, value} = e.target;
		setLocalFormData(prevData => ({...prevData, [name]: value}));
		onUpdateData({[name]: value});
	};

	// const handleQuestionChange = (
	// 	index: number,
	// 	field: "question" | "answer",
	// 	value: string
	// ) => {
	// 	setLocalFormData(prevData => {
	// 		const updatedQuestions = [...prevData.Questions];
	// 		updatedQuestions[index][field] = value;
	// 		const updatedFormData = {...prevData, Questions: updatedQuestions};
	// 		onUpdateData({Questions: updatedQuestions});
	// 		return updatedFormData;
	// 	});
	// };

	const handleQuestionChange = (
		index: number,
		field: "question" | "answer",
		value: string
	) => {
		setLocalFormData(prevData => {
			const updatedQuestions = [...prevData.Questions];
			updatedQuestions[index][field] = value;
			return {...prevData, Questions: updatedQuestions};
		});
	};

	useEffect(() => {
		onUpdateData({Questions: localFormData.Questions});
	}, [localFormData.Questions]);

	useEffect(() => {
		setLocalFormData(formData);
	}, [formData]);

	return (
		<div className="mb-14 px-4">
			<h2 className="mb-2 mt-0 font-bold text-xl md:text-xl">
				Content Information
			</h2>

			<div className="flex flex-col gap-4 mt-4">
				<label htmlFor="fullbrief" className="sr-only">
					Full Brief
				</label>
				<TextArea
					id="fullbrief"
					name="Fullbrief"
					rows={6}
					value={localFormData.Fullbrief}
					onChange={handleInputChange}
					className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
					placeholder="Full Brief of the course"
				/>
			</div>

			{[0, 1].map(index => (
				<div className="flex flex-col md:flex-row gap-6 py-4" key={index}>
					<div className="flex-1">
						<label htmlFor={`question${index}`} className="sr-only">
							Question {index + 1}
						</label>
						<input
							id={`question${index}`}
							name={`question${index}`}
							value={localFormData.Questions[index].question}
							onChange={e =>
								handleQuestionChange(index, "question", e.target.value)
							}
							className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
							placeholder={`Question ${index + 1}`}
						/>
					</div>
					<div className="flex-1">
						<label htmlFor={`answer${index}`} className="sr-only">
							Answer {index + 1}
						</label>
						<input
							id={`answer${index}`}
							name={`answer${index}`}
							value={localFormData.Questions[index].answer}
							onChange={e =>
								handleQuestionChange(index, "answer", e.target.value)
							}
							className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
							placeholder={`Answer ${index + 1}`}
						/>
					</div>
				</div>
			))}

			{/* {[0, 1].map(index => (
				<div className="flex flex-col md:flex-row gap-6 py-4" key={index}>
					<div className="flex-1">
						<label htmlFor={`sectionTitle${index}`} className="sr-only">
							Section Title {index + 1}
						</label>
						<input
							id={`sectionTitle${index}`}
							name={`sectionTitle${index}`}
							value={localFormData.Content[index].Title}
							onChange={e =>
								handleContentChange(index, "Title", e.target.value)
							}
							className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
							placeholder={`Section Title ${index + 1}`}
						/>
					</div>
					<div className="flex-1">
						<label htmlFor={`lectures${index}`} className="sr-only">
							Lectures {index + 1}
						</label>
						<input
							id={`lectures${index}`}
							name={`lectures${index}`}
							value={localFormData.Content[index].Lectures.join(", ")}
							onChange={e =>
								handleContentChange(index, "Lectures", e.target.value)
							}
							className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
							placeholder={`Lectures (comma separated) ${index + 1}`}
						/>
					</div>
				</div>
			))} */}
		</div>
	);
};

export default ContentTab;
