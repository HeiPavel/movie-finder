import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadGenres } from "../../features/genres/genresSlice";
import { MovieListContainer } from "../movieListContainer/MovieListContainer";
import { SidebarContainer } from "../sidebarContainer/SidebarContainer";
import { selectLanguage } from "../../features/movies/moviesSlise";

function App() {
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGenres(language));
  }, [dispatch, language]);

  return (
    <>
      <SidebarContainer/>
      <MovieListContainer/>
    </>
  );
}

export default App;
