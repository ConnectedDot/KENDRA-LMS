import React from "react";
import Navbarin from "../../../layout/Instructor/Navbar";
import ProfilePageAll from "./components";

const Profile = () => {
	return (
		<Navbarin title={"Profile Page | Kendra LMS"}>
			<ProfilePageAll />
		</Navbarin>
	);
};

export default Profile;
