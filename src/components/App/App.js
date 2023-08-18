import React from "react";
import { MovieListContainer } from "../movieListContainer/MovieListContainer";
import {SearchContainer} from '../searchContainer/SearchContainer';

function App() {
  return (
    <>
      <SearchContainer/>
      <MovieListContainer/>
    </>
  );
}

export default App;
