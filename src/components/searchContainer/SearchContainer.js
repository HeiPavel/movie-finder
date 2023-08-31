import React from "react";
import { SearchActors } from "../searchActors/SearchActors";
import { GenreContainer } from "../genreContainer/GenreContainer";
import { YearContainer } from "../yearContainer/yearContainer";
import { SearchMovieTitle } from "../searchMovieTitle/SearchMovieTitle";
import { SearchButton } from "../searchButton/SearchButton";

export const SearchContainer = () => {
    return (
        <div className="search-container">
            <p>Filter your search by movie title, actor's name, genre, or year of release with ease, narrowing down your options to find exactly what you're looking for</p>
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