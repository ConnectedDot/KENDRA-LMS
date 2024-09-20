import {Fragment, lazy, useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {PublicPaths} from "./path";
import {AuthContext} from "../context";

const privateRoutes = [
	{
		path: "/dashboard",
		element: lazy(() => import("../modules/Learners")),
	},
	{
		path: "/profile",
		element: lazy(() => import("../modules/Learners/profile")),
	},
	// {
	//   path: '/course-play',
	//   element: lazy(() => import('../modules/User/SingleCourse')),
	// },
	{
		path: "/course-details/:id",
		element: lazy(() => import("../modules/Learners/courses/newcoursessingle")),
	},
	{
		path: "/courses-enrolled",
		element: lazy(() => import("../modules/Learners/courses/courseslist")),
	},
	{
		path: "/courses-enrolled/:id",
		element: lazy(() => import("../modules/Learners/courses/courseview")),
	},
	{
		path: "*",
		element: lazy(() => import("../modules/NotFound")),
	},
];

function User() {
	const {user} = useContext(AuthContext);

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
