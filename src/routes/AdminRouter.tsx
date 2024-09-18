import {Fragment, lazy} from "react";
import {Route, Routes} from "react-router-dom";

const privateRoutes = [
	{
		path: "/dashboard",
		element: lazy(() => import("../modules/Admin")),
	},
	{
		path: "/profile",
		element: lazy(() => import("../modules/Admin/profile")),
	},
	{
		path: "/admin-panel",
		element: lazy(
			() => import("../modules/Admin/management/components/usermanagement")
		),
	},
	{
		path: "/user-management",
		element: lazy(
			() => import("../modules/Admin/management/components/usermanagement")
		),
	},
	{
		path: "/courses-view",
		element: lazy(
			() => import("../modules/Admin/management/components/coursesmanagement")
		),
	},
	{
		path: "/reports",
		element: lazy(() => import("../modules/Admin/management/report")),
	},
	{
		path: "/mentorships",
		element: lazy(() => import("../modules/Admin/management/mentoship")),
	},
	{
		path: "/programs-view",
		element: lazy(() => import("../modules/Admin/management/programs")),
	},
	{
		path: "/user-management",
		element: lazy(
			() => import("../modules/Admin/management/components/bulkupload")
		),
	},

	{
		path: "*",
		element: lazy(() => import("../modules/NotFound")),
	},
];

function Admin() {
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

export default Admin;
