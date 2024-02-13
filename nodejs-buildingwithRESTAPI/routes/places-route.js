const express = require('express');
const router = express.Router();

const placeControllers = require('../controllers/places-controller');

router.get('/:pid', placeControllers.getPlacesByPlaceId);

router.get('/user/:uid', placeControllers.getPlacesByUserId);

router.post('/', placeControllers.createPlace);

module.exports = router;