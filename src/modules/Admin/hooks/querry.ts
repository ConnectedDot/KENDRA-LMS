import {useCallback, useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../../Firebase";
import {message} from "antd";

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
			message.error(`Error fetching users: ${(error as Error).message}`);
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
			message.error(`Error fetching courses: ${(error as Error).message}`);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		getAllCourses();
	}, [getAllCourses]);

	return {allCourses, isLoading, refetch: getAllCourses};
}
