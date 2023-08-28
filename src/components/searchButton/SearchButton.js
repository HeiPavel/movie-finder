import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetAndUpdate } from "../../features/movies/moviesSlise";
import { selectSearchParameters } from "../../features/searchParameters/searchParametersSlice";
import { Button } from "primereact/button";

export const SearchButton = () => {
    const searchParameters = useSelector(selectSearchParameters);
    const dispatch = useDispatch();

    return (
        <>
            <Button label="Search" onClick={() => dispatch(resetAndUpdate(searchParameters))} />
        </>
    );
}