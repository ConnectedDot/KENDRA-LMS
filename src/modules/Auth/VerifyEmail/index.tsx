import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {message} from "antd";
import {getAuth, applyActionCode, onAuthStateChanged} from "firebase/auth";
import {Loader} from "../../../components";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../Firebase";
import {FirebaseError} from "firebase/app";
import {MdOutlineVerified} from "react-icons/md";

const VerifyEmail = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [userId, setUserId] = useState<string | null>(null); // Store user ID

	const handleProceed = () => {
		navigate("/login");
	};

	const handleEmailVerification = async (oobCode: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const auth = getAuth();
			await applyActionCode(auth, oobCode);
			message.success("Email verified successfully!");

			onAuthStateChanged(auth, async user => {
				if (user) {
					setUserId(user.uid);
				}
			});
		} catch (error: any) {
			console.error("Error verifying email:", error);
			let errorMessage = "An unexpected error occurred.";

			if (error instanceof FirebaseError) {
				errorMessage = error.message.replace(/^Firebase: /, "");
			} else if (
				typeof error === "object" &&
				error !== null &&
				"response" in error
			) {
				// Handle specific error types
			}

			setError(errorMessage);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const oobCode = queryParams.get("oobCode");

		if (oobCode) {
			// Trigger verification immediately
			handleEmailVerification(oobCode);
		} else {
			message.error("Invalid verification link");
			navigate("/login");
		}
	}, []);

	useEffect(() => {
		const updateUserDoc = async () => {
			if (userId) {
				try {
					const userRef = doc(db, "KLMS-USER", userId);

					// Check if the document exists
					const docSnap = await getDoc(userRef);
					if (!docSnap.exists()) {
						message.error("User document does not exist.");
						return;
					}

					// Update the document
					await updateDoc(userRef, {isVerified: true});
					message.success(`User with ID: ${userId} has been updated.`);

					// Retrieve the updated document
					const updatedDocSnap = await getDoc(userRef);
					message.success(
						"Updated document: " + JSON.stringify(updatedDocSnap.data())
					);

					navigate("/login");
				} catch (error: any) {
					console.error("Error updating user document:", error);
					let errorMessage = "An unexpected error occurred.";

					if (error instanceof FirebaseError) {
						errorMessage = error.message.replace(/^Firebase: /, "");
					} else if (
						typeof error === "object" &&
						error !== null &&
						"response" in error
					) {
						// Handle specific error types
					}

					setError(errorMessage);
					setIsLoading(false);
				}
			}
		};

		updateUserDoc();
	}, [userId, navigate]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div>
			{error ? (
				<div style={{color: "red"}}>{error}</div>
			) : (
				<main className="h-screen grid place-items-center bg-white">
					<div className="flex flex-col justify-center items-center text-center">
						<MdOutlineVerified style={{fontSize: "48px", color: "black"}} />
						<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
							Email Verification Successful
						</h1>
						<p className="mt-6 text-base leading-7 text-gray-600">
							Your email has been verified successfully. You can now proceed to
							login.
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<button
								type="button"
								className="text-sm font-semibold rounded-md bg-primary-100 bg-black text-white hover:text-black hover:bg-slate-300 hover:text-primary-100 px-3.5 py-2.5 shadow-sm outline-none border-none"
								onClick={handleProceed}
							>
								Continue
							</button>
						</div>
					</div>
				</main>
			)}
		</div>
	);
};

export default VerifyEmail;
