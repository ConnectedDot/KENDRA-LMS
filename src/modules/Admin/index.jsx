import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context';

const Dashboard = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>Admin Dashboard</h1>
    </>
  );
};

export default Dashboard;
