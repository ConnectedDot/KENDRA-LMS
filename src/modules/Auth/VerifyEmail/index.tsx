import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { getAuth, applyActionCode } from "firebase/auth";
import { VerifiedOutlined } from "@ant-design/icons";
import { Loader } from "../../../components";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get("oobCode");

    if (!oobCode) {
      setError("Invalid verification link");
      setIsLoading(false);
      return;
    }

    const auth = getAuth();

    applyActionCode(auth, oobCode)
      .then(async () => {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, "KLMS-USER", user.uid);
          await updateDoc(userDocRef, { isVerified: true });
          message.success("Email verified successfully");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          throw new Error("User not authenticated.");
        }
      })
      .catch((error) => {
        console.error("Error verifying email:", error);
        const errorMessage = error?.message || "Failed to verify email";
        setError(errorMessage);
        setIsLoading(false);
      });
  }, [location, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <main className="h-screen items-center justify-center grid place-items-center bg-white">
          <div className="flex flex-col justify-center items-center text-center">
            <VerifiedOutlined style={{ fontSize: "48px", color: "black" }} />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Email verified successfully{" "}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              You can proceed to learning{" "}
            </p>
          </div>
        </main>
      )}
    </div>
  );
};

export default VerifyEmail;
