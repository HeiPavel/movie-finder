import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { selectSortTerm, changeSortTerm, sortAndHideSidebar } from "../../features/movies/moviesSlise";

export const SortMenu = () => {
    const term = useSelector(selectSortTerm);
    const dispatch = useDispatch();

    const options = [
        'Best match',
        'Vote ascending',
        'Vote descending',
        'Year ascending',
        'Year descending'
    ];

    return (
        <div className="search-container">
            <div className="form-container">
                <Dropdown 
                    value={term ? term : null}
                    options={options}
                    onChange={(event) => dispatch(changeSortTerm(event.value))}
                    placeholder="Select sort term"
                    className="dropdown"
                    showClear
                />
                <Button label="Sort" onClick={() => dispatch(sortAndHideSidebar())} />        
            </div>
        </div>
    );
}