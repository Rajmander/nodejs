import authService from "../services/authService.js";
import { generateAuthToken } from "../helpers/token.js";

class AuthController {
  async login(req, res) {
    const data = req.body;
    try {
      const result = await authService.login(data);
      console.log("Result length>>", result);

      if (result.length === 0) {
        return res.status(401).json({
          error: "Invalid Credentials",
          msg: "The email or password is incorrect",
          status: "success",
          statusCode: 401,
        });
      }

      const param = { id: result[0].id, email: result[0].email };
      console.log("User Details: ", param);

      const accessToken = generateAuthToken(param);
      console.log("accessToken", accessToken);

      const userDetails = result[0];
      userDetails.token = accessToken;

      return res.status(200).json({
        msg: "Logged in successfully",
        data: userDetails,
        status: "success",
        statusCode: 200,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        msg: "Something went wrong",
        status: "failed",
        statusCode: 500,
      });
    }
  }

  async show(req, res) {
    console.log("rajmander");
  }
}
export default new AuthController();
