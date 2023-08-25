import React, {useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import {Dropdown} from 'primereact/dropdown';
import { loadMovieTitles, selectMovieTitles, updateQuery, selectTitleTerm } from "../../features/searchMovieTitle/searchMovieTitle";

export const SearchMovieTitle = React.memo(() => {
    const titles = useSelector(selectMovieTitles);
    const term = useSelector(selectTitleTerm);
    const dispatch = useDispatch();
    const dropdown = useRef(null);

    useEffect(() => {
        if (term) dispatch(loadMovieTitles(term));
    }, [dispatch, term]);
    

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
                placeholder="Search movie title"
                className="dropdown"
                id="title-search-dropdown"
                showClear={term ? true : false}
            />
        </div>
    );
})