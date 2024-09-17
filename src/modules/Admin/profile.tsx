import React from "react";
import ProfilePageAll from "../Instructors/Profile/components";
import Navbarin from "../../layout/Instructor/Navbar";

const Profile = () => {
	return (
		<Navbarin title={"Admin's Profile Page | Kendra LMS"}>
			<ProfilePageAll />
		</Navbarin>
	);
};

export default Profile;
