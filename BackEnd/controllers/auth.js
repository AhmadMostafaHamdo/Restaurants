const asyncHandler = require("express-async-handler");
const { User, validateUserRegister } = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateTokens = (userId, role) => {
  const accessToken = jwt.sign(
    { id: userId, role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "59m" }
  );
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

const register = asyncHandler(async (req, res) => {
  const { error } = validateUserRegister(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: "Failed", data: { msg: error.details[0].message } });

  const { name, email, password, phone } = req.body;

  if (!/^(09\d{8}|\+9639\d{8})$/.test(phone)) {
    return res
      .status(400)
      .json({ status: "Failed", data: { msg: "Invalid phone number" } });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res
      .status(422)
      .json({ status: "Failed", data: { msg: "Email already taken" } });

  const hashed = await bcrypt.hash(password, 10);
  const image = req.file ? req.file.filename : undefined;

  const newUser = await new User({
    name,
    email,
    password: hashed,
    phone,
    image,
  }).save();

  const { accessToken, refreshToken } = generateTokens(
    newUser._id,
    newUser.role
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    status: "success",
    data: { msg: "User registered", user: newUser, token: accessToken },
  });
});

// Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res
      .status(400)
      .json({ status: "fail", data: { msg: "Invalid credentials" } });
  }
  const { accessToken, refreshToken } = generateTokens(user._id, user.role);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res
    .status(200)
    .json({ status: "success", data: { user }, token: accessToken });
});

// Refresh Token
const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ token: accessToken });
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
});

const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { register, login, refresh, logout };
