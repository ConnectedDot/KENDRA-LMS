import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context";
import InstLayout from "../../layout/Instructor";
import Navbarin from "../../layout/Instructor/Navbar";

const Dashboard = () => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};

	const {user} = useContext(AuthContext);
	console.log(user, "user");
	return (
		<Navbarin>
			<h1>Instructor's Dashbiord</h1>
		</Navbarin>
	);
};

export default Dashboard;
