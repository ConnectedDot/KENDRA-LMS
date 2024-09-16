import {useState} from "react";
import {db} from "../../Firebase";
import {deleteDoc, doc, getDoc, updateDoc} from "firebase/firestore";
import {message} from "antd";

// User Management Hooks

// 1. Update User Data
export const useUpdateUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const updateUser = async (userId: any, updatedUserData: any) => {
		setIsLoading(true);
		setError(null);

		const userRef = doc(db, "KLMS-USER", userId);
		const userDoc = await getDoc(userRef);

		if (!userDoc.exists()) {
			message.error("User does not exist");
		}

		const currentData = userDoc.data();
		const gpUserData: Record<string, any> = {
			...currentData,
			...updatedUserData,
		};

		try {
			await updateDoc(userRef, gpUserData);
		} catch (err: any) {
			setError(err);
			message.error(`Error updating user data: ${err.message}`);
		} finally {
			setIsLoading(false);
			message.success("User data updated successfully");
		}
	};

	return {updateUser, isLoading, error};
};

// 3. Delete User Data
export const useDeleteUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const deleteUser = async (userId: any) => {
		setIsLoading(true);
		setError(null);

		const userRef = doc(db, "KLMS-USER", userId);
		const userDoc = await getDoc(userRef);

		if (!userDoc.exists()) {
			message.error("User does not exist");
		}

		try {
			await deleteDoc(userRef);
		} catch (err: any) {
			setError(err);
			message.error(`Error deleting user data: ${err.message}`);
		} finally {
			setIsLoading(false);
			message.success("User data deleted successfully");
		}
	};

	return {deleteUser, isLoading, error};
};

// Course Management Hooks

// 1. Update Course Data
export const useUpdateCourse = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const updateCourse = async (courseId: any, updatedCourseData: any) => {
		setIsLoading(true);
		setError(null);

		const docRef = doc(db, "courses", courseId);
		const courseDoc = await getDoc(docRef);

		if (!courseDoc.exists()) {
			message.error("User does not exist");
		}

		const currentData = courseDoc.data();
		const KLMSCourseData: Record<string, any> = {
			...currentData,
			...updatedCourseData,
		};

		try {
			await updateDoc(docRef, KLMSCourseData);
		} catch (err: any) {
			setError(err);
			message.error(`Error updating course data: ${err.message}`);
		} finally {
			setIsLoading(false);
			message.success("Course data updated successfully");
		}
	};

	return {updateCourse, isLoading, error};
};

export const useDeleteCourse = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const deleteCourse = async (courseId: any) => {
		setIsLoading(true);
		setError(null);

		const docRef = doc(db, "courses", courseId);
		const courseDoc = await getDoc(docRef);

		if (!courseDoc.exists()) {
			message.error("Course does not exist");
		}

		try {
			await deleteDoc(docRef);
		} catch (err: any) {
			setError(err);
			message.error(`Error deleting course data: ${err.message}`);
		} finally {
			setIsLoading(false);
			message.success("Course data deleted successfully");
		}
	};

	return {deleteCourse, isLoading, error};
};
