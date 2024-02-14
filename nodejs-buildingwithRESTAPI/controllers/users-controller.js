const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const { get } = require('../routes/users-route');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: "Name 1",
        email: "test@test.com",
        password: "testpassword"
    },
    {
        id: 'u2',
        name: "Name 2",
        email: "test@test.com",
        password: "testpassword"
    }
];

const getUsers = (req,res,next) => {
    res.json({DUMMY_USERS});
};

const login = (req,res,next) => {
    const {email, password} = req.body;

    const identifiedUser = DUMMY_USERS.find(
        u => u.email === email || u.password === password);
    
    if (!identifiedUser){
        throw new httpError("Could not find this user", 404);
    }

    else {
        res.status(200).json({user : identifiedUser})
    };
};

const signup = (req,res,next) => {
    const {name, email, password} = req.body;

    const createdUser = {
        id: uuidv4(),
        name: name,
        email: email,
        password: password
    };

    const hasUser = DUMMY_USERS.find(u => u.email===email);
    if (hasUser){
        throw new httpError("This email is used by another user", 422);
    }

    DUMMY_USERS.push(createdUser);

    res.status(201).json({user: createdUser});
    console.log(DUMMY_USERS);
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
