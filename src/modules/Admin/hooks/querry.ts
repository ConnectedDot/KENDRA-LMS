import {useCallback, useEffect, useState} from "react";
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import {message} from "antd";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {db, storage} from "../../../Firebase";
import {useMutation, useQuery, useQueryClient} from "react-query";
// import { db } from './firebaseConfig'; // Assuming you have your Firebase config

// User Management Hooks

// const query = db.collection('users').where('age', '>', 18);
// const querySnapshot = await query.get();

// const query = db.collection('users').orderBy('name', 'desc');
// const querySnapshot = await query.get();

// const query = db.collection('users').limit(10);
// const querySnapshot = await query.get();

// // Fetch the first 10 users, sorted by name
// async function fetchUsers(startAfterDoc = null) {
//   let query = db.collection('users').orderBy('name');

//   if (startAfterDoc) {
//     query = query.startAfter(startAfterDoc);
//   }

//   query = query.limit(10); // Fetch 10 users at a time

//   const querySnapshot = await query.get();

//   const users = querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));

//   // ... Process the users data (display in your UI)

//   // Get the last document for pagination
//   const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

//   return { users, lastDoc };
// }

// // Initial fetch
// fetchUsers().then(({ users, lastDoc }) => {
//   // Display users
//   // ...

//   // Store lastDoc for pagination
//   // ...
// });

// // When the user wants to see more users
// fetchUsers(lastDoc).then(({ users, lastDoc }) => {
//   // Append new users to the UI
//   // ...

//   // Update lastDoc for future pagination
//   // ...
// });

interface User {
	uid: string;
	email: string;
	displayName: string;
	role: string;
	isVerified: boolean;
	gender: string;
}

// const fetchUsers = async (): Promise<User[]> => {
// 	const usersCollection = collection(db, "KLMS-USER");
// 	const usersSnapshot = await getDocs(usersCollection);
// 	const usersList = usersSnapshot.docs.map(doc => doc.data() as User);
// 	return usersList;
// };

// const updateUser = async (user: User): Promise<void> => {
// 	const userDocRef = doc(db, "KLMS-USER", user.uid);
// 	await setDoc(userDocRef, user);
// };

// export const useUsers = () => {
// 	const queryClient = useQueryClient();

// 	const {data: users, error, isLoading} = useQuery<User[]>("users", fetchUsers);

// 	const mutation = useMutation(updateUser, {
// 		onSuccess: () => {
// 			// Invalidate and refetch
// 			queryClient.invalidateQueries("users");
// 		},
// 	});

// 	return {users, error, isLoading};
// };

// export function useFetchUsers() {
// 	const [allUsers, setAllUsers] = useState([]);
// 	const [isLoading, setIsLoading] = useState(true);

// 	useEffect(() => {
// 		async function getAllUsers() {
// 			setIsLoading(true);
// 			try {
// 				const userCollection = collection(db, "KLMS-USER");
// 				const snapshot = await getDocs(userCollection);
// 				const KLMSUsers = snapshot.docs.map(doc => doc.data());
// 				setAllUsers(KLMSUsers as any);
// 			} catch (error) {
// 				console.error("Error fetching users:", error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		}

// 		getAllUsers();
// 	}, []);

// 	return {allUsers, isLoading};
// }

export function useFetchUsers() {
	const [allUsers, setAllUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getAllUsers = useCallback(async () => {
		setIsLoading(true);
		try {
			const userCollection = collection(db, "KLMS-USER");
			const snapshot = await getDocs(userCollection);
			const KLMSUsers = snapshot.docs.map(doc => doc.data());
			setAllUsers(KLMSUsers as any);
		} catch (error) {
			console.error("Error fetching users:", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		getAllUsers();
	}, [getAllUsers]);

	return {allUsers, isLoading, refetch: getAllUsers};
}

export function useFetchCourses() {
	const [allCourses, setAllCourses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getAllCourses = useCallback(async () => {
		setIsLoading(true);
		try {
			const courseCollection = collection(db, "courses");
			const snapshot = await getDocs(courseCollection);
			const courses = snapshot.docs.map(doc => doc.data());
			setAllCourses(courses as any);
		} catch (error) {
			console.error("Error fetching courses:", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		getAllCourses();
	}, [getAllCourses]);

	return {allCourses, isLoading, refetch: getAllCourses};
}
