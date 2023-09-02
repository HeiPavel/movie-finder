import {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadGenres } from "../../features/genres/genresSlice";
import { selectLanguage } from "../../features/movies/moviesSlise";

export const LoadGenres = () => {
    const language = useSelector(selectLanguage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadGenres(language));
    }, [dispatch, language]);
}