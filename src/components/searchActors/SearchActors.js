import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSearchTerm, changeTerm, loadActors, clearActors } from "../../features/searchActors/searchActorsSlice";
import { ActorsContainer } from "../actorsContainer/ActorsContainer";

export const SearchActors = () => {
    const term = useSelector(selectSearchTerm);
    const dispatch = useDispatch();

    useEffect(() => {
        term ? dispatch(loadActors(term)) : dispatch(clearActors());
    }, [dispatch, term]);

    return (
        <div className="person">
            <label htmlFor="actor">Find actor:</label>
            <input 
                type="text" 
                id="actor" 
                onChange={(event) => dispatch(changeTerm(event.target.value))} 
                value={term} 
                placeholder="Second name or full name" 
            />
            <ActorsContainer />
        </div>
    );
}