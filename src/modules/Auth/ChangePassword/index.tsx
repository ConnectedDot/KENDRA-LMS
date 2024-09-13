import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { getAuth, confirmPasswordReset } from "firebase/auth";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";

import Logo from "../../../assets/Logo/kendra-re.png";
import { FirebaseError } from "firebase/app";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [oobCode, setOobCode] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const mode = queryParams.get("mode");
    const oobCode = queryParams.get("oobCode");
    const apiKey = queryParams.get("apiKey");

    if (mode === "resetPassword" && oobCode && apiKey) {
      setOobCode(oobCode);
      setApiKey(apiKey);
    } else {
      message.error("Invalid password reset link");
      navigate("/login");
    }
  }, [navigate]);

  const handlePasswordReset = async (
    newPassword: string,
    confirmPassword: string
  ) => {
    if (newPassword !== confirmPassword) {
      message.error("Passwords don't match");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const auth = getAuth();
      await confirmPasswordReset(auth, oobCode!, newPassword);
      message.success("Password reset successfully");
      navigate("/login");
    } catch (error: any) {
      console.error("Error confirming password reset:", error);
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
      message.error(errorMessage);
      setIsLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e?: any) => {
    console.log("He clicked me");
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    handlePasswordReset(formData.password, formData.confirmPassword);
  };

  return (
    <section>
      <div className="flex  h-screen relative justify-center lg:px-0 items-center lg:h-screen md:px-12 overflow-hidden">
        <div className="bg-white px-4 relative flex flex-1 flex-col lg:py-24 md:flex-none md:px-28 py-10 sm:justify-center xl:py-36 z-10">
          <div className="w-full lg:h-full max-w-md md:max-w-sm md:px-0 md:w-96 mx-auto sm:px-4">
            <div className="flex flex-col">
              <div>
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="flex h-16 w-16 rounded-full "
                  />{" "}
                  <h2 className="flex font-bold leading-tight text-black text-3xl font-display">
                    Change Password{" "}
                  </h2>{" "}
                  <div className="mb-8 mt-8 text-sm text-center font-medium text-black">
                    Plaease, input a new and strong password with special
                    characters.
                  </div>
                </div>
              </div>
            </div>
            <form>
              <div className="space-y-6">
                <div className="col-span-full relative">
                  <label className="sr-only" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
                    placeholder="Password here..."
                    type={isPasswordVisible ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    {isPasswordVisible ? (
                      <EyeInvisibleOutlined style={{ color: "black" }} />
                    ) : (
                      <EyeTwoTone twoToneColor="black" />
                    )}
                  </button>
                </div>

                <div className="col-span-full relative">
                  <label className="sr-only" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
                    placeholder="Password here..."
                    type={isPasswordVisible ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    {isPasswordVisible ? (
                      <EyeInvisibleOutlined style={{ color: "black" }} />
                    ) : (
                      <EyeTwoTone twoToneColor="black" />
                    )}
                  </button>
                </div>

                <div className="col-span-full">
                  <button
                    onClick={handleSubmit}
                    className="items-center justify-center h-12 rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 focus-visible:ring-black hover:bg-gray-500 hover:text-black px-6 py-3 text-center text-white w-full"
                    type="submit"
                  >
                    Submit{" "}
                    <span className="ml-3">
                      {isLoading && (
                        <LoadingOutlined
                          style={{
                            fontSize: 16,
                            fontWeight: "500",
                            color: "black",
                          }}
                          spin
                        />
                      )}
                    </span>
                  </button>
                </div>
                <div className="space-y-4 ">
                  <p className="flex justify-center font-medium text-sm leading-tight text-black">
                    <Link
                      className="text-accent-500 hover:text-accent-400 ml-3"
                      to="/login"
                    >
                      Return to login{" "}
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
