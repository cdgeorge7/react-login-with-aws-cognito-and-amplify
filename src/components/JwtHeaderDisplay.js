import React from "react";

const JwtHeaderDisplay = ({ jwtheader }) => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>Header</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>kid</td>
          <td>{jwtheader.kid}</td>
        </tr>
        <tr>
          <td>alg</td>
          <td>{jwtheader.alg}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default JwtHeaderDisplay;
