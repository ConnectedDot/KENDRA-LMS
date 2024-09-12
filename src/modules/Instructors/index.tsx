import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import InstLayout from "../../layout/Instructor";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const { user } = useContext(AuthContext);

  return (
    <InstLayout>
      <h1>Instructor's Dashbiord</h1>
    </InstLayout>
  );
};

export default Dashboard;
