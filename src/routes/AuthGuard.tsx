import {useNavigate} from "react-router-dom";
import {useEffect, useMemo} from "react";
import {getStoredUser} from "../storage";
import {useFullLogout} from "../context/hooks";

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
		}
	}, [loggedInUser, navigate, fullLogout, user]);

	return <>{children}</>;
};

export default AuthGuard;
