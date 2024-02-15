import React from "react";

import PlaceList from "../components/PlaceList";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";

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

const UserPlaces = props => {
    const userId= useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator===userId)
    return <PlaceList items={loadedPlaces}/>;
};

export default UserPlaces;