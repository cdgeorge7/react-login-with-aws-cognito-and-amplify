import React, { useReducer, useEffect } from "react";
import { Auth } from "aws-amplify";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("login dispatch");
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        dispatch({
          type: "LOGIN",
          payload: {
            isAuthenticated: true,
            user: user,
          },
        });
      })
      .catch((err) => {});
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
