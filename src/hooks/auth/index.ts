import {useEffect, useState} from "react";
import {useMutation, MutationFunction} from "@tanstack/react-query";
import {FirebaseError} from "firebase/app";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithPopup,
	confirmPasswordReset,
	getAuth,
	onAuthStateChanged,
	updateProfile,
	signOut,
} from "firebase/auth";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	QuerySnapshot,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {auth, db} from "../../Firebase";
import {CombinedUserProps} from "../../interface";
import {
	setLoginToken,
	setStoredCart,
	setStoredFireUser,
	setStoredUser,
} from "../../storage";
import {PrivatePaths, PublicPaths} from "../../routes/path";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {GoogleAuthProvider} from "firebase/auth";
import {message} from "antd";
import {sendVerificationEmail} from "../../utils/sendVerificationEmail";
import {clearLocalStorage} from "../../context/hooks";

interface UpdateUserData {
	userId: string;
	updatedData: Record<string, any>;
}

interface User {
	email: string;
	// Add other properties if necessary
}

export const totalLogout = async () => {
	signOut(auth)
		.then(() => {
			clearLocalStorage();
		})
		.catch(error => {
			console.error("Error during total logout:", error);
		});
};

export function useFirebaseGoogleLogin() {
	const navigate = useNavigate();
	const provider = new GoogleAuthProvider();
	provider.addScope("email");
	const [userData, setUserData] = useState<CombinedUserProps | null>(null);
	const [token, setToken] = useState<string | null>(null);

	const mutationFn: MutationFunction<
		{userData: CombinedUserProps; token: string},
		void
	> = async () => {
		const result = await signInWithPopup(auth, provider);
		const user = result.user;
		setStoredFireUser(user as any);
		console.log("User:", user);
		const token = await user.getIdToken();
		const userDocRef = doc(db, "KLMS-USER", user.uid);
		const userDoc = await getDoc(userDocRef);
		const userId = `user${Date.now()}`;

		let userData: CombinedUserProps;

		if (userDoc.exists()) {
			// Existing user
			userData = userDoc.data() as CombinedUserProps;
		} else {
			// New user, initialize user data
			userData = {
				_id: "",
				id: userId,
				uid: user.uid,
				gender: "",
				email: user.email || "",
				role: "User",
				isVerified: user.emailVerified,
				firstName: user.displayName?.split(" ")[1] || "",
				lastName: user.displayName?.split(" ")[0] || "",
				bio: "",
				phone_number: "",
				courses: [],
				total_courses: [],
				twitter: "",
				linkedin: "",
				facebook: "",
				status: "Pending",
				cart: [],
				certification: null,
				photo: user.photoURL || "",
				token: "",
				isApproved: false,
				expertise: "",
				total_students: 0,
				total_reviews: [],
				skill_level: [],
				website: "",
				instagram: "",
				youtube: "",
				displayName: user.displayName || "",
			};
			await setDoc(userDocRef, userData);
			await updateDoc(userDocRef, {isVerified: true});
		}

		return {userData, token};
	};

	const {mutate} = useMutation({
		mutationFn,
		onSuccess: async ({userData, token}) => {
			if (userData.status === "Inactive") {
				message.info("Your account is currently on hold.");
				return;
			} else if (userData.status === "Pending") {
				message.info(
					"Your account is going through verification for misconduct."
				);
				return;
			} else if (userData.status === "Active") {
				setStoredUser(userData);
				setStoredCart(userData.cart as any);
				setLoginToken(token);
				message.success("Logged in successfully");

				// Handle role-based redirection
				if (userData.role === "Admin") {
					navigate(`${PrivatePaths.ADMIN}dashboard`);
				} else if (userData.role === "Instructor") {
					navigate(`${PrivatePaths.INSTRUCTOR}dashboard`);
				} else {
					navigate(`${PrivatePaths.USER}dashboard`);
				}
			}

			// Update the Firebase user displayName
			const auth = getAuth();
			const user = auth.currentUser;
			if (user) {
				await updateProfile(user, {
					displayName: `${userData.firstName} ${userData.lastName}`,
				});
			}
		},
		onError: (error: any) => {
			let errorMessage = "An unexpected error occurred.";

			if (error instanceof FirebaseError) {
				errorMessage = error.message.replace(/^Firebase: /, "");
			} else if (
				typeof error === "object" &&
				error !== null &&
				"response" in error
			) {
				const err = error as {response: {data: {error: {message: string}}}};
				if (err.response && err.response.data && err.response.data.error) {
					errorMessage = err.response.data.error.message;
				}
			}

			message.info(errorMessage);
		},
	});

	// useEffect(() => {
	// 	if (userData && token) {
	// 		setStoredUser(userData);
	// 		setLoginToken(token);

	// 		// Handle role-based redirection
	// 		if (userData.role === "Admin") {
	// 			navigate(`${PrivatePaths.ADMIN}dashboard`);
	// 		} else if (userData.role === "Instructor") {
	// 			navigate(`${PrivatePaths.INSTRUCTOR}dashboard`);
	// 		} else {
	// 			navigate(`${PrivatePaths.USER}dashboard`);
	// 		}
	// 	}
	// }, [userData, token, navigate]);

	return {mutate};
}

export function useFirebaseLogin() {
	const navigate = useNavigate();
	const [userData, setUserData] = useState<CombinedUserProps | null>(null);
	const [token, setToken] = useState<string | null>(null);

	const mutationFn: MutationFunction<
		{userData: CombinedUserProps; token: string; user: any},
		{email: string; password: string}
	> = async formData => {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			formData.email,
			formData.password
		);
		const user = userCredential.user;
		setStoredFireUser(user as any);

		if (user) {
			const userDocRef = doc(db, "KLMS-USER", user.uid);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				const userData = userDoc.data() as CombinedUserProps;
				const token = await user.getIdToken();

				// Check user status and role

				return {userData, token, user};
			} else {
				throw new Error("User data not found in Firestore.");
			}
		} else {
			throw new Error("User not authenticated.");
		}
	};

	const {mutate} = useMutation({
		mutationFn,
		onSuccess: async ({userData, token, user}) => {
			if (userData.role === "Admin") {
				setStoredUser(userData);
				setStoredCart(userData.cart as any);
				setLoginToken(token);
				message.success("Logged in successfully");
				navigate(`${PrivatePaths.ADMIN}dashboard`);
			} else if (userData.role === "Instructor") {
				if (userData.status === "Inactive") {
					message.info("Your account is currently on hold.");
					throw new Error("Account on hold");
				} else if (userData.status === "Pending") {
					message.info(
						"Your account is going through verification for misconduct."
					);
					throw new Error("Account pending verification");
				} else if (userData.isVerified === false) {
					message.info(
						`Please, verify your email address at ${userData.email}`
					);
					try {
						await sendEmailVerification(user);
						message.success("A new verification email has been sent.");
					} catch (error) {
						message.error("Failed to send verification email.");
					}
					throw new Error("Email not verified");
				} else if (userData.isApproved === false) {
					navigate(`/approval`);
					totalLogout();
					throw new Error("Instructor not approved");
				} else {
					setStoredUser(userData);
					// setStoredCart(userData.cart as any);
					setLoginToken(token);
					message.success("Logged in successfully");
					navigate(`${PrivatePaths.INSTRUCTOR}dashboard`);
				}
			} else if (userData.role === "User") {
				if (userData.status === "Inactive") {
					message.info("Your account is currently on hold.");
					throw new Error("Account on hold");
				} else if (userData.status === "Pending") {
					message.info(
						"Your account is going through verification for misconduct."
					);
					throw new Error("Account pending verification");
				} else if (userData.isVerified === false) {
					message.info(
						`Please, verify your email address at ${userData.email}`
					);
					try {
						await sendEmailVerification(user);
						message.success("A new verification email has been sent.");
					} catch (error) {
						message.error("Failed to send verification email.");
					}
					throw new Error("Email not verified");
				} else {
					setStoredUser(userData);
					setStoredCart(userData.cart as any);
					setLoginToken(token);
					message.success("Logged in successfully");
					navigate(`${PrivatePaths.USER}dashboard`);
				}
			} else {
				throw new Error("Unknown user role");
			}
		},
		onError: (error: any) => {
			let errorMessage = "An unexpected error occurred.";

			if (error instanceof FirebaseError) {
				errorMessage = error.message.replace(/^Firebase: /, "");
			} else if (
				typeof error === "object" &&
				error !== null &&
				"response" in error
			) {
				const err = error as {response: {data: {error: {message: string}}}};
				if (err.response && err.response.data && err.response.data.error) {
					errorMessage = err.response.data.error.message;
				}
			}

			message.info(errorMessage);
		},
	});

	return {mutate};
}

export function useFirebaseRegister() {
	const navigate = useNavigate();

	const mutationFn: MutationFunction<
		{userData: any},
		{email: string; password: string; [key: string]: any}
	> = async formData => {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			formData.email,
			formData.password
		);

		const user = userCredential.user;

		if (user) {
			try {
				await sendEmailVerification(user);
				// await updateProfile(user, {
				// 	displayName: formData.role,
				// });
				message.success("Profile updated successfully!");
			} catch (error: any) {
				message.error("Error updating firebase data:", error);
			}
			const userId = `user${Date.now()}`;
			const {password, ...userData} = formData;
			const userDocData = {
				...userData,
				id: userId,
				uid: user.uid,
				isVerified: false,
			};

			await setDoc(doc(db, "KLMS-USER", user.uid), userDocData);

			return {userData: userDocData, email: formData.email}; // Return email as well
		} else {
			throw new Error("User not authenticated.");
		}
	};

	return useMutation({
		mutationFn,
		onSuccess: ({userData}) => {
			message.success("Verification email sent. Please check your inbox.");
			navigate(`/email-dalogue/?email=${encodeURIComponent(userData?.email)}`);
		},
		onError: (error: any) => {
			let errorMessage = "An unexpected error occurred.";

			if (error instanceof FirebaseError) {
				errorMessage = error.message.replace(/^Firebase: /, "");
			} else if (
				typeof error === "object" &&
				error !== null &&
				"response" in error
			) {
				const err = error as {
					response: {data: {error: {message: string}}};
				};
				if (err.response && err.response.data && err.response.data.error) {
					errorMessage = err.response.data.error.message;
				}
			}

			message.error(errorMessage);
		},
	});
}

export function useFetchUserEmails() {
	const [emails, setEmails] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEmails = async () => {
			try {
				const candidatesCollection = collection(db, "KLMS-USER");
				const snapshot: QuerySnapshot = await getDocs(candidatesCollection);
				const candidates = snapshot.docs.map(doc => doc.data() as User);
				setEmails(candidates);
			} catch (error) {
				setError("Error fetching users");
				console.error("Error fetching users:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEmails();

		// Optional: Cleanup function if necessary
		return () => {
			// Cancel requests or cleanup if needed
		};
	}, []);

	return {emails, loading, error};
}

export const useFirebasePasswordReset = (oobCode: string, apiKey: string) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handlePasswordReset = async (
		newPassword: string,
		confirmPassword: string
	) => {
		if (newPassword !== confirmPassword) {
			setError("Passwords don't match");
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const auth = getAuth();
			await confirmPasswordReset(auth, oobCode, newPassword);
			setIsLoading(false);
		} catch (error) {
			console.error("Error confirming password reset:", error);
			setError("Failed to reset password");
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		error,
		handlePasswordReset,
	};
};

const updateUser: MutationFunction<void, UpdateUserData> = async ({
	userId,
	updatedData,
}) => {
	const gpphotoId = `klms-user${Date.now()}`;
	let photoURL = "";

	// Handle photo upload
	if (updatedData.photo instanceof File) {
		const storage = getStorage();
		const photoRef = ref(storage, `photos/${gpphotoId}`);
		await uploadBytes(photoRef, updatedData.photo);
		photoURL = await getDownloadURL(photoRef);
	} else if (typeof updatedData.photo === "string") {
		photoURL = updatedData.photo;
	} else if (updatedData.photo?.originFileObj instanceof File) {
		const storage = getStorage();
		const photoRef = ref(storage, `photos/${gpphotoId}`);
		await uploadBytes(photoRef, updatedData.photo.originFileObj);
		photoURL = await getDownloadURL(photoRef);
	}

	const userRef = doc(db, "KLMS-USER", userId);
	const userDoc = await getDoc(userRef);

	if (!userDoc.exists()) {
		throw new Error("User does not exist");
	}

	const currentData = userDoc.data();
	const gpUserData: Record<string, any> = {
		...currentData,
		...updatedData,
	};

	// Only include the photo field if photoURL is defined
	if (photoURL) {
		gpUserData.photo = photoURL;
	} else if (currentData.photo) {
		gpUserData.photo = currentData.photo;
	}

	// Ensure no File objects are passed to Firestore
	if (gpUserData.photo instanceof File) {
		delete gpUserData.photo;
	}

	// Remove unsupported fields
	const unsupportedFields = ["proactiveRefresh"];
	unsupportedFields.forEach(field => {
		if (gpUserData[field] !== undefined) {
			delete gpUserData[field];
		}
	});

	await updateDoc(userRef, gpUserData);

	await setStoredUser(gpUserData as any);
};

export function useUpdateUserData() {
	return useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			message.success("User data updated successfully");
		},
		onError: (error: any) => {
			message.error(`Error updating user's data: ${error.message}`);
		},
	});
}

// import { useState, useEffect } from 'react';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// export const useFirebaseUserSignedIn = () => {
// 	const [fireUser, setFireUser] = useState(null);

// 	useEffect(() => {
// 		const auth = getAuth();
// 		const unsubscribe = onAuthStateChanged(auth, user => {
// 			setFireUser(user as any);
// 		});

// 		// Clean up the listener when the component unmounts
// 		return () => unsubscribe();
// 	}, []);

// 	return fireUser;
// };

//  Observer Listerner

// export const useObserveAuthState = () => {
// 	const auth = getAuth();
// 	const [fireUser, setFireUser] = useState(null);
// 	onAuthStateChanged(auth, user => {
// 		setFireUser(user as any);
// 	});
// 	return fireUser;
// };

// export const useUpdateFirebaseUser = () => {
// 	const [fireUser, setFireUser] = useState(null);

// 	useEffect(() => {
// 		const auth = getAuth();
// 		const unsubscribe = onAuthStateChanged(auth, user => {
// 			setFireUser(user as any);
// 		});

// 		// Clean up the listener when the component unmounts
// 		return () => unsubscribe();
// 	}, []);

// 	return fireUser;
// };

// export const useFirebaseLogout = () => {
// 	const mutationFn: MutationFunction<void, void> = async () => {
// 		const auth = getAuth();
// 		await auth.signOut();
// 	};

// 	return useMutation({
// 		mutationFn,
// 		onSuccess: () => {
// 			message.success("Logged out successfully");
// 		},
// 		onError: (error: any) => {
// 			message.error("Failed to log out");
// 		},
// 	});
// };
