import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetAndUpdate } from "../../features/movies/moviesSlise";
import { selectSearchParameters } from "../../features/searchParameters/searchParametersSlice";
import { Button } from "primereact/button";
import { selectLanguage } from "../../features/movies/moviesSlise";
import { selectContent } from "../../features/content/contentSlice";

export const SearchButton = () => {
    const searchParameters = useSelector(selectSearchParameters);
    const language = useSelector(selectLanguage);
    const content = useSelector(selectContent);
    const dispatch = useDispatch();

    return (
        <>
            <Button label={content[language].searchButtonText} onClick={() => dispatch(resetAndUpdate(searchParameters))} />
        </>
    );
}