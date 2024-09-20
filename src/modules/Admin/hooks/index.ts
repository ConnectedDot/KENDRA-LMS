import {useState} from "react";
import {deleteDoc, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {message} from "antd";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {auth, db, storage} from "../../../Firebase";
import {
	createUserWithEmailAndPassword,
	deleteUser as firebaseDeleteUser,
} from "firebase/auth";

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

		const update = updatedUserData;
		const UserId = update.uid;

		let photoURL = "";
		if (update.photo) {
			const photoRef = ref(storage, `photos/${UserId}`);
			await uploadBytes(photoRef, update.photo);
			photoURL = await getDownloadURL(photoRef);
		}

		if (update.photo instanceof File) {
			const storage = getStorage();
			const photoRef = ref(storage, `photos/${UserId}`);
			await uploadBytes(photoRef, update.photo);
			photoURL = await getDownloadURL(photoRef);
		} else if (typeof update.photo === "string") {
			photoURL = update.photo;
		} else if (update.photo?.originFileObj instanceof File) {
			const storage = getStorage();
			const photoRef = ref(storage, `photos/${UserId}`);
			await uploadBytes(photoRef, update.photo.originFileObj);
			photoURL = await getDownloadURL(photoRef);
		}

		const UpdatingFiles = {
			...updatedUserData,
			photo: photoURL,
		};

		const currentData = userDoc.data();
		const gpUserData: Record<string, any> = {
			...currentData,
			...UpdatingFiles,
		};

		try {
			await updateDoc(userRef, gpUserData);
		} catch (err: any) {
			setError(err);
			message.error(`Error updating user datass: ${err.message}`);
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
			setIsLoading(false);
			return;
		}

		try {
			// Delete user from Firestore
			await deleteDoc(userRef);

			// Delete user from Firebase Authentication
			const uid = userDoc.data()?.uid as any;
			const user = auth.currentUser;
			if (user && user.uid === uid) {
				user
					.delete()
					.then(() => {
						// Account deleted.
					})
					.catch(error => {
						// An error happened.
						setError(error);
						message.error(`Error deleting user account: ${error.message}`);
					});
			} else {
				await firebaseDeleteUser(uid);
			}
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

// Destructuring all the functions to use
// const { updateUser, isLoading: isUpdatingUser, error: updateUserError } = useUpdateUser();
// const { deleteUser, isLoading: isDeletingUser, error: deleteUserError } = useDeleteUser();
// const { updateCourse, isLoading: isUpdatingCourse, error: updateCourseError } = useUpdateCourse();
// const { deleteCourse, isLoading: isDeletingCourse, error: deleteCourseError } = useDeleteCourse();

// Now you can use these functions in your component

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

interface User {
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	isVerified: boolean;
	password: string;
	photo: string;
}

const useCreateAndStoreUsers = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const mutate = async (usersData: User[]) => {
		setLoading(true);
		setError(null);

		try {
			const createdUsers: {
				uid: string;
				email: string;
				firstName: string;
				lastName: string;
				role: string;

				isVerified: boolean;
				photo: string;
			}[] = [];

			for (const userData of usersData) {
				// Create a new user in Firebase Authentication
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					userData.email,
					userData.password
				);
				const user = userCredential.user;

				// Store user data in Firestore
				const userDocData = {
					uid: user.uid,
					email: userData.email,
					displayName: `${userData.firstName} ${userData.lastName}`,
					role: userData.role,
					isVerified: userData.isVerified,
					photo: userData.photo,
					firstName: userData.firstName,
					lastName: userData.lastName,
				};

				if (user) {
					await setDoc(doc(db, "KLMS-USER", user.uid), userDocData);
					console.log(userDocData, "userDocData");
					createdUsers.push(userDocData);
				} else {
					message.error("User not authenticated.");
				}
			}

			console.log("Successfully created and stored users:", createdUsers);
			message.success("Successfully created and stored users:");
		} catch (error) {
			console.error("Error creating users:", error);
			setError(error as Error);
			message.error("Error creating users.");
		} finally {
			setLoading(false);
		}
	};

	return {mutate, loading, error};
};

export default useCreateAndStoreUsers;
