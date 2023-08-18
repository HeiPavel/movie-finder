import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPerson, changeTerm, loadActors, clearActors } from "../../features/person/personSlice";
import { ActorsContainer } from "../actorsContainer/ActorsContainer";

export const Person = () => {
    const {term} = useSelector(selectPerson);
    const dispatch = useDispatch();

    useEffect(() => {
        /*if (term) {
            dispatch(loadActors(term));
        } else {
            dispatch(clearActors());
        } */
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