import jsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateAuthToken = (param) => {
  const accessTokenSecretKey = process.env.accessTokenSecretKey;
  const accessToken = jsonWebToken.sign(param, accessTokenSecretKey);
  return accessToken;
};

const validateAuthToken = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log("Token ==== ", token);
  try {
    if (typeof token != undefined) {
      console.log("i am in");
      const accessTokenSecretKey = process.env.accessTokenSecretKey;
      const isTokenValid = jsonWebToken.verify(token, accessTokenSecretKey);
      if (isTokenValid) {
        console.log("i am in >>>>>");
        next();
      } else {
        return res.status(403).json({
          error: "Forbidden",
          msg: "You are not authorzied to access",
          status: "failed",
          statusCode: 403,
        });
      }
    } else {
      return res.status(403).json({
        error: "Forbidden else",
        msg: "You are not authorzied to access",
        status: "failed",
        statusCode: 403,
      });
    }
  } catch (error) {
    return res.status(403).json({
      error: "Forbidden",
      msg: "You are not authorzied to access",
      status: "failed",
      statusCode: 403,
    });
  }
};

export { generateAuthToken, validateAuthToken };
