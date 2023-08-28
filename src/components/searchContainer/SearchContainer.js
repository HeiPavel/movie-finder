import React from "react";
import { SearchActors } from "../searchActors/SearchActors";
import { GenreContainer } from "../genreContainer/GenreContainer";
import { YearContainer } from "../yearContainer/yearContainer";
import { SearchMovieTitle } from "../searchMovieTitle/SearchMovieTitle";
import { SearchButton } from "../searchButton/SearchButton";

export const SearchContainer = () => {
    console.log('hello');
    return (
        <div className="search-container">
            <div className="form-container">
                <SearchMovieTitle/>
                <SearchActors/>
                <GenreContainer/>
                <YearContainer/>
                <SearchButton/>
            </div>
        </div>
    );
}