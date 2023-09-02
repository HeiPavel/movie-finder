import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLanguage, toggleLanguage } from "../../features/movies/moviesSlise";
import {SelectButton} from 'primereact/selectbutton';

export const LanguageSelect = () => {
    const value = useSelector(selectLanguage);
    const dispatch = useDispatch();

    const language = [
        {name: 'English', code: 'gb', term: 'en-US'},
        {name: 'Ukrainian', code: 'ua', term: 'uk'}
    ];

    const justifyTemplate = (option) => {
        return (
            <div className="flag-box">
                <img alt={option.name} src={`https://flagcdn.com/h20/${option.code}.png`} />
            </div>
        );
    }

    return (
        <div className="language-select">
                <SelectButton value={language.find(lan => lan.term === value)} onChange={(event) => dispatch(toggleLanguage(event.value))} itemTemplate={justifyTemplate} options={language} />
        </div>
    );
}