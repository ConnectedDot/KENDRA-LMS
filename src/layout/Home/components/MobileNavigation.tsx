"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  Bars4Icon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo/kendra-re.png";
import { categories } from "./menu";

export default function MobileNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="">
      <nav aria-label="Global" className="mt-12">
        <div className="flex lg:hidden ml-4">
          <button type="button" onClick={() => setMobileMenuOpen(true)}>
            <Bars3Icon
              aria-hidden="true"
              className="h-6 w-6 border-none outline-none"
            />
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 left-0 z-10 w-[60%] overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between mr-4 ">
            <Link to="/" className="-m-1.5 p-1.5">
              {/* <img alt="" src={Logo} className="w-24 -p-8" /> */}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 border-none outline-none"
            >
              <XMarkIcon
                aria-hidden="true"
                className="h-4 w-4 border-none outline-none"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <div className="w-full">
                  {categories.map((category) => (
                    <Disclosure key={category.name} as="div" className="mt-2">
                      {({ open }: { open: boolean }) => (
                        <>
                          <DisclosureButton className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none outline-none border-none">
                            <span>{category.name}</span>
                            <ChevronRightIcon
                              className={`${
                                open ? "transform rotate-90 outline-none" : ""
                              } w-5 h-5 text-gray-500`}
                            />
                          </DisclosureButton>
                          <DisclosurePanel className="mt-2 space-y-2 ">
                            {category.subcategories.map((subcategory) => (
                              <DisclosureButton
                                key={subcategory.name}
                                as="a"
                                href={subcategory.path}
                                className="block rounded-lg py-0 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50 no-underline"
                              >
                                {subcategory.name}
                              </DisclosureButton>
                            ))}
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </div>
              <Link
                to=""
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 no-underline"
              >
                Teach on Kendra
              </Link>
              <div className="py-6">
                <Link
                  to="/create-account"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 no-underline"
                >
                  Get Started{" "}
                </Link>
                <Link
                  to="/teaching/join"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 no-underline"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
