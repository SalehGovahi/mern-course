import React from "react";
import { useParams } from "react-router-dom";


import Input from './../../shared/components/FormElements/Input';
import Button from './../../shared/components/FormElements/Button';
import useForm from "../../shared/hooks/form-hook";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";

import './PlaceForm.css';

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
        title: 'Empire State',
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

const UpdatePlaces = props => {
    const placeId = useParams().placeId;

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);
    
    const [formState, inputHandler]=useForm({
        title: {
            value: identifiedPlace.title,
            isValid:true
        },
        description: {
            value: identifiedPlace.description,
            isValid: true
        }
    },true)


    if (!identifiedPlace){
        return (
            <div className="center">
                <h2>Could not find place you want</h2>
            </div>
        );
    }

    return (
        <form className="place-form">
            <Input 
            id="title" 
            element="input" 
            type="text" 
            label="Title" 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please enter a valid title"
            onInput={inputHandler}
            value={formState.inputs.title.value}
            valid={formState.inputs.title.isValid}
            />
            <Input 
            id="description" 
            element="textarea" 
            label="Description" 
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} 
            errorText="Please enter a valid title"
            onInput={inputHandler}
            value={formState.inputs.description.value}
            valid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={true}>
                UPDATE PLACES
            </Button>
        </form>
    )
};

export default UpdatePlaces;