import React from "react";
import noImage from '../../media/img/no-image.jpg';
import { useDispatch } from "react-redux";
import { addActor, removeActor } from "../../features/person/personSlice";
import { addPeople, removePeople } from "../../features/searchParameters/searchParametersSlice";

export const Actor = ({name, photo, isRemoved, actor}) => {
    const dispatch = useDispatch();

    const handleAddActor = () => {
        dispatch(addActor(actor));
        dispatch(addPeople(actor.id));
    }
    const handleRemoveActor = () => {
        dispatch(removeActor(actor.id));
        dispatch(removePeople(actor.id));
    }

    return (
        <div className="actor-container">
            <img src={photo ? `https://image.tmdb.org/t/p/w185${photo}` : noImage} alt=""></img>
            <p>{name}</p>
            <button type="button" onClick={() => isRemoved ? handleRemoveActor() : handleAddActor()}>{isRemoved ? '✕' : 'Add'}</button>
        </div>
    );
}