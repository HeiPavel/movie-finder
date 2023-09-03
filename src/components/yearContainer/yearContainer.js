import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {Dropdown} from 'primereact/dropdown';
import { generateYearList } from "../../util/helper/generateYearsList";
import { chooseYear, selectYear } from "../../features/searchParameters/searchParametersSlice";
import { selectLanguage } from "../../features/movies/moviesSlise";
import { selectContent } from "../../features/content/contentSlice";

export const YearContainer = () => {
    const year = useSelector(selectYear);
    const language = useSelector(selectLanguage);
    const content = useSelector(selectContent);
    const dispatch = useDispatch();

    return (
        <div className="dropdown-container">
            <Dropdown 
                value={year ? year : null}
                options={generateYearList()}
                onChange={(event) => dispatch(chooseYear(event.value))}
                placeholder={content[language].yearPlaceholder}
                className="dropdown"
                showClear
            />
        </div>
    );
}