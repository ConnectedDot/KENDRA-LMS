import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {message, Spin} from "antd";
import {getAuth, applyActionCode, confirmPasswordReset} from "firebase/auth";
import {VerifiedOutlined} from "@ant-design/icons";
import {Loader} from "../../../components";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../../Firebase";
import {FirebaseError} from "firebase/app";
import {MdError, MdOutlineVerified} from "react-icons/md";

const VerifyEmail = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleProceed = () => {
		navigate("/login");
	};
	const handleEmailVerification = async (oobCode: string, apiKey: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const auth = getAuth();
			await confirmPasswordReset(auth, oobCode, apiKey);
			message.success("Email verified successfully!");
			navigate("/login"); // Redirect to login after verification
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
				const err = error as {
					response: {data: {error: {message: string}}};
				};
				if (err.response && err.response.data && err.response.data.error) {
					errorMessage = err.response.data.error.message;
				}
			}
			message.error(errorMessage);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const oobCode = queryParams.get("oobCode");
		const apiKey = queryParams.get("apiKey");

		if (oobCode && apiKey) {
			// Trigger verification immediately
			handleEmailVerification(oobCode, apiKey);
			message.success("Email verified successfully");
		} else {
			message.error("Invalid verification link");
			navigate("/login");
		}
	}, [navigate]);

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
