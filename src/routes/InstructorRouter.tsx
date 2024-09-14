import {Fragment, lazy} from "react";
import {Route, Routes} from "react-router-dom";

const privateRoutes = [
	{
		path: "/dashboard",
		element: lazy(() => import("../modules/Instructors")),
	},
	{
		path: "/courses-new",
		element: lazy(() => import("../modules/Instructors/Courses")),
	},
	{
		path: "/courses-view",
		element: lazy(() => import("../modules/Instructors/Courses/CoursesList")),
	},
	{
		path: "/courses-view/:id",
		element: lazy(() => import("../modules/Instructors/Courses/CoursesView")),
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
