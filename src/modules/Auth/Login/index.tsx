import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GooglePlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import {
  useFirebaseGoogleLogin,
  useFirebaseLogin,
  useFirebaseRegister,
} from "../../../hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import Logo from "../../../assets/Logo/kendra-re.png";

const Login = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate } = useFirebaseLogin();
  const { mutate: google } = useFirebaseGoogleLogin();
  const handleInputChange = (e?: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;

    if (!formData.email) {
      message.error("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      message.warning("Email is invalid");
      isValid = false;
    }

    if (!formData.password) {
      message.error("Password is required");
      isValid = false;
    } else if (formData.password.length < 6) {
      message.warning("Password must be at least 6 characters");
      isValid = false;
    }

    return isValid;
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await mutate(formData);
      setIsLoading(false);
    } catch (error) {
      // Handle error here
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = (e: React.FormEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    google();
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
                    Sign In
                  </h2>{" "}
                </div>
                <div className="py-3">
                  <span className="w-full inline-flex relative mt-3 z-0">
                    <button
                      onClick={handleGoogleSignIn}
                      className="w-full focus:outline-none h-12 border py-3 bg-white border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 focus:z-10 font-medium hover:bg-gray-50 inline-flex items-center justify-center px-4 relative rounded-xl text-gray-700 text-sm"
                      type="button"
                    >
                      <span className="flex mr-4">Sign in with</span>
                      <GooglePlusOutlined style={{ fontSize: "24px" }} />
                      <span className="ml-3"></span>
                    </button>
                  </span>
                  <div className="py-3 relative">
                    <div
                      className="flex absolute inset-0 items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="flex relative justify-center">
                      <span className="bg-white text-sm px-2 text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form>
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email Adress{" "}
                  </label>

                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
                    placeholder="Email Address"
                  />
                </div>
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
                      <EyeInvisibleOutlined />
                    ) : (
                      <EyeTwoTone />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      className="text-accent-500 focus:ring-accent-500 border-accent-500 h-4 rounded w-4"
                      type="checkbox"
                      id="remember-me"
                      name="remember-me"
                    />
                    <label
                      className="font-medium text-sm block leading-tight ml-2 text-black"
                      htmlFor="remember-me"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      className="font-medium hover:text-accent-500 text-accent-500"
                      to="/forget-password"
                    >
                      Forgot your password?
                    </Link>
                  </div>
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
                    Not a member?{" "}
                    <Link
                      className="text-accent-500 hover:text-accent-400 ml-3"
                      to="/create-account"
                    >
                      Sign up now
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
};

export default Login;
