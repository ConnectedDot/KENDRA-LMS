import React, {useContext, useEffect, lazy} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import {PrivatePaths} from "./path";
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
			() => import("../modules/Auth/VerifyEmail/verificationdialog")
		),
	},
	{
		path: "/email-dalogue/*",
		element: lazy(
			() => import("../modules/Auth/VerifyEmail/verificationdialog")
		),
	},
	{
		path: "/approval",
		element: lazy(
			() => import("../modules/Auth/Instructor-Register/approvalpage")
		),
	},
	{
		path: "/forget-password",
		element: lazy(() => import("../modules/Auth/ForgotPassword")),
	},
	{
		path: "/change-password/*",
		element: lazy(() => import("../modules/Auth/ChangePassword")),
	},
	{
		path: "*",
		element: lazy(() => import("../modules/NotFound")),
	},
];

function Auth() {
	const {user} = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			let navigationPath = "/";
			if (user.role === "Admin") {
				navigationPath = `${PrivatePaths.ADMIN}dashboard`;
			} else if (user.role === "Instructor") {
				navigationPath = `${PrivatePaths.INSTRUCTOR}dashboard`;
			} else if (user.role === "User") {
				navigationPath = `${PrivatePaths.USER}dashboard`;
			}
			navigate(navigationPath, {replace: true});
		}
	}, [user, navigate]);

	return (
		<React.Suspense fallback={<Loader />}>
			<Routes>
				{paths.map(({path, element: Element}) => (
					<Route key={path} path={path} element={<Element />} />
				))}
			</Routes>
		</React.Suspense>
	);
}

export default Auth;
