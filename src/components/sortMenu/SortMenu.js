import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { selectSortTerm, changeSortTerm, sortAndHideSidebar } from "../../features/movies/moviesSlise";
import { selectLanguage } from "../../features/movies/moviesSlise";
import { selectContent } from "../../features/content/contentSlice";

export const SortMenu = () => {
    const term = useSelector(selectSortTerm);
    const language = useSelector(selectLanguage);
    const content = useSelector(selectContent);
    const dispatch = useDispatch();

    const options = content[language].options;

    return (
        <div className="search-container sort-container">
            <p>{content[language].sortText}</p>
            <div className="form-container">
                <Dropdown 
                    value={term ? options.find(el => el.term === term) : null}
                    options={options}
                    optionLabel="name"
                    onChange={(event) => dispatch(changeSortTerm(event.value ? event.value.term : ''))}
                    placeholder={content[language].sortPlaceholder}
                    className="dropdown"
                    showClear
                    scrollHeight="120px"
                />
                <Button label={content[language].sortButtonText} onClick={() => dispatch(sortAndHideSidebar())} />        
            </div>
        </div>
    );
}