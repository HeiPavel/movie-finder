import React from "react";

export const Movie = ({poster}) => {
    return (
        <>
            <div className="movie-card">
                <img src={poster} alt=""></img>
            </div>
        </>
    );
}