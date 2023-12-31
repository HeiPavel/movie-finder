import React, {useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import {Dropdown} from 'primereact/dropdown';
import { loadMovieTitles, selectMovieTitles, updateQuery, selectTitleTerm } from "../../features/searchMovieTitle/searchMovieTitle";
import { selectLanguage } from "../../features/movies/moviesSlise";
import { selectContent } from "../../features/content/contentSlice";

export const SearchMovieTitle = () => {
    const titles = useSelector(selectMovieTitles);
    const term = useSelector(selectTitleTerm);
    const language = useSelector(selectLanguage);
    const content = useSelector(selectContent);
    const dispatch = useDispatch();
    const dropdown = useRef(null);

    useEffect(() => {
        if (term) dispatch(loadMovieTitles({term, language}));
    }, [dispatch, term, language]);
    

    const handleChange = (event) => {
        dispatch(updateQuery(event.value));
        if (dropdown.current) dropdown.current.show();
        if (!event.value) dropdown.current.hide();
    }

    return (
        <div className="dropdown-container">
            <Dropdown
                ref={dropdown}
                value={term}
                editable
                onChange={handleChange}
                options={titles}
                placeholder={content[language].titlePlaceholder}
                className="dropdown"
                showClear={term ? true : false}
            />
        </div>
    );
}