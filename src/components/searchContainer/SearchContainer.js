import React from "react";
import { Person } from "../person/Person";

export const SearchContainer = () => {
    return (
        <div className="search-container">
            <h2>Find and sort movies by own preference</h2>
            <div className="form-container">
                <Person/>
            </div>
        </div>
    );
}