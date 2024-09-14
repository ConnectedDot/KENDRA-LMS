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
  const data = getStoredUser();
  return data;
}

const totalLogout = async () => {
  signOut(auth)
    .then(() => {
      clearLocalStorage();
    })
    .catch((error) => {
      console.error("Error during total logout:", error);
    });
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
    imageUrl: "",
    total_courses: [],
    twitter: "",
    linkedin: "",
    facebook: "",
    status: "Pending",
    cart: [],
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
