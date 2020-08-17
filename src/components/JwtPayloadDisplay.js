import React from "react";

const JwtPayloadDisplay = ({ jwtpayload, tokenType }) => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>Payload</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>sub</td>
          <td>{jwtpayload.sub}</td>
        </tr>
        <tr>
          <td>event_id</td>
          <td>{jwtpayload.event_id}</td>
        </tr>
        <tr>
          <td>token_use</td>
          <td>{jwtpayload.token_use}</td>
        </tr>
        {tokenType === "id" ? (
          <tr>
            <td>aud</td>
            <td>{jwtpayload.aud}</td>
          </tr>
        ) : (
          <tr>
            <td>scope</td>
            <td>{jwtpayload.scope}</td>
          </tr>
        )}
        <tr>
          <td>auth_time</td>
          <td>{jwtpayload.auth_time}</td>
        </tr>
        <tr>
          <td>iss</td>
          <td>{jwtpayload.iss}</td>
        </tr>
        <tr>
          <td>exp</td>
          <td>{jwtpayload.exp}</td>
        </tr>
        <tr>
          <td>iat</td>
          <td>{jwtpayload.iat}</td>
        </tr>
        {tokenType === "id" ? (
          <tr>
            <td>email_verified</td>
            <td>{jwtpayload.email_verified.toString()}</td>
          </tr>
        ) : (
          <tr>
            <td>jti</td>
            <td>{jwtpayload.jti}</td>
          </tr>
        )}
        {tokenType === "id" ? (
          <tr>
            <td>cognito:username</td>
            <td>{jwtpayload["cognito:username"]}</td>
          </tr>
        ) : (
          <tr>
            <td>client_id</td>
            <td>{jwtpayload.client_id}</td>
          </tr>
        )}
        {tokenType === "id" ? (
          <tr>
            <td>email</td>
            <td>{jwtpayload.email}</td>
          </tr>
        ) : (
          <tr>
            <td>username</td>
            <td>{jwtpayload.username}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default JwtPayloadDisplay;
