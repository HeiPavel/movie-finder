import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {Dropdown} from 'primereact/dropdown';
import { generateYearList } from "../../util/helper/generateYearsList";
import { chooseYear, selectYear } from "../../features/searchParameters/searchParametersSlice";

export const YearContainer = () => {
    const year = useSelector(selectYear);
    const dispatch = useDispatch();

    return (
        <div className="dropdown-container">
            <Dropdown 
                value={year}
                options={generateYearList()}
                onChange={(event) => dispatch(chooseYear(event.value))}
                placeholder="Select year"
                className="dropdown"
            />
        </div>
    );
}