const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const Place = require('../models/place');

// mongoose.connect(
//     'mongodb://localhost:27017/Test'
// ).then(() => {
//     console.log('Connected to database!')
// }).catch(() => {
//     console.log('Connection failed!')
// });

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        location: {
        lat: 40.7484474,
        lng: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Emp. State Building',
        description: 'One of the most famous sky scrapers in the world!',
        location: {
        lat: 40.7484474,
        lng: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u2'
    }
];


const getPlacesByUserId = (req, res, next) =>{
    const userId = req.params.uid;

    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });

    if (!place){
        return(next(
            new httpError("Could not find the place with this user ID",404)
        ));    
    }
    else{
        res.json({ place });
    } 
};

const getPlacesByPlaceId = (req, res, next) => {
    const placeId = req.params.pid;

    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });

    if (!place){
        return(next(
            new httpError("Could not find the place with this ID",404)
        ));
    }
    else{
        res.json({ place });
    } 
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        console.log(errors);
        throw new httpError("Invalid inputs", 422);
    }

    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://picsum.photos/200',
        creator
    });

    try{
        await createdPlace.save();
    } catch(err) {
        console.log(err);
        const error = new httpError(
            'Creating place failed.',
            500
        );
        return next(error);
    }

    res.status(201).json({createdPlace})
};

const updatePlace = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
  
    const { title, description } = req.body;
    const placeId = req.params.pid;
  
    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;
  
    DUMMY_PLACES[placeIndex] = updatedPlace;
  
    res.status(200).json({ place: updatedPlace });
  };
  
const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if (!DUMMY_PLACES.find(p => p.id === placeId)) {
      throw new HttpError('Could not find a place for that id.', 404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({ message: 'Deleted place.' });
  };

exports.createPlace = createPlace;
exports.getPlacesByPlaceId = getPlacesByPlaceId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;