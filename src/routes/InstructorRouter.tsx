import {Fragment, lazy} from "react";
import {Route, Routes} from "react-router-dom";

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
		path: "/courses-view/:id",
		element: lazy(() => import("../modules/Instructors/courses/CoursesView")),
	},
	{
		path: "*",
		element: lazy(() => import("../modules/NotFound")),
	},
];

function User() {
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
