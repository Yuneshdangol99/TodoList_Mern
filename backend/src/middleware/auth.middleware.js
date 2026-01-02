import { apiError } from "../utils/apiErrors.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJwt = asynchandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new apiError(401, "UnAuthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new apiError(401, "invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid access Token");
  }
});

export default verifyJwt;
