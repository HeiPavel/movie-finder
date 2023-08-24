import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {MultiSelect} from "primereact/multiselect";                                                       
import { updateGenres, selectGenres, loadGenres, selectSelectedGenres } from "../../features/genres/genresSlice";
import { elementsForRender } from "../../util/helper/elementsForRender";
import MultiSearchSeparator from "../multiSearchSeparator/MultiSearchSeparator";
import { selectGenreSeparator, toggleGenreSeparator } from "../../features/searchParameters/searchParametersSlice";
import { TooltipHint } from "../tooltip/TooltipHint";

export const GenreContainer = () => {
    const dispatch = useDispatch();
    const genres = useSelector(selectGenres);
    const selectedGenres = useSelector(selectSelectedGenres);
    const separator = useSelector(selectGenreSeparator);

    useEffect(() => {
        dispatch(loadGenres());
    }, [dispatch]);

    return (
        <div className="multiselect-box">
            <div className="select-container">
                <MultiSelect 
                    value={selectedGenres}
                    onChange={(event) => dispatch(updateGenres(event.value))}
                    options={elementsForRender(selectedGenres, genres)}
                    optionLabel="name" 
                    display="comma"
                    placeholder="Select genres"
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
                    content={"'+(and)' - search for movies that include all selected genres, '-(or)' - search for movies that include at least one genre"}
                />
            </div>
        </div>
    );
}