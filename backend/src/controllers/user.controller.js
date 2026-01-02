import { User } from "../models/user.models.js";
import {asynchandler} from "../utils/asynchandler.js";
import {apiError} from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js";

const generateAccessTokenandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      "something went wrong while generating access token and refresh token"
    );
  }
};

const registerUser = asynchandler(async (req, res) => {
    const {username, password, email} = req.body;

    if([username, password, email].some((field) => field?.trim() === "" )) {
        throw new apiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email })

    if(existingUser) {
        throw new apiError(400, "User already exists");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        password,
        email
    })

    const createdUser = await User.findById(user._id).select("-password");

    if(!createdUser) {
        throw new apiError(400, "Something went wrong while registering user");
    }

    return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User registered successfully"));
})

const loginUser = asynchandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email && !password) {
        throw new apiError(400, "Email & password required");
    }

    const user = await User.findOne({email});

    if(!user) {
        throw new apiError(400, "incorrect password or email");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid) {
        throw new apiError(401, "Invalid password");
    }

    const {accessToken, refreshToken} = 
        await generateAccessTokenandRefreshToken(user._id);

    const logInUser = await User.findById(user._id).select(
    "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: logInUser,
          accessToken,
          refreshToken,
        },
        "User loggin Successfylly"
      )
    );
})

export {
    registerUser,
    loginUser,
}