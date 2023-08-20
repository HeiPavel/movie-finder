import React from "react";
import noImage from '../../media/img/no-image.jpg';
import { useDispatch } from "react-redux";
import { addAndResetActors, removeActorAndId } from "../../features/searchActors/searchActorsSlice";

export const Actor = ({name, photo, isRemoved, actor}) => {
    const dispatch = useDispatch();

    const handleAddActor = () => dispatch(addAndResetActors(actor));
    const handleRemoveActor = () => dispatch(removeActorAndId(actor.id));

    return (
        <div className="actor-container">
            <img src={photo ? `https://image.tmdb.org/t/p/w185${photo}` : noImage} alt=""></img>
            <p>{name}</p>
            <button type="button" onClick={() => isRemoved ? handleRemoveActor() : handleAddActor()}>{isRemoved ? '✕' : 'Add'}</button>
        </div>
    );
}