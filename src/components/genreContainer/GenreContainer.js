import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {MultiSelect} from "primereact/multiselect";
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.css';                                                         
import { updateGenres, selectGenres, loadGenres, selectSelectedGenres } from "../../features/genres/genresSlice";

export const GenreContainer = () => {
    const dispatch = useDispatch();
    const genres = useSelector(selectGenres);
    const selectedGenres = useSelector(selectSelectedGenres);

    const elementsForRender = (selectedElements, elements) => {
        if (!selectedElements.length) return elements;
        const result =  elements.filter(element => !selectedElements.some(selEl => selEl.id === element.id));
        result.unshift(...selectedElements);
        return result;
    }

    useEffect(() => {
        dispatch(loadGenres());
    }, [dispatch]);

    return (
        <div className="card flex justify-content-center">
            <MultiSelect 
                value={selectedGenres}
                onChange={(event) => dispatch(updateGenres(event.value))}
                options={elementsForRender(selectedGenres, genres)}
                optionLabel="name" 
                display="comma"
                placeholder="Select genres"
                className="multiselect"
                showSelectAll={false}
                maxSelectedLabels={3}
                showClear
            />
        </div>
    );
}