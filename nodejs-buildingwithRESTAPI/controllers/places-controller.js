const httpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');

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

const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;
    const newPlace = {
        id : uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(newPlace);
    console.log(DUMMY_PLACES);
    res.status(201).json({newPlace})
}

exports.createPlace = createPlace;
exports.getPlacesByPlaceId = getPlacesByPlaceId;
exports.getPlacesByUserId = getPlacesByUserId;