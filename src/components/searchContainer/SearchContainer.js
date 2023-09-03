import React from "react";
import { useSelector } from "react-redux";
import { SearchActors } from "../searchActors/SearchActors";
import { GenreContainer } from "../genreContainer/GenreContainer";
import { YearContainer } from "../yearContainer/yearContainer";
import { SearchMovieTitle } from "../searchMovieTitle/SearchMovieTitle";
import { SearchButton } from "../searchButton/SearchButton";
import { selectLanguage } from "../../features/movies/moviesSlise";
import { selectContent } from "../../features/content/contentSlice";

export const SearchContainer = () => {
    const language = useSelector(selectLanguage);
    const content = useSelector(selectContent);

    return (
        <div className="search-container">
            <p>{content[language].searchText}</p>
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