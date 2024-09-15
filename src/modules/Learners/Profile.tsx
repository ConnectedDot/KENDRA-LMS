import React from "react";
import Navbarin from "../../layout/Instructor/Navbar";
import ProfilePageAll from "../Instructors/Profile/components";

const Profile = () => {
	return (
		<>
			<Navbarin>
				<ProfilePageAll />
			</Navbarin>
		</>
	);
};

export default Profile;
