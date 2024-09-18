import {Routes, Route, BrowserRouter} from "react-router-dom";
import BaseRoutes from "./base";
import {Fragment, Suspense} from "react";
import AuthGuard from "./AuthGuard";
import NotFound from "../modules/NotFound";
import Loader from "../components/Loader";
import Offlinepagefunction from "./offlinepagefunction";

interface RouteConfig {
	path: string;
	exact?: boolean;
	component: React.ComponentType;
	useAuth: boolean;
	allowedRoles?: string[];
}

const RoutesWrapper = () => {
	return (
		<BrowserRouter>
			<Offlinepagefunction />

			<Routes>
				{BaseRoutes.map(route => (
					<Route
						key={route.path}
						path={route.path}
						element={
							<Fragment>
								<Suspense fallback={<Loader />}>
									{route.useAuth ? (
										<AuthGuard allowedRoles={route.allowedRoles}>
											<route.component />
										</AuthGuard>
									) : (
										<route.component />
									)}
									{/* <route.component /> */}
								</Suspense>
							</Fragment>
						}
					/>
				))}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default RoutesWrapper;
