import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const AppContent = () => {
  const {
    state: { isAuthenticated },
  } = useContext(AuthContext);

  return <p>{isAuthenticated ? "Logged In" : "Logged Out"}</p>;
};

export default AppContent;
