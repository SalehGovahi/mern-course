import React,{useState} from "react";
import { useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import AuthContext from "../../shared/context/AuthContext";

import './PlaceItem.css';

const PlaceItem = props => {
    const auth = useContext(AuthContext);

    const [showMap, setShowMap] = useState(false);

    const openMapHandler= () => setShowMap(true);

    const closeMapHandler= () => setShowMap(false); 

    const[showConfirmedModal, setShowConfirmedModal] = useState(false);

    const showDeleteWarningHandler= () => {
        setShowConfirmedModal(true);
    };

    const cancelDeleteHandler= () => {
        setShowConfirmedModal(false);
    };
    
    const confirmDeleteHandler= () => {
        console.log("Deleting ...");
    };

    return(
        <React.Fragment>
            <Modal 
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>Close</Button>}
            >
                <div className="map-container">
                    <h2>THE MAP</h2>
                </div>
            </Modal>
            <Modal 
                show={showConfirmedModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure?"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>No</Button>
                        <Button danger onClick={confirmDeleteHandler}>Yes</Button>
                    </React.Fragment>
                }
                footerClass="place-item__modal-actions"
            >
                <p>Do you want to delete this place?</p>

            </Modal>

            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title}></img>
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>VIEW THE PLACE ON THE MAP</Button>
                        {auth.isLoggedIn && (
                            <Button to={`/places/${props.id}`}>Edit</Button>
                        )}
                        {auth.isLoggedIn && (
                            <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;