const express = require('express');

const router = express.Router();


const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State',
        description: 'One of the most famous building',
        imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipMDv3C-fXXvEvttpkkgNG5Rg52BwR4SBaA1w0dR=s680-w680-h510',
        address: '20 W 34th St., New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Emp. State',
        description: 'One of the most famous building',
        imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipMDv3C-fXXvEvttpkkgNG5Rg52BwR4SBaA1w0dR=s680-w680-h510',
        address: '20 W 34th St., New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        },
        creator: 'u2'
    }
];

router.get('/:pid', (req,res,next) => {
    console.log("hello");
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    res.json({place});
});

router.get('/', (req,res,next) => {
    console.log("hello");
});

module.exports = router;