const httpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { get } = require("../routes/users-route");
const User = require("../models/user");
const { validationResult } = require("express-validator");

const DUMMY_USERS = [
    {
        id: "u1",
        name: "Max Schwarz",
        email: "test@test.com",
        password: "testers",
    },
];

const validateInput = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new httpError("Invalid inputs", 422);
    }
};

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, "-password");
    } catch (err) {
        const error = new httpError(
            "Fetching users failed, please try again later.",
            500
        );
        return next(error);
    }
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
    validateInput(req);
    
    const { name, email, password, places } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new httpError(
            "Signing up failed, please try again later.",
            500
        );
        return next(error);
    }

    if (existingUser) {
        const error = new httpError(
            "User exists already, please login instead.",
            422
        );
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        image: "https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg",
        password,
        places,
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new httpError(
            "Signing up failed, please try again.",
            500
        );
        return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new httpError(
            "Logging in failed, please try again later.",
            500
        );
        return next(error);
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new httpError(
            "Invalid credentials, could not log you in.",
            401
        );
        return next(error);
    }

    res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
