import React from "react";
import { MovieListContainer } from "../movieListContainer/MovieListContainer";
import { SidebarContainer } from "../sidebarContainer/SidebarContainer";
import { LoadGenres } from "../loadGenres/LoadGenres";

function App() {
  return (
    <>
      <LoadGenres/>
      <SidebarContainer/>
      <MovieListContainer/>
    </>
  );
}

export default App;
