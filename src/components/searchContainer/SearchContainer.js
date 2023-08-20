import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetAndUpdate } from "../../features/movies/moviesSlise";
import { selectSearchParameters } from "../../features/searchParameters/searchParametersSlice";
import { SearchActors } from "../searchActors/SearchActors";
import { resetActors } from "../../features/searchActors/searchActorsSlice";

export const SearchContainer = () => {
    const searchParameters = useSelector(selectSearchParameters);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(resetAndUpdate(searchParameters));
        dispatch(resetActors());
    }

    return (
        <div className="search-container">
            <h2>Find and sort movies by own preference</h2>
            <form onSubmit={(event) => handleSubmit(event)} className="form-container">
                <SearchActors/>
                <input type="submit" value="Search" />
            </form>
        </div>
    );
}