import {Fragment, lazy, useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {AuthContext} from "../context";
import {PublicPaths} from "./path";

const privateRoutes = [
	{
		path: "/dashboard",
		element: lazy(() => import("../modules/Instructors")),
	},
	{
		path: "/profile",
		element: lazy(() => import("../modules/Instructors/Profile")),
	},
	{
		path: "/courses-new",
		element: lazy(() => import("../modules/Instructors/courses")),
	},
	{
		path: "/courses-view",
		element: lazy(() => import("../modules/Instructors/courses/CoursesList")),
	},
	{
		path: "/courses",
		element: lazy(() => import("../modules/Instructors/courses")),
	},
	{
		path: "/courses-view/:id",
		element: lazy(() => import("../modules/Instructors/courses/CoursesView")),
	},
	{
		path: "*",
		element: lazy(() => import("../modules/NotFound")),
	},
];

function User() {
	// const {user} = useContext(AuthContext);

	// if (!user) {
	// 	return <Navigate to={PublicPaths.LOGIN} replace />;
	// }

	return (
		<Routes>
			{privateRoutes.map(({path, element: Element}) => (
				<Fragment key={path}>
					<Route key={path} path={path} element={<Element />} />
				</Fragment>
			))}
		</Routes>
	);
}

export default User;
