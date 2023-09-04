import React from "react";
import { LoadGenres } from "../loadGenres/LoadGenres";
import { SidebarContainer } from "../sidebarContainer/SidebarContainer";
import { MovieListContainer } from "../movieListContainer/MovieListContainer";

export const MainPage = () => {
    return (
        <>
            <LoadGenres/>
            <SidebarContainer/>
            <MovieListContainer/>
        </>
    );
}