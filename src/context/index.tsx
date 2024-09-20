import {createContext, useEffect, useState} from "react";
import {
	getLoginToken,
	getStoredCart,
	getStoredFireUser,
	getStoredUser,
	setStoredUser,
} from "../storage";
import {
	ChildProps,
	CombinedUserProps,
	instructorProps,
	userProps,
} from "../interface";

export const AuthContext = createContext({
	user: undefined as userProps | undefined,
	token: undefined as string | undefined,
	isAuthenticated: false,
	authenticate: (token: string) => {},
	logout: () => {},
	updateUser: (data: userProps) => {},
	cart: [] as any[],
	setCart: (cart: any[]) => {},
});

function AuthContextProvider({children}: ChildProps) {
	const [authToken, setAuthToken] = useState<string | undefined>(undefined);
	const [user, setUser] = useState<userProps | undefined>(undefined);
	const [fireUser, setFireUser] = useState<userProps | undefined>(undefined);
	const [cart, setCart] = useState<userProps[]>([]);

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
		const fetchUserDetails = async () => {
			const userDetails = await getStoredUser();
			if (userDetails) {
				setUser(userDetails);
			}
		};

		fetchUserDetails();
	}, []);

	useEffect(() => {
		const fetchCart = async () => {
			const data = await getStoredCart();
			if (data) {
				setCart(data);
			}
		};

		fetchCart();
	}, []);

	function logout() {
		setUser(undefined);
		setAuthToken(undefined);
		localStorage.clear();
	}

	function updateUser(data: userProps) {
		setUser(prevUser => ({...prevUser, ...data}));
	}

	function authenticate(data: string) {
		setAuthToken(data);
		const userObj: CombinedUserProps = {
			_id: "",
			id: "",
			uid: undefined,
			gender: "",
			email: "",
			firstName: "",
			lastName: "",
			bio: "",
			phone_number: "",
			courses: [],
			isVerified: false,
			photo: "",
			total_courses: [],
			twitter: "",
			linkedin: "",
			facebook: "",
			cart: [],
			status: "Pending",
			token: "",
			expertise: "",
			total_students: 0,
			total_reviews: [],
			skill_level: [],
			website: "",
			instagram: "",
			youtube: "",
			certification: null,
			isApproved: false,
			photoURL: "",
			role: "",
			emailVerified: "",
			displayName: "",
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
		cart: cart,
		setCart: setCart,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
