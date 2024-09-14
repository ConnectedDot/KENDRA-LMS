import { createContext, useEffect, useState } from "react";
import { queryKeys } from "../react-query/constants";
import {
  getLoginToken,
  getStoredCart,
  getStoredUser,
  setStoredUser,
} from "../storage";
// import { getDecodedJWT, isAuthenticated } from '../utils';
import { useAuthenticatedUser } from "./hooks";
import { useQueryClient } from "@tanstack/react-query";
import { ChildProps, userProps } from "../interface";

export const AuthContext = createContext({
  user: undefined as userProps | undefined,
  token: undefined as string | undefined,
  isAuthenticated: false,
  authenticate: (token: string) => {},
  logout: () => {},
  updateUser: (data: userProps) => {},
});

function AuthContextProvider({ children }: ChildProps) {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<userProps | undefined>(undefined);
  const [cart, setCart] = useState<userProps[]>([]);
  const userDetails = useAuthenticatedUser();
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     logout();
  //   }
  // }, []);

  useEffect(() => {
    const data = getLoginToken();
    if (data) {
      setAuthToken(data);
    }
  }, []);

  useEffect(() => {
    const data = getStoredUser();
    console.log(data, "data");
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

  // useEffect(() => {
  //   if (userDetails) {
  //     setUser(userDetails);
  //   }
  // }, [userDetails]);

  function logout() {
    setUser(undefined);
    setAuthToken(undefined);
    localStorage.clear();
    // queryClient.invalidateQueries([queryKeys.user]);
  }
  function updateUser(data: userProps) {
    setUser(data);
  }

  function authenticate(data: string) {
    setAuthToken(data);
    // const decoded = getDecodedJWT();

    const userObj: userProps = {
      id: "id" || "",
      firstName: "firstName" || "",
      lastName: "lastName" || "",
      email: "email" || "",
      gender: "",
      _id: "",
      uid: undefined,
      bio: "",
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
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    updateUser: updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
