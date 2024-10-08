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
		element: lazy(() => import("../modules/Instructors/courses/createcourse")),
	},
	{
		path: "/courses-view",
		element: lazy(() => import("../modules/Instructors/courses/courseslist")),
	},

	{
		path: "/courses-view/:id",
		element: lazy(() => import("../modules/Instructors/courses/courseview")),
	},
	{
		path: "*",
		element: lazy(() => import("../modules/NotFound")),
	},
];

function Instructor() {
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

export default Instructor;
