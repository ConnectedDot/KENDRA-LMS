import React from "react";
import {FrownOutlined} from "@ant-design/icons";
import {MdError, MdNotificationsPaused} from "react-icons/md";
import {useNavigate} from "react-router-dom";

const ApprovalPage = () => {
	const navigate = useNavigate();
	const handleGoHome = () => {
		navigate("/");
	};

	return (
		<main className="h-screen grid place-items-center bg-white">
			<div className="flex flex-col justify-center items-center text-center">
				<MdNotificationsPaused style={{fontSize: "48px", color: "black"}} />
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Account Awaiting Approval
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600 max-w-3xl">
					Thank you for your interest in teaching on our platform. Your account
					is currently awaiting approval. We appreciate your effort and will
					notify you once your account has been verified.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<button
						type="button"
						className="text-sm font-semibold rounded-md bg-primary-100 bg-black text-white hover:text-black hover:bg-slate-300 hover:text-primary-100 px-3.5 py-2.5 shadow-sm outline-none border-none"
						onClick={handleGoHome}
					>
						Go to Home
					</button>
				</div>
			</div>
		</main>
	);
};

export default ApprovalPage;
