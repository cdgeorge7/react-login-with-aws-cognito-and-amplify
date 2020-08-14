import React, { useReducer, useEffect } from "react";
import { Auth } from "aws-amplify";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("login dispatch");
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
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
            accessToken: user.signInUserSession.accessToken.jwtToken,
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
