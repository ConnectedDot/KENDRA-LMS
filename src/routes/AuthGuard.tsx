import {useNavigate} from "react-router-dom";
import {useEffect, useMemo} from "react";
import {getStoredUser} from "../storage";
import {useFullLogout} from "../context/hooks";
import {PrivatePaths} from "./path";

interface AuthGuardProps {
	children: React.ReactNode;
	allowedRoles?: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({children, allowedRoles}) => {
	const user = getStoredUser();
	const navigate = useNavigate();
	const fullLogout = useFullLogout();

	const loggedInUser = useMemo(() => user, [user]);

	useEffect(() => {
		if (!user) {
			(async () => {
				await fullLogout();
				navigate("/login", {replace: true});
			})();
		} else {
			const currentPath = window.location.pathname;

			let userPrivatePath = "/";
			if (user.role === "Admin") {
				userPrivatePath = PrivatePaths.ADMIN;
			} else if (user.role === "Instructor") {
				userPrivatePath = PrivatePaths.INSTRUCTOR;
			} else if (user.role === "User") {
				userPrivatePath = PrivatePaths.USER;
			}

			if (!currentPath.startsWith(userPrivatePath)) {
				navigate(`${userPrivatePath}dashboard`, {replace: true});
			} else if (allowedRoles && !allowedRoles.includes(user.role)) {
				navigate(`${userPrivatePath}dashboard`, {replace: true});
			}
		}
	}, [loggedInUser, navigate, fullLogout, user, allowedRoles]);

	return <>{children}</>;
};

export default AuthGuard;
