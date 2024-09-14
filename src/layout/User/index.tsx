import {Outlet} from "react-router-dom";
import {LayoutProps} from "../../interface";

const Layouts = ({children}: LayoutProps) => {
	return (
		<>
			<h1>User Layout</h1>
			<main className="mt-8">{children}</main>
		</>
	);
};

export default Layouts;
