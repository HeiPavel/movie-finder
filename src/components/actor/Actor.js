import React from "react";
import noImage from '../../media/img/no-image.jpg'

export const Actor = ({name, photo}) => {
    return (
        <div className="actor-container">
            <img src={photo ? `https://image.tmdb.org/t/p/w185${photo}` : noImage} alt=""></img>
            <p>{name}</p>
        </div>
    );
}