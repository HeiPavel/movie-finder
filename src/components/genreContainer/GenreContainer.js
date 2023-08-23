import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {MultiSelect} from "primereact/multiselect";                                                       
import { updateGenres, selectGenres, loadGenres, selectSelectedGenres } from "../../features/genres/genresSlice";
import { elementsForRender } from "../../util/helper/elementsForRender";

export const GenreContainer = () => {
    const dispatch = useDispatch();
    const genres = useSelector(selectGenres);
    const selectedGenres = useSelector(selectSelectedGenres);

    useEffect(() => {
        dispatch(loadGenres());
    }, [dispatch]);

    return (
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
    );
}