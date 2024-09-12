import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/constants";
import { useContext } from "react";
import { AuthContext } from "../../context";
// import { isAuthenticated } from '../../utils';
import { axiosInstance } from "../../axios-Instance";
import {
  getLoginToken,
  getStoredUser,
  setLoginToken,
  setStoredUser,
} from "../../storage";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";

const userProfile = async () => {
  const data = await axiosInstance({
    url: "/auth/me",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data?.data?.data;
};

export function useAuthenticatedUser() {
  // const authCtx = useContext(AuthContext);
  // const fallback = undefined;
  const data = getStoredUser();
  // const { data = fallback } = useQuery({
  //   // enabled: isAuthenticated(),
  //   queryKey: [queryKeys.user],
  //   queryFn: () => userProfile(),
  //   onSuccess: (data: any) => {
  //     authCtx.updateUser(data);
  //     setStoredUser(data);
  //   },
  //   onError: (error: any) => {
  //     authCtx.logout();
  //   },
  // });
  return data;
}

const totalLogout = async () => {
  signOut(auth)
    .then(() => {
      // queryClient.removeQueries();
      clearLocalStorage();
    })
    .catch((error) => {
      console.error("Error during total logout:", error);
    });

  // try {
  //   await signOut(auth);

  //   queryClient.removeQueries();
  //   clearLocalStorage();
  // } catch (error) {
  //   console.error("Error during total logout:", error);
  // }
};

function clearLocalStorage() {
  setStoredUser({
    id: "",
    uid: "",
    _id: "",
    gender: "",
    lastName: "",
    firstName: "",
    email: "",
    isVerified: false,
    bio: "",
    phone_number: "",
    courses: [],
    profile_picture: "",
    total_courses: [],
    twitter: "",
    linkedin: "",
    facebook: "",
    status: "Pending",
  });
  setLoginToken("");
  localStorage.clear();
}

export function useFullLogout() {
  const navigate = useNavigate();

  const fullLogout = async () => {
    await totalLogout();
    navigate("/login");
  };

  return fullLogout;
}
