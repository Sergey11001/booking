import React from 'react';
import {useParams} from "react-router-dom";
import AddNewPlace from "../components/AddNewPlace";
import MyAccommodation from "../components/MyAccommodation";
import PlaceInfo from "../components/PlaceInfo";

const PlacesPage = () => {
    const {action} = useParams()

    return (
        <div>
            {
                !action &&
                <MyAccommodation />
            }
            {
                (action === "new"|| action==='update') && (
                    <AddNewPlace />
                )
            }
            {
                action !== "new" && action !=='update' && action &&
                <PlaceInfo />
            }

        </div>

    );
};

export default PlacesPage;