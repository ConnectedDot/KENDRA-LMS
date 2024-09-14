import {useState} from "react";
import {useMutation, MutationFunction} from "react-query";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {message} from "antd";
import {db} from "../../Firebase";

interface Video {
	id: number;
	title: string;
	youtubeId: string;
	thumbnailUrl: string;
	playtime: string;
	watched: boolean;
}

interface UpdateData {
	userId: string;
	updatedData: {
		Content: {Title: string; Lectures: string[]}[];
		Videos: Video[];
	};
}

const uploadVideos = async (videos: File[]): Promise<Video[]> => {
	const storage = getStorage();
	const uploadPromises = videos.map(async (file, index) => {
		const videoId = `video-${Date.now()}-${index}`;
		const videoRef = ref(storage, `videos/${videoId}`);
		await uploadBytes(videoRef, file);
		const youtubeId = await getDownloadURL(videoRef);
		return {
			id: index + 1,
			title: file.name,
			youtubeId,
			thumbnailUrl: "", // You can generate or fetch the thumbnail URL
			playtime: "00:00", // You can calculate or fetch the playtime
			watched: false,
		};
	});
	return Promise.all(uploadPromises);
};

const updateFirestoreDocument = async ({userId, updatedData}: UpdateData) => {
	const userRef = doc(db, "KLMS-USER", userId);
	const userDoc = await getDoc(userRef);

	if (!userDoc.exists()) {
		throw new Error("User does not exist");
	}

	const currentData = userDoc.data();
	const newData = {
		...currentData,
		...updatedData,
	};

	await updateDoc(userRef, newData);
};

const useUploadVideosAndUpdateData = () => {
	const [uploadStatus, setUploadStatus] = useState<string>("");

	const mutationFn: MutationFunction<void, UpdateData> = async ({
		userId,
		updatedData,
	}) => {
		setUploadStatus("Uploading videos...");
		const videoFiles = updatedData.Videos.map(
			video => video.youtubeId as unknown as File
		);
		const uploadedVideos = await uploadVideos(videoFiles);
		setUploadStatus("Updating Firestore document...");
		await updateFirestoreDocument({
			userId,
			updatedData: {...updatedData, Videos: uploadedVideos},
		});
		setUploadStatus("Upload and update complete");
	};

	const mutation = useMutation(mutationFn, {
		onSuccess: () => {
			message.success("Videos uploaded and data updated successfully");
		},
		onError: (error: any) => {
			console.error("Error uploading videos and updating data:", error);
			message.error("Error uploading videos and updating data");
		},
	});

	return {...mutation, uploadStatus};
};

export default useUploadVideosAndUpdateData;
