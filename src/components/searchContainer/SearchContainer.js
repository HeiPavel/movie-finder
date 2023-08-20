import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSearchParams, resetMovies, resetSearchParams } from "../../features/movies/moviesSlise";
import { selectSearchParameters } from "../../features/searchParameters/searchParametersSlice";
import { Person } from "../person/Person";

export const SearchContainer = () => {
    const searchParameters = useSelector(selectSearchParameters);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(resetMovies());
        dispatch(resetSearchParams());
        dispatch(updateSearchParams(searchParameters));
    }

    return (
        <div className="search-container">
            <h2>Find and sort movies by own preference</h2>
            <form onSubmit={(event) => handleSubmit(event)} className="form-container">
                <Person/>
                <input type="submit" value="Search" />
            </form>
        </div>
    );
}