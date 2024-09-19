import React, {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";
import {
	EditorProvider,
	Editor,
	Toolbar,
	BtnBold,
	BtnItalic,
	BtnUnderline,
	BtnBulletList,
	BtnNumberedList,
	BtnLink,
	BtnStrikeThrough,
	BtnClearFormatting,
	BtnRedo,
	BtnUndo,
	ContentEditableEvent,
	BtnStyles,
	HtmlButton,
	Separator,
} from "react-simple-wysiwyg";

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

	const handleEditorChange = (name: string, content: string) => {
		setLocalFormData(prevData => ({
			...prevData,
			[name]: content,
		}));
		onUpdateData({
			...localFormData,
			[name]: content,
		});
	};

	return (
		<div className="mb-14 px-4">
			<h2 className="mb-2 mt-0 font-bold text-xl md:text-xl">
				Content Information
			</h2>

			<div className="flex flex-col gap-4 mt-10">
				<label htmlFor="fullbrief" className="sr-only">
					Full Brief
				</label>

				<div className="w-full">
					<EditorProvider>
						<Editor
							value={formData.Fullbrief}
							onChange={(event: ContentEditableEvent) =>
								handleEditorChange("Fullbrief", event.target.value)
							}
							className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-10 md:h-64 lg:h-[300px]"
						>
							<Toolbar>
								<BtnBold />
								<BtnItalic />
								<BtnUnderline />
								<BtnStrikeThrough />
								<BtnBulletList />
								<BtnNumberedList />
								<BtnLink />
								<BtnClearFormatting />
								<BtnStyles />
								<HtmlButton />
								<Separator />
								<BtnUndo />
								<BtnRedo />
							</Toolbar>
						</Editor>
					</EditorProvider>
				</div>
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

			<div className="p-6 bg-gray-200 rounded-3xl">
				<h2 className="text-sm font-semibold mb-4">Disclaimer</h2>
				<div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-[18px]">
					<p className="text-gray-600 flex-1 mb-4 md:mb-0 text-xs">
						Please note that all courses must undergo a verification process
						before they can be approved. Once you have completed the
						verification, your courses will also need to be approved by an admin
						before being published. This process is designed to ensure the
						highest quality of content for our learners. Rest assured, we strive
						to make this process as quick and efficient as possible to better
						serve you.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ContentTab;
