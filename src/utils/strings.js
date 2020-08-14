var base64 = require("base-64");

const decodeJWT = (base64EncodedString, jwtPart, decoded = true) => {
  let stringParts = base64EncodedString.split(".");
  switch (jwtPart) {
    case "header":
      return decoded
        ? JSON.parse(base64.decode(stringParts[0]))
        : stringParts[0];
    case "payload":
      return decoded
        ? JSON.parse(base64.decode(stringParts[1]))
        : stringParts[1];
    case "signature":
      return stringParts[2];
    default:
      throw new Error(`Invalid jwt part: ${jwtPart}`);
  }
};

const displayJWTPart = (jwtPart) => {
  return JSON.stringify(JSON.parse(jwtPart), null, 2);
};

export { decodeJWT, displayJWTPart };
