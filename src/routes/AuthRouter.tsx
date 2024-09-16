import React, {
	useContext,
	useEffect,
	useState,
	lazy,
	ReactElement,
} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {PrivatePaths, PublicPaths} from "./path";
import {AuthContext} from "../context";
import {Loader} from "../components";

const paths = [
	{
		path: "/",
		element: lazy(() => import("../modules/Home")),
	},
	{
		path: "/login",
		element: lazy(() => import("../modules/Auth/Login")),
	},
	{
		path: "/create-account",
		element: lazy(() => import("../modules/Auth/Register")),
	},
	{
		path: "/kendra-teachers",
		element: lazy(() => import("../modules/Auth/Register")),
	},
	{
		path: "/verify-email/:id",
		element: lazy(
			() => import("../modules/Auth/VerifyEmail/VerificationDialog")
		),
	},
	// {
	//   path: "/change-password/*",
	//   element: <AuthActionRouter />,
	// },
	{
		path: "/email-dalogue/*",
		element: lazy(
			() => import("../modules/Auth/VerifyEmail/VerificationDialog")
		),
	},
	// {
	//   path: "/teaching/join",
	//   element: lazy(() => import("../modules/Auth/Instructor-Register")),
	// },
	{
		path: "/forget-password",
		element: lazy(() => import("../modules/Auth/ForgotPassword")),
	},
	{
		path: "/change-password/*",
		element: lazy(() => import("../modules/Auth/ChangePassword")),
	},

	// just to view it
	// {
	//   path: "/coursepage",
	//   element: lazy(() => import("../components/CoursePages/CourseDetails")),
	// },
	{
		path: "*",
		element: lazy(() => import("../modules/NotFound")),
	},
];

function Auth() {
	const {user} = useContext(AuthContext);
	// let navigateTo: string = PublicPaths.LOGIN; // Default to a valid path

	// if (user) {
	// 	if (user.role === "Admin") {
	// 		navigateTo = PrivatePaths.ADMIN;
	// 	} else if (user.role === "Instructor") {
	// 		navigateTo = PrivatePaths.INSTRUCTOR;
	// 	} else {
	// 		navigateTo = PrivatePaths.USER;
	// 	}
	// }

	// 	return (
	// 		<React.Suspense fallback={<Loader />}>
	// 			<Navigate to={navigateTo} replace />
	// 		</React.Suspense>
	// 	);
	// }

	return (
		<Routes>
			{paths.map(({path, element: Element}) => (
				<Route key={path} path={path} element={<Element />} />
			))}
		</Routes>
	);
}

export default Auth;
