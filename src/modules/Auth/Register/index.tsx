import React from "react";

const Registration = () => {
  return (
    <section>
      <div className="flex relative justify-center lg:px-0 items-center lg:h-screen md:px-12 overflow-hidden">
        <div className="bg-white px-4 relative flex flex-1 flex-col lg:py-24 md:flex-none md:px-28 py-10 sm:justify-center xl:py-36 z-10">
          <div className="w-full lg:h-full max-w-md md:max-w-sm md:px-0 md:w-96 mx-auto sm:px-4">
            <div className="flex flex-col">
              <div>
                <h2 className="font-medium leading-tight text-black text-xl font-display">
                  Sign up to AstroSaaS
                </h2>
                <div className="py-3">
                  <span className="w-full inline-flex relative mt-3 z-0">
                    <button
                      className="w-full focus:outline-none h-12 border py-3 bg-white border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:z-10 font-medium hover:bg-gray-50 inline-flex items-center justify-center px-4 relative rounded-xl text-gray-700 text-sm"
                      type="button"
                    >
                      <span>Sign up with</span>
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
                <div className="w-full flex flex-row gap-3">
                  <div className="w-full">
                    <label className="sr-only" htmlFor="first_name">
                      First name
                    </label>
                    <input
                      className="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
                      id="first_name"
                      name="first_name"
                      autoComplete="given-name"
                      required={true}
                    />
                  </div>
                  <div className="w-full">
                    <label className="sr-only" htmlFor="last_name">
                      Last name
                    </label>
                    <input
                      className="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
                      id="last_name"
                      name="last_name"
                      autoComplete="family-name"
                      required={true}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email Adress{" "}
                  </label>

                  <input
                    id="email"
                    name="email"
                    className="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
                    placeholder="Type here..."
                  />
                </div>
                <div className="col-span-full">
                  <label className="sr-only" htmlFor="company">
                    Password
                  </label>
                  <input
                    id="company"
                    name="company"
                    className="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
                    placeholder="Type password here..."
                    type="password"
                  />
                </div>
                <div className="flex">
                  <div className="flex items-start">
                    <input
                      className="text-accent-500 focus:ring-accent-500 border-accent-500 h-4 rounded w-4"
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                    />
                    <label
                      className="font-medium text-xs block leading-tight ml-2 text-gray-500"
                      htmlFor="remember-me"
                    >
                      Creating an account means you’re okay with our{" "}
                      <a
                        className="text-accent-500 hover:text-accent-400"
                        href="/terms"
                      >
                        Terms of Service,
                      </a>
                      <a
                        className="text-accent-500 hover:text-accent-400"
                        href="/privacy"
                      >
                        Privacy Policy
                      </a>
                      , and our default{" "}
                      <a
                        className="text-accent-500 hover:text-accent-400"
                        href="/notifications"
                      >
                        Notification Settings.
                      </a>
                    </label>
                  </div>
                </div>
                <div className="col-span-full">
                  <button
                    className="items-center justify-center h-12 rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 border-black duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black px-6 py-3 text-center text-white w-full"
                    type="submit"
                  >
                    Create an account
                  </button>
                </div>
                <div className="space-y-4">
                  <p className="font-medium text-sm leading-tight text-black">
                    Already a member?{" "}
                    <a
                      className="text-accent-500 hover:text-accent-400 ml-3"
                      href="/login"
                    >
                      Sign in
                    </a>
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
