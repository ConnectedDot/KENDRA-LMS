import {
	EyeInvisibleOutlined,
	EyeTwoTone,
	GooglePlusOutlined,
	LoadingOutlined,
} from "@ant-design/icons";
import React, {useState} from "react";
import {useFirebaseGoogleLogin, useFirebaseRegister} from "../../../hooks/auth";
import {Link, useNavigate} from "react-router-dom";
import {message} from "antd";
import Logo from "../../../assets/Logo/kendra-re.png";
import {useIsMutating} from "@tanstack/react-query";

const Registration = () => {
	const navigate = useNavigate();
	const [isChecked, setIsChecked] = useState(false);
	// const [isLoading, setIsLoading] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		role: "Instructor",
	});

	const {mutate} = useFirebaseRegister();
	const {mutate: google} = useFirebaseGoogleLogin();
	const isLoading = useIsMutating();
	const handleInputChange = (e?: any) => {
		const {name, value} = e.target;
		setFormData(prevData => ({...prevData, [name]: value}));
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

		if (!formData.firstName) {
			message.error("First Name is required");
			isValid = false;
		}

		if (!formData.lastName) {
			message.info("Last Name is required");
			isValid = false;
		}

		// Add more validation rules as needed

		return isValid;
	};

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// setIsLoading(true);

		if (!validateForm()) {
			// setIsLoading(false);
			return;
		}

		try {
			await mutate(formData);
			// setIsLoading(false);
		} catch (error) {
			// Handle error here
			// console.error(error);
			// setIsLoading(false);
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
									<Link to="/">
										<img
											src={Logo}
											alt="Logo"
											className="flex h-16 w-16 rounded-full "
										/>
									</Link>
									<h2 className="flex font-bold leading-tight text-black text-3xl font-display">
										Sign Up
									</h2>
								</div>
								<div className="py-3">
									<span className="w-full inline-flex relative mt-3 z-0">
										<button
											onClick={handleGoogleSignIn}
											className="w-full focus:outline-none h-12 border py-3 bg-white border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 focus:z-10 font-medium hover:bg-gray-50 inline-flex items-center justify-center px-4 relative rounded-xl text-gray-700 text-sm"
											type="button"
										>
											<span className="flex mr-4">Sign up with</span>
											<GooglePlusOutlined style={{fontSize: "24px"}} />
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
							<div className="space-y-4">
								<div>
									<label htmlFor="firstName" className="sr-only">
										First Name{" "}
									</label>

									<input
										id="name"
										name="firstName"
										value={formData.firstName}
										onChange={handleInputChange}
										className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
										placeholder="First Name."
									/>
								</div>
								<div className="col-span-full">
									<label className="sr-only" htmlFor="lastName">
										Last Name
									</label>
									<input
										id="lastname"
										name="lastName"
										value={formData.lastName}
										onChange={handleInputChange}
										className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
										placeholder="Last Name"
									/>
								</div>
								<div>
									<label htmlFor="email" className="sr-only">
										Email Adress{" "}
									</label>

									<input
										id="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										className="w-full focus:outline-none border py-1 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
										placeholder="Email Address"
										autoComplete="email"
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
										autoComplete="new-password"
									/>
									<button
										type="button"
										onClick={togglePasswordVisibility}
										className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
									>
										{isPasswordVisible ? (
											<EyeInvisibleOutlined style={{color: "black"}} />
										) : (
											<EyeTwoTone twoToneColor="black" />
										)}
									</button>
								</div>
								<div className="flex">
									<div className="flex items-start">
										<input
											className="text-accent-500 focus:ring-accent-500 border-accent-500 h-4 rounded w-4"
											id="remember-me"
											name="remember-me"
											type="checkbox"
											onChange={() => setIsChecked(!isChecked)}
										/>
										<label
											className="font-medium text-xs block leading-tight ml-2 text-gray-500"
											htmlFor="remember-me"
										>
											Creating an account means you’re okay with our{" "}
											<Link
												to="/terms"
												className="font-bold text-accent-800 hover:text-accent-400"
											>
												Terms of Service,{" "}
											</Link>
											Privacy Policy, and our default Notification Settings.
										</label>
									</div>
								</div>
								<div className="col-span-full">
									<button
										onClick={handleSubmit}
										className="items-center justify-center h-12 rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 focus-visible:ring-black hover:bg-gray-500 hover:text-black px-6 py-3 text-center text-white w-full"
										type="submit"
									>
										Create an account{" "}
										<span className="ml-3">
											{isLoading && (
												<LoadingOutlined
													style={{
														fontSize: 16,
														fontWeight: "500",
														// color: "black",
													}}
													spin
												/>
											)}
										</span>
									</button>
								</div>
								<div className="space-y-4 ">
									<p className="flex justify-center font-medium text-sm leading-tight text-black">
										Already a member?{" "}
										<Link
											className="text-accent-500 hover:text-accent-400 ml-3"
											to="/login"
										>
											Sign in
										</Link>
									</p>
									<p className="font-medium text-xs leading-tight text-gray-500">
										This site is protected by reCAPTCHA and the Google Privacy
										Policy and Terms of Service apply.
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

export default Registration;
