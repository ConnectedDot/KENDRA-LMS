import React, {Fragment, useState} from "react";
import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import {LockClosedIcon} from "@heroicons/react/20/solid";
import {useFirebaseRegister} from "../../hooks/auth";
import useCreateAndStoreUsers from "../../modules/Admin/hooks";
import {LoadingOutlined} from "@ant-design/icons";

interface SigninProps {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

interface User {
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	isVerified: boolean;
	password: string;
	photo: string;
}

const SigninModal: React.FC<SigninProps> = ({
	isOpen,
	openModal,
	closeModal,
}) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		role: "User",
		isVerified: true,
		photo: "",
	});

	const {mutate, loading, error} = useCreateAndStoreUsers();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// setIsLoading(true);

		// if (!validateForm()) {
		// 	// setIsLoading(false);
		// 	return;
		// }

		try {
			await mutate([formData]);
			closeModal();
		} catch (error) {
			// Handle error here
			// console.error(error);
			// setIsLoading(false);
		}
	};

	// const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const {name, value, type, checked} = e.target;
	// 	const updatedFormData = new FormData();
	// 	formData.forEach((value, key) => {
	// 		updatedFormData.append(key, value);
	// 	});
	// 	if (type === "checkbox") {
	// 		updatedFormData.set(name, checked.toString());
	// 	} else {
	// 		updatedFormData.set(name, value);
	// 	}
	// 	setFormData(updatedFormData);
	// };

	// console.log(formData);

	// const createUser = (): User => {
	// 	return {
	// 		email: formData.get("email") as string,
	// 		firstName: formData.get("firstName") as string,
	// 		lastName: formData.get("lastName") as string,
	// 		role: formData.get("role") as string,
	// 		isVerified: formData.get("isVerified") === "true",
	// 		password: formData.get("password") as string,
	// 		photo: formData.get("photo") as string,
	// 	};
	// };

	console.log(formData);

	const handleInputChange = (e?: any) => {
		const {name, value} = e.target;
		setFormData(prevData => ({...prevData, [name]: value}));
	};

	return (
		<React.Fragment>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</TransitionChild>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<TransitionChild
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<div className="flex min-h-full items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
										<div className="w-full max-w-md space-y-4">
											<div>
												<h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">
													Create a new user{" "}
												</h2>
											</div>
											<form className="mt-8 space-y-6" action="#" method="POST">
												<input
													type="hidden"
													name="remember"
													defaultValue="true"
												/>
												<div className="rounded-md shadow-sm space-y-4">
													<div>
														<label htmlFor="email-address" className="sr-only">
															First Name
														</label>
														<input
															id="name"
															name="firstName"
															type="firstName"
															autoComplete="firstName"
															required
															className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
															placeholder="First Name"
															onChange={handleInputChange}
														/>
													</div>
													<div>
														<label htmlFor="password" className="sr-only">
															Last Name
														</label>
														<input
															id=" name"
															name="lastName"
															type="lastName"
															autoComplete="lastName"
															required
															className="relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
															placeholder="Last Name"
															onChange={handleInputChange}
														/>
													</div>
												</div>
												<div className="rounded-md shadow-sm space-y-4">
													<div>
														<label htmlFor="email-address" className="sr-only">
															Email address
														</label>
														<input
															id="email-address"
															name="email"
															type="email"
															autoComplete="email"
															required
															className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
															placeholder="Email address"
															onChange={handleInputChange}
														/>
													</div>
													<div>
														<label htmlFor="password" className="sr-only">
															Password
														</label>
														<input
															id="password"
															name="password"
															type="password"
															autoComplete="current-password"
															required
															className="relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
															placeholder="Password"
															onChange={handleInputChange}
														/>
													</div>
												</div>

												<div>
													<button
														onClick={handleSubmit}
														className="items-center justify-center h-12 rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 focus-visible:ring-black hover:bg-gray-500 hover:text-black px-6 py-3 text-center text-white w-full"
														type="submit"
														// className="group relative flex w-full justify-center rounded-md border border-transparent bg-Blueviolet py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
													>
														Submit{" "}
														{loading && (
															<LoadingOutlined
																style={{
																	fontSize: 16,
																	fontWeight: "500",
																	// color: "black",
																}}
																spin
															/>
														)}
													</button>
												</div>
											</form>
										</div>
									</div>

									<div className="mt-4 flex justify-end">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeModal}
										>
											Cancel
											<span className="ml-3"></span>
										</button>
									</div>
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
		</React.Fragment>
	);
};

export default SigninModal;
