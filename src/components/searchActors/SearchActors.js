import React, {useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { MultiSelect } from "primereact/multiselect";
import { selectSearchTerm, changeTerm, loadActors, clearActors, selectActors, selectSelectedActors, addAndResetActors } from "../../features/searchActors/searchActorsSlice";
import { elementsForRender } from "../../util/helper/elementsForRender";
import MultiSearchSeparator from "../multiSearchSeparator/MultiSearchSeparator";
import { selectPeopleSeparator, togglePeopleSeparator } from "../../features/searchParameters/searchParametersSlice";
import { TooltipHint } from "../tooltip/TooltipHint";


export const SearchActors = () => {
    const actors = useSelector(selectActors);
    const selectedActors = useSelector(selectSelectedActors);
    const term = useSelector(selectSearchTerm);
    const separator = useSelector(selectPeopleSeparator);
    const dispatch = useDispatch();
    const multiselectRef = useRef(null);

    const handleChange = (event) => {
        dispatch(addAndResetActors(event.value));
        if (multiselectRef.current) multiselectRef.current.hide();
    }

    const actorPhotoTemplate = ({photo, name}) => {
        return (
            <div className="actor-container">
                <div className="img-container">
                    {photo ? 
                    <img src={`https://image.tmdb.org/t/p/w45${photo}`} alt={name}></img> : 
                    <div className="no-photo-container">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 
                            362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 
                            32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 
                            27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 
                            80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"/></svg>
                    </div>}
                </div>
                <p>{name}</p>
            </div>
        );
    }

    useEffect(() => {
        term ? dispatch(loadActors(term)) : dispatch(clearActors());
    }, [dispatch, term]);

    return (
        <div className="multiselect-box">
            <div className="select-container">
                <MultiSelect
                    ref={multiselectRef} 
                    value={selectedActors}
                    onChange={handleChange}
                    filter
                    onFilter={(event) => dispatch(changeTerm(event.filter))}
                    options={elementsForRender(selectedActors, actors)}
                    optionLabel="name" 
                    display="comma"
                    placeholder="Select actors"
                    filterPlaceholder="Search actors"
                    className="multiselect"
                    panelClassName="multiselect-overlay"
                    showSelectAll={false}
                    maxSelectedLabels={3}
                    showClear
                    resetFilterOnHide={true}
                    itemTemplate={actorPhotoTemplate}
                />
            </div>
            <div className="multi-checkbox">
                <MultiSearchSeparator 
                    isAnd={separator}
                    action={togglePeopleSeparator}
                />
                <TooltipHint 
                    content={"'+(and)' - search for movies that include all selected actors, '-(or)' - search for movies that include at least one actor"}
                />
            </div>
        </div>
    );
}