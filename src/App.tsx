import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const App = () => {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // code to check for subjects goes in here
    // if no subjects exist the welcome component will be returned. otherwise the home component

    setTimeout(() => {
      navigate("/home");
    }, 3000);
  }, []);
  

  return (
    <>
      <p>placeholder...</p>
    </>
  );
};