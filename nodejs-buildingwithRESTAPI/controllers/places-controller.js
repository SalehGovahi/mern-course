const httpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const Place = require("../models/place");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

const validateInput = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new httpError("Invalid inputs", 422);
    }
};

const getAllPlaces = async (req, res, next) => {
    try {
        const places = await Place.find();
        res.json({
            places: places.map((place) => place.toObject({ getters: true })),
        });
    } catch (error) {
        next(error);
    }
};
const getPlacesByUserId = async (req, res, next) => {
    try {
        const userId = req.params.uid;
        const places = await findPlacesByUserId(userId);
        res.json({
            places: places.map((place) => place.toObject({ getters: true })),
        });
    } catch (error) {
        next(error);
    }
};

const findPlacesByUserId = async (userId) => {
    const places = await Place.find({ creator: userId });
    if (places.length === 0) {
        throw new httpError("Could not find any places with this User ID", 404);
    }
    return places;
};

const getPlacesByPlaceId = async (req, res, next) => {
    try {
        const placeId = req.params.pid;
        const places = findPlacesByPlaceId(placeId);
        res.json({ places: places.toObject({ getters: true }) });
    } catch (err) {
        next(err);
    }
};

const findPlacesByPlaceId = async (placeId) => {
    const place = await Place.findById(placeId);
    if (!place) {
        return next(
            new httpError("Could not find the place with this ID", 404)
        );
    }
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new httpError("Invalid inputs passed, please check your data.", 422)
        );
    }

    const { title, description, address, creator,coordinates } = req.body;

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg",
        creator,
    });

    let user;
    try {
        user = await User.findById(creator);
    } catch (err) {
        console.log(err);
        const error = new httpError(
            "Creating place failed, please try again",
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new httpError("Could not find user for provided id", 404);
        return next(error);
    }

    console.log(user);

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess });
        user.places.push(createdPlace);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        console.log(err);
        const error = new httpError(
            "Creating place failed, please try again.",
            500
        );
        return next(error);
    }

    res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
    try {
        validationResult(req);

        const { title, description } = req.body;
        const placeId = req.params.pid;

        let place;
        place = await Place.findById(placeId);

        place.description = description;
        place.title = title;

        await place.save();

        res.json({ place: place.toObject({ getters: true }) });
    } catch (err) {
        next(err);
    }
};

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId).exec();
    } catch (err) {
        const error = new httpError(
            "Could not find the place with this Id",
            500
        );
        return next(error);
    }

    try {
        await Place.deleteOne({ _id: placeId });
    } catch (err) {
        console.log(err);
        const error = new httpError("Falied to delete the place", 500);
        return next(error);
    }

    res.status(200).json({ message: "Deleted place." });
};

exports.createPlace = createPlace;
exports.getPlacesByPlaceId = getPlacesByPlaceId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
exports.getAllPlaces = getAllPlaces;
