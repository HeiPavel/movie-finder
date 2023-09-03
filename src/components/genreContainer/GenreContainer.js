import React, {useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import {MultiSelect} from "primereact/multiselect";                                                       
import { updateGenres, selectGenres, selectSelectedGenres } from "../../features/genres/genresSlice";
import { elementsForRender } from "../../util/helper/elementsForRender";
import MultiSearchSeparator from "../multiSearchSeparator/MultiSearchSeparator";
import { selectGenreSeparator, toggleGenreSeparator } from "../../features/searchParameters/searchParametersSlice";
import { TooltipHint } from "../tooltip/TooltipHint";
import { selectLanguage } from "../../features/movies/moviesSlise";
import { selectContent } from "../../features/content/contentSlice";

export const GenreContainer = () => {
    const dispatch = useDispatch();
    const genres = useSelector(selectGenres);
    const selectedGenres = useSelector(selectSelectedGenres);
    const separator = useSelector(selectGenreSeparator);
    const language = useSelector(selectLanguage);
    const content = useSelector(selectContent);
    const multiselectRef = useRef(null);

    const handleChange = (event) => {
        dispatch(updateGenres(event.value));
        if (multiselectRef.current) multiselectRef.current.hide();
    }

    return (
        <div className="multiselect-box">
            <div className="select-container">
                <MultiSelect
                    ref={multiselectRef} 
                    value={selectedGenres}
                    onChange={handleChange}
                    options={elementsForRender(selectedGenres, genres)}
                    optionLabel="name" 
                    display="comma"
                    placeholder={content[language].genrePlaceholder}
                    className="multiselect"
                    panelClassName="multiselect-overlay"
                    showSelectAll={false}
                    maxSelectedLabels={3}
                    showClear
                />
            </div>
            <div className="multi-checkbox">
                <MultiSearchSeparator 
                    isAnd={separator}
                    action={toggleGenreSeparator}
                />
                <TooltipHint 
                    content={content[language].genresTooltipText}
                />
            </div>
        </div>
    );
}