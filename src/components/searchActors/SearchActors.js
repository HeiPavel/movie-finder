import React, {useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { MultiSelect } from "primereact/multiselect";
import { selectSearchTerm, changeTerm, loadActors, clearActors, selectActors, selectSelectedActors, addAndResetActors } from "../../features/searchActors/searchActorsSlice";
import { elementsForRender } from "../../util/helper/elementsForRender";


export const SearchActors = () => {
    const actors = useSelector(selectActors);
    const selectedActors = useSelector(selectSelectedActors);
    const term = useSelector(selectSearchTerm);
    const dispatch = useDispatch();
    const multiselectRef = useRef(null);

    const handleChange = (event) => {
        dispatch(addAndResetActors(event.value));
        if (multiselectRef.current) multiselectRef.current.hide();
    }


    useEffect(() => {
        term ? dispatch(loadActors(term)) : dispatch(clearActors());
    }, [dispatch, term]);

    return (
        <div className="person">
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
                className="multiselect"
                showSelectAll={false}
                maxSelectedLabels={3}
                showClear
                resetFilterOnHide={true}
            />
        </div>
    );
}