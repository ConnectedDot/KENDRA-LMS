import React from "react";
import Navbarin from "../../layout/Instructor/Navbar";
import ProfilePageAll from "../Instructors/Profile/components";

const Profile = () => {
	return (
		<>
			<Navbarin title={"User Profile Page | Kendra LMS"}>
				<ProfilePageAll />
			</Navbarin>
		</>
	);
};

export default Profile;
