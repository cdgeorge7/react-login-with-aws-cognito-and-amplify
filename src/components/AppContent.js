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
    state: { isAuthenticated, accessToken },
  } = useContext(AuthContext);

  return (
    <div>
      <div>
        <p>{isAuthenticated ? "Logged In" : "Logged Out"}</p>
      </div>
      <div className="container">
        <div>
          {typeof accessToken === "string" ? (
            <JwtHeaderDisplay jwtheader={decodeJWT(accessToken, HEADER)} />
          ) : (
            ""
          )}
        </div>
        <div>
          {typeof accessToken === "string" ? (
            <JwtPayloadDisplay jwtpayload={decodeJWT(accessToken, PAYLOAD)} />
          ) : (
            ""
          )}
        </div>
        <div>
          {typeof accessToken === "string" ? (
            <JwtSignatureDisplay
              jwtsignature={decodeJWT(accessToken, SIGNATURE)}
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
