import {axiosInstance} from "../../axios-Instance";
import {
	getLoginToken,
	getStoredUser,
	setLoginToken,
	setStoredFireUser,
	setStoredUser,
} from "../../storage";
import {useNavigate} from "react-router-dom";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {auth, db} from "../../Firebase";
import {userProps} from "../../interface";
import {doc, getDoc} from "firebase/firestore";
import {FirebaseError} from "firebase/app";
import {useEffect, useState} from "react";

const userProfile = async () => {
	const data = await axiosInstance({
		url: "/auth/me",
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLoginToken()}`,
		},
	});
	return data?.data?.data;
};

export function useAuthenticatedUser() {
	const data = getStoredUser();
	return data;
}

const totalLogout = async () => {
	signOut(auth)
		.then(() => {
			clearLocalStorage();
		})
		.catch(error => {
			console.error("Error during total logout:", error);
		});
};

export function clearLocalStorage() {
	setStoredUser({
		id: "",
		uid: "",
		_id: "",
		gender: "",
		lastName: "",
		firstName: "",
		email: "",
		isVerified: false,
		bio: "",
		phone_number: "",
		courses: [],
		total_courses: [],
		twitter: "",
		linkedin: "",
		facebook: "",
		status: "Pending",
		cart: [],
	});
	setLoginToken("");
	setStoredFireUser({} as userProps);
	localStorage.removeItem("persist:root");
	localStorage.clear();
}

export function useFullLogout() {
	const navigate = useNavigate();

	const fullLogout = async () => {
		await totalLogout();
		navigate("/login");
	};

	return fullLogout;
}

export function useObservingUser() {
	const auth = getAuth();
	const [users, setUsers] = useState<any>(null);
	const [databaseUsers, setDatabaseUsers] = useState<userProps | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async user => {
			if (user) {
				setUsers(user);

				try {
					const userDocRef = doc(db, "KLMS-USER", user.uid);
					const userDoc = await getDoc(userDocRef);

					if (userDoc.exists()) {
						const userData = userDoc.data() as userProps;
						setDatabaseUsers(userData);
						console.log(databaseUsers, "databaseUsers");
					} else {
					}
				} catch (error) {}
			} else {
				setUsers(null);
				setDatabaseUsers(null);
			}
		});

		return () => unsubscribe();
	}, [auth]);

	return [users, databaseUsers];
}
