import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Divider, Form, Input, message } from "antd";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GooglePlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  useFirebaseGoogleLogin,
  useFirebaseLogin,
  useFirebaseRegister,
} from "../../../hooks/auth";
import Logo from "../../../assets/Logo/kendra-re.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e?: any) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setIsLoading(true);

    const auth = getAuth();
    const email = formData.email;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        message.success(`Password reset mail sent to ${email}`);
        setIsLoading(false);
        navigate("/login");
      })
      .catch((error: { code: any; message: any }) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        message.error(errorMessage);
      });
  };

  return (
    <section>
      <div className="flex  h-screen relative justify-center lg:px-0 items-center lg:h-screen md:px-12 overflow-hidden">
        <div className="bg-white px-4 relative flex flex-1 flex-col lg:py-24 md:flex-none md:px-28 py-10 sm:justify-center xl:py-36 z-10">
          <div className="w-full lg:h-full max-w-md md:max-w-sm md:px-0 md:w-96 mx-auto sm:px-4">
            <div className="flex flex-col">
              <div>
                <div className="flex flex-col justify-center items-center">
                  <Link to="/">
                    <img
                      src={Logo}
                      alt="Logo"
                      className="flex h-16 w-16 rounded-full "
                    />
                  </Link>
                  <h2 className="flex font-bold leading-tight text-black text-3xl font-display">
                    Recover Password{" "}
                  </h2>{" "}
                  <div className="mb-8 mt-8 text-sm text-center font-medium text-black">
                    Enter the email address associated with your account and
                    we'll send you a link to reset your password.
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
