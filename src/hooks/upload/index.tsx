import {useState} from "react";
import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	uploadBytes,
} from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";
import {db, storage} from "../../Firebase";
import {message} from "antd";

const useCourseForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState({});
	const [uploadPercentage, setUploadPercentage] = useState({});

	const handleSubmit = async (formData: any) => {
		setIsLoading(true);

		if (isSubmitting) return;
		setIsSubmitting(true);

		const courseId = `course_${Date.now()}`;
		const videosData = [];

		let photoURL = "";
		if (formData.image) {
			const photoRef = ref(storage, `photos/${courseId}`);
			await uploadBytes(photoRef, formData.image);
			photoURL = await getDownloadURL(photoRef);
		}

		try {
			// Upload videos and track progress
			for (const video of formData.Videos) {
				const videoRef = ref(
					storage,
					`courses/${courseId}/videos/${video.title}`
				);
				const uploadTask = uploadBytesResumable(videoRef, video.file);

				uploadTask.on("state_changed", snapshot => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setUploadPercentage(progress);
					setUploadProgress(prevProgress => ({
						...prevProgress,
						[video.title]: progress,
					}));
				});

				// Wait for video to finish uploading
				await uploadTask.then();

				const downloadUrl = await getDownloadURL(videoRef);

				// Push video data with download URL to videosData array
				videosData.push({
					...video,
					youtubeId: downloadUrl,
					playtime: "00:00", // Default playtime
					watched: false,
				});
			}

			// Prepare final course data
			const courseData = {
				...formData,
				image: photoURL,
				Videos: videosData, // Replace local video paths with Firebase URLs
				id: courseId,
			};

			// Store course data in Firestore
			await setDoc(doc(db, "courses", courseId), courseData);

			console.log("Course added successfully!");
			// Reset form data after submission
			resetForm();
			message.success("Course added successfully!");
		} catch (error) {
			console.error("Error adding course:", error);
			message.error("Error uploading videos or adding course.");
		} finally {
			setIsSubmitting(false);
			setIsLoading(false);
		}
	};

	const resetForm = () => {
		// Reset form logic
	};

	return {
		handleSubmit,
		isLoading,
		uploadProgress,
		uploadPercentage,
	};
};

export default useCourseForm;
