import React from "react";

const JwtSignatureDisplay = ({ jwtsignature }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Signature</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{jwtsignature}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default JwtSignatureDisplay;
