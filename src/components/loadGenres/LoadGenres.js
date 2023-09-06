import {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadGenres, selectGenresAllowLoading } from "../../features/genres/genresSlice";
import { selectLanguage } from "../../features/movies/moviesSlise";

export const LoadGenres = () => {
    const language = useSelector(selectLanguage);
    const isLoadingAllow = useSelector(selectGenresAllowLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoadingAllow) dispatch(loadGenres(language));
    }, [dispatch, language, isLoadingAllow]);
}