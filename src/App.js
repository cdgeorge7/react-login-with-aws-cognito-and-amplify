import React, { useState, useEffect } from "react";
import Amplify, { Auth } from "aws-amplify";
import logo from "./logo.svg";
import "./App.css";
import {
  REGION,
  USER_POOL_ID,
  USER_POOL_WEB_CLIENT_ID,
  EMAIL,
  PASSWORD,
} from "./secrets";

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    //identityPoolId: "XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab",

    // REQUIRED - Amazon Cognito Region
    region: REGION,

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    //identityPoolRegion: "XX-XXXX-X",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: USER_POOL_WEB_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      domain: "localhost",
      // OPTIONAL - Cookie path
      path: "/",
      // OPTIONAL - Cookie expiration in days
      expires: 365,
      // OPTIONAL - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      secure: false,
    },

    // OPTIONAL - customized storage object
    //storage: MyStorage,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: "USER_SRP_AUTH",

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    //clientMetadata: { myCustomKey: "myCustomValue" },

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: "your_cognito_domain",
      scope: [
        "phone",
        "email",
        "profile",
        "openid",
        "aws.cognito.signin.user.admin",
      ],
      redirectSignIn: "http://localhost:3001/",
      redirectSignOut: "http://localhost:3001/",
      responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
});

// You can get the current config object
//const currentConfig = Auth.configure();

function App() {
  const testState = { state: false };

  const [username, setUsername] = useState(EMAIL);
  const [password, setPassword] = useState(PASSWORD);
  const [loggedIn, setLoggedIn] = useState(false);
  const [state, setState] = useState(testState);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((data) => setLoggedIn(true))
      .catch((err) => setLoggedIn(false));
  }, []);

  async function signIn() {
    await Auth.signIn(username, password)
      .then((data) => {
        setLoggedIn(true);
        console.log(data);
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(`Error: ${err}`);
      });
  }
  async function signOut() {
    await Auth.signOut()
      .then(setLoggedIn(false))
      .catch((err) => {
        setLoggedIn(true);
        console.log(`Error: ${err}`);
      });
  }
  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Username"
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>Login</button>
        <button onClick={signOut}>Log out</button>
      </div>
      {loggedIn ? <div>Logged In</div> : <div>Not Logged In</div>}
    </div>
  );
}

export default App;
