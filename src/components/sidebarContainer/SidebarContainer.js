import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchContainer } from "../searchContainer/SearchContainer";
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';
import { selectVisibility, toggleVisibility } from "../../features/sidebar/sidebarSlice";
import { SortMenu } from "../sortMenu/SortMenu";
import { LanguageSelect } from "../languageSelect/LanguageSelect";

export const SidebarContainer = () => {
    const isVisible = useSelector(selectVisibility);
    const dispatch = useDispatch();

    return (
        <div className="sidebar-button-container">
            <Sidebar visible={isVisible} onHide={() => dispatch(toggleVisibility())}>
                <LanguageSelect />
                <SearchContainer />
                <SortMenu />
            </Sidebar>
            <Button icon="pi pi-arrow-right" onClick={() => dispatch(toggleVisibility())} />
        </div>
    );
}