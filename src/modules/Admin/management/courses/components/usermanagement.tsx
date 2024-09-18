import Navbarin from "../../../../../layout/Instructor/Navbar";
import {MdArrowBack} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import TableComponent from "../../components/tablecomponent";
import Footer from "../../../../../components/Footer";

const UserManagementTabs = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<Navbarin title={"Admin's User Management | Kendra LMS"}>
			<section className="flex justify-between mt-2">
				<button
					className="flex items-center mb-1 text-sm gap-3 font-medium text-gray-700 rounded-xl py-2 px-4 dark:bg-white dark:text-gray-600 dark:hover:text-black"
					onClick={handleGoBack}
				>
					<MdArrowBack /> Go Back
				</button>
			</section>
			<section className="mt-4 px-0 md:mx-0 rounded-3xl bg-white dark:bg-black bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
				<div className="py-2 px-4 mx-auto max-w-screen-xl text-center lg:py-6 z-10 relative">
					<h1 className="mb-4 mx-8 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
						User management
					</h1>
					<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
						Manage all users, including adding, editing, and removing users.
					</p>
				</div>
			</section>
			<section className="mt-4">
				<TableComponent />
			</section>
			<section className="mt-4 py-4"></section>
		</Navbarin>
	);
};

export default UserManagementTabs;
