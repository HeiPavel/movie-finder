import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetAndUpdate } from "../../features/movies/moviesSlise";
import { selectSearchParameters } from "../../features/searchParameters/searchParametersSlice";
import { SearchActors } from "../searchActors/SearchActors";
import { GenreContainer } from "../genreContainer/GenreContainer";
import { YearContainer } from "../yearContainer/yearContainer";
import { SearchMovieTitle } from "../searchMovieTitle/SearchMovieTitle";
import { Button } from "primereact/button";

export const SearchContainer = () => {
    const searchParameters = useSelector(selectSearchParameters);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(resetAndUpdate(searchParameters));
    }

    return (
        <div className="search-container">
            <form onSubmit={(event) => handleSubmit(event)} className="form-container">
                <SearchMovieTitle/>
                <SearchActors/>
                <GenreContainer/>
                <YearContainer/>
                <Button label="Search" />
            </form>
        </div>
    );
}