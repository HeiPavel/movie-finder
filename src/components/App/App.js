import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { loadGenres } from "../../features/genres/genresSlice";
import { MovieListContainer } from "../movieListContainer/MovieListContainer";
import { SidebarContainer } from "../sidebarContainer/SidebarContainer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGenres());
  }, [dispatch]);

  return (
    <>
      <SidebarContainer/>
      <MovieListContainer/>
    </>
  );
}

export default App;
