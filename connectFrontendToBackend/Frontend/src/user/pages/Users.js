import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const checkResponse = (response,responseData) => {
    if (!response.ok) {
        throw new Error(responseData.message);
    };
};



const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUser, setLoadedUser] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);

            try {
                const response = await fetch("http://localhost:5000/api/users");

                const responseData = await response.json();

                checkResponse(response,responseData);

                setLoadedUser(responseData.users);

            } catch (error) {
                setError(error.message);
            };
            setIsLoading(false);
        };

        sendRequest();
    }, [] );

    const errorHandler = () => {
        setError(null);
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler}/>
            
            {isLoading && 
                <div className="center">
                    <LoadingSpinner />
                </div>
            }

            {!isLoading && loadedUser && <UsersList items={loadedUser} />}
        </React.Fragment>
    )
}

export default Users;
