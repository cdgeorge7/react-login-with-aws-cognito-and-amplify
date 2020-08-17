import React, { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import { decodeJWT } from "../utils/strings";
import JwtHeaderDisplay from "./JwtHeaderDisplay";
import JwtPayloadDisplay from "./JwtPayloadDisplay";
import JwtSignatureDisplay from "./JwtSignatureDisplay";

const HEADER = "header";
const PAYLOAD = "payload";
const SIGNATURE = "signature";

const AppContent = () => {
  const {
    state: { isAuthenticated, user },
  } = useContext(AuthContext);

  return (
    <div>
      <div>
        <p>{isAuthenticated ? "Logged In" : "Logged Out"}</p>
      </div>
      <h2>ID Token</h2>
      <div className="container">
        <div>
          {isAuthenticated ? (
            <JwtHeaderDisplay
              jwtheader={decodeJWT(
                user.signInUserSession.idToken.jwtToken,
                HEADER
              )}
            />
          ) : (
            ""
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <JwtPayloadDisplay
              jwtpayload={decodeJWT(
                user.signInUserSession.idToken.jwtToken,
                PAYLOAD
              )}
              tokenType="id"
            />
          ) : (
            ""
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <JwtSignatureDisplay
              jwtsignature={decodeJWT(
                user.signInUserSession.idToken.jwtToken,
                SIGNATURE
              )}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <h2>Access Token</h2>
      <div className="container">
        <div>
          {isAuthenticated ? (
            <JwtHeaderDisplay
              jwtheader={decodeJWT(
                user.signInUserSession.accessToken.jwtToken,
                HEADER
              )}
            />
          ) : (
            ""
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <JwtPayloadDisplay
              jwtpayload={decodeJWT(
                user.signInUserSession.accessToken.jwtToken,
                PAYLOAD
              )}
              tokenType="access"
            />
          ) : (
            ""
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <JwtSignatureDisplay
              jwtsignature={decodeJWT(
                user.signInUserSession.accessToken.jwtToken,
                SIGNATURE
              )}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AppContent;
