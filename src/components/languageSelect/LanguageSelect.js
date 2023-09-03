import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLanguage, toggleLanguageAndReloadMovies } from "../../features/movies/moviesSlise";
import {SelectButton} from 'primereact/selectbutton';

export const LanguageSelect = () => {
    const value = useSelector(selectLanguage);
    const dispatch = useDispatch();

    const language = [
        {name: 'English', code: 'gb', term: 'en-US'},
        {name: 'Ukrainian', code: 'ua', term: 'uk'}
    ];

    const handleChange = (event) => {
        if (event.value && event.value.term !== value) dispatch(toggleLanguageAndReloadMovies(event.value));
    }

    const justifyTemplate = (option) => {
        return (
            <div className="flag-box">
                <img alt={option.name} src={`https://flagcdn.com/h20/${option.code}.png`} />
            </div>
        );
    }

    return (
        <div className="language-select">
                <SelectButton 
                    value={language.find(lan => lan.term === value)} 
                    onChange={handleChange} 
                    itemTemplate={justifyTemplate} 
                    options={language}
                />
        </div>
    );
}