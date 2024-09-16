import {createContext, useEffect, useState} from "react";
import {
	getLoginToken,
	getStoredCart,
	getStoredFireUser,
	getStoredUser,
	setStoredUser,
} from "../storage";
import {ChildProps, userProps} from "../interface";
import {useObservingUser} from "./hooks";

export const AuthContext = createContext({
	user: undefined as userProps | undefined,
	token: undefined as string | undefined,
	isAuthenticated: false,
	authenticate: (token: string) => {},
	logout: () => {},
	updateUser: (data: userProps) => {},
});

function AuthContextProvider({children}: ChildProps) {
	const [authToken, setAuthToken] = useState<string | undefined>(undefined);
	const [user, setUser] = useState<userProps | undefined>(undefined);
	const [fireUser, setFireUser] = useState<userProps | undefined>(undefined);
	const [cart, setCart] = useState<userProps[]>([]);

	//trying to refcth userupdateddata frequesntly

	// useEffect(() => {
	// 	const fetchUserData = async () => {
	// 		try {
	// 			const data = await getCurrentUserData();
	// 			// setUser(data as any);
	// 			console.log(data, "Data im refreshing");
	// 		} catch (err: any) {
	// 			// setError(err.message);
	// 			console.log(err);
	// 		}
	// 	};

	// 	fetchUserData();
	// }, []);

	const [databaseUsers, users] = useObservingUser();
	console.log(databaseUsers, "Data from firestore");
	console.log(users, "userdata from firebase");

	useEffect(() => {
		const data = getLoginToken();
		if (data) {
			setAuthToken(data);
		}
	}, []);

	useEffect(() => {
		const data = getStoredFireUser();
		if (data) {
			setFireUser(data);
		}
	}, []);

	useEffect(() => {
		const data = getStoredUser();
		if (data) {
			setUser(data);
		}
	}, []);

	useEffect(() => {
		const data = getStoredCart();
		if (data) {
			setCart(data);
		}
	}, []);

	function logout() {
		setUser(undefined);
		setAuthToken(undefined);
		localStorage.clear();
	}
	function updateUser(data: userProps) {
		setUser(data);
	}

	function authenticate(data: string) {
		setAuthToken(data);
		const userObj: userProps = {
			id: "id" || "",
			firstName: "firstName" || "",
			lastName: "lastName" || "",
			email: "email" || "",
			gender: "",
			_id: "",
			uid: undefined,
			bio: "",
			photo: "",
			phone_number: "",
			courses: [],
			isVerified: false,
			imageUrl: "",
			twitter: "",
			linkedin: "",
			facebook: "",
			status: "Pending",
			total_courses: [],
			cart: cart ? [...cart] : [],
		};

		setUser(userObj);
		setStoredUser(userObj);
	}

	const value = {
		user: user,
		fireUser: fireUser,
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout,
		updateUser: updateUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
