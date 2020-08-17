import React, { useContext, useState } from "react";
import { Auth } from "aws-amplify";
import { AuthContext } from "./context/AuthProvider";
import { EMAIL, PASSWORD } from "../secrets";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const initialState = {
    username: EMAIL,
    password: PASSWORD,
  };

  const [loginData, setLoginData] = useState(initialState);

  const signIn = () => {
    Auth.signIn(loginData.username, loginData.password)
      .then((user) => {
        console.log(user.signInUserSession.accessToken);
        dispatch({
          type: "LOGIN",
          payload: {
            isAuthenticated: true,
            user: user,
          },
        });
      })
      .catch((err) => console.log(err));
  };

  const signOut = () => {
    Auth.signOut()
      .then((data) =>
        dispatch({
          type: "LOGOUT",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      )
      .catch((err) => console.log(err));
  };

  const showUser = () => {
    Auth.currentAuthenticatedUser()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        defaultValue={loginData.username}
        onChange={(e) =>
          setLoginData({ ...loginData, username: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        defaultValue={loginData.password}
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
      />
      <button onClick={signIn}>Login</button>
      <button onClick={signOut}>Log out</button>
      <button onClick={showUser}>Show User Info in Console</button>
    </div>
  );
};

export default Login;
