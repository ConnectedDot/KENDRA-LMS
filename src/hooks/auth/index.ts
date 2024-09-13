import { useContext, useEffect, useState } from "react";
import { useMutation, MutationFunction } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../Firebase";
import { AuthContext } from "../../context";
import { userProps } from "../../interface";
import { setLoginToken, setStoredUser } from "../../storage";
import { PrivatePaths } from "../../routes/path";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import { message } from "antd";

interface UpdateUserData {
  userId: string;
  updatedData: Record<string, any>;
}

interface User {
  email: string;
  // Add other properties if necessary
}

const database = getFirestore();

const SERVER_ERROR = "There was an error contacting the server.";

export function useFirebaseLogin() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const mutationFn: MutationFunction<
    { userData: userProps; token: string },
    { email: string; password: string }
  > = async (formData) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const user = userCredential.user;

    if (user) {
      const userDocRef = doc(db, "KLMS-USER", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as userProps;
        const token = await user.getIdToken();
        return { userData, token };
      } else {
        throw new Error("User data not found in Firestore.");
      }
    } else {
      throw new Error("User not authenticated.");
    }
  };

  return useMutation({
    mutationFn,
    onSuccess: ({ userData, token }) => {
      if (userData.isVerified === false) {
        navigate(`/verify-email?email=${encodeURIComponent(userData?.email)}`);
        // message.info("Please, verify your email address");
        return;
      } else {
        setStoredUser(userData);
        message.success("Logged in successfully");
        setLoginToken(token);

        // Handle role-based redirection
        if (userData.role === "Admin") {
          navigate(`${PrivatePaths.ADMIN}dashboard`);
        } else {
          navigate(`${PrivatePaths.USER}dashboard`);
        }
      }
    },
    onError: (error: any) => {
      let errorMessage = "An unexpected error occurred.";

      if (error instanceof FirebaseError) {
        errorMessage = error.message.replace(/^Firebase: /, "");
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const err = error as {
          response: { data: { error: { message: string } } };
        };
        if (err.response && err.response.data && err.response.data.error) {
          errorMessage = err.response.data.error.message;
        }
      }

      message.info(errorMessage);
    },
  });
}

export function useFirebaseGoogleLogin() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const mutationFn: MutationFunction<
    { userData: userProps; token: string },
    void
  > = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();
    const userDocRef = doc(db, "KLMS-USER", user.uid);
    const userDoc = await getDoc(userDocRef);
    const userId = `user${Date.now()}`;

    let userData: userProps;

    if (userDoc.exists()) {
      // Existing user
      userData = userDoc.data() as userProps;
    } else {
      // New user, initialize user data
      userData = {
        _id: "",
        id: userId,
        uid: user.uid,
        gender: "",
        email: user.email ?? "",
        role: "User",
        isVerified: user.emailVerified,
        firstName: user.displayName?.split(" ")[1] || "",
        lastName: user.displayName?.split(" ")[0] || "",
        bio: "",
        phone_number: "",
        courses: [],
        total_courses: [],
        twitter: "",
        linkedin: "",
        facebook: "",
        status: "Pending",
        cart: [],

        profile_picture: user.photoURL || "",

        // Add the remaining properties from the 'userProps' type
      };
      await setDoc(userDocRef, userData);
    }

    return { userData, token };
  };

  return useMutation({
    mutationFn,
    onSuccess: ({ userData, token }) => {
      setStoredUser(userData);
      message.success("Logged in successfully");
      setLoginToken(token);

      // Handle role-based redirection
      if (userData.role === "Admin") {
        navigate(`${PrivatePaths.ADMIN}dashboard`);
      } else {
        navigate(`${PrivatePaths.USER}dashboard`);
      }
    },
    onError: (error: any) => {
      let errorMessage = "An unexpected error occurred.";

      if (error instanceof FirebaseError) {
        errorMessage = error.message.replace(/^Firebase: /, "");
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const err = error as {
          response: { data: { error: { message: string } } };
        };
        if (err.response && err.response.data && err.response.data.error) {
          errorMessage = err.response.data.error.message;
        }
      }

      message.info(errorMessage);
    },
  });
}

export function useFirebaseRegister() {
  const navigate = useNavigate();

  const mutationFn: MutationFunction<
    { userData: any },
    { email: string; password: string; [key: string]: any }
  > = async (formData) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const user = userCredential.user;

    if (user) {
      await sendEmailVerification(user);
      console.log("Email verification sent to:", user.email);

      const userId = `user${Date.now()}`;
      const userData = {
        ...formData,
        id: userId,
        uid: user.uid,
        isVerified: false,
      };

      await setDoc(doc(db, "KLMS-USER", user.uid), userData);

      return { userData, email: formData.email }; // Return email as well
    } else {
      throw new Error("User not authenticated.");
    }
  };

  return useMutation({
    mutationFn,
    onSuccess: ({ userData }) => {
      message.success("Verification email sent. Please check your inbox.");
      console.log(userData, "userData after registration");
      // navigate("/login");
      navigate(`/verify-email?email=${encodeURIComponent(userData?.email)}`);
    },
    onError: (error: any) => {
      let errorMessage = "An unexpected error occurred.";

      if (error instanceof FirebaseError) {
        errorMessage = error.message.replace(/^Firebase: /, "");
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const err = error as {
          response: { data: { error: { message: string } } };
        };
        if (err.response && err.response.data && err.response.data.error) {
          errorMessage = err.response.data.error.message;
        }
      }

      message.success(errorMessage);
    },
  });
}

const updateUser: MutationFunction<void, UpdateUserData> = async ({
  userId,
  updatedData,
}) => {
  const gpphotoId = `gp-user${Date.now()}`;
  let photoURL = "";

  if (updatedData.imageUrl instanceof File) {
    const storage = getStorage();
    const photoRef = ref(storage, `photos/${gpphotoId}`);
    await uploadBytes(photoRef, updatedData.imageUrl);
    photoURL = await getDownloadURL(photoRef);
  } else if (typeof updatedData.imageUrl === "string") {
    photoURL = updatedData.imageUrl;
  }

  const userRef = doc(db, "KLMS-USER", userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    throw new Error("User does not exist");
  }

  const currentData = userDoc.data();
  const gpUserData: Record<string, any> = {
    ...currentData,
    ...updatedData,
    imageUrl: photoURL || currentData.imageUrl,
  };

  // Ensure no File objects are passed to Firestore
  if (gpUserData.imageUrl instanceof File) {
    delete gpUserData.imageUrl;
  }

  await updateDoc(userRef, gpUserData);

  await setStoredUser(gpUserData as any);
};

export function useUpdateUser() {
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      message.success("User data updated successfully");
    },
    onError: (error: any) => {
      console.error("Error updating user data:", error);
      message.error("Error updating user data");
    },
  });
}

export function useFetchUserEmails() {
  const [emails, setEmails] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const candidatesCollection = collection(db, "KLMS-USER");
        const snapshot: QuerySnapshot = await getDocs(candidatesCollection);
        const candidates = snapshot.docs.map((doc) => doc.data() as User);
        setEmails(candidates);
      } catch (error) {
        setError("Error fetching users");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();

    // Optional: Cleanup function if necessary
    return () => {
      // Cancel requests or cleanup if needed
    };
  }, []);

  return { emails, loading, error };
}
