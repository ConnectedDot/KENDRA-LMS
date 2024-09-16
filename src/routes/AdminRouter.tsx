import {Fragment, lazy, useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {PublicPaths} from "./path";
import {AuthContext} from "../context";

const privateRoutes = [
	{
		path: "/dashboard",
		element: lazy(() => import("../modules/Admin")),
	},
	// {
	//   path: '/profile',
	//   element: lazy(() => import('../modules/Admin/components/profile')),
	// },

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
