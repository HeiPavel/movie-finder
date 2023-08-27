import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchContainer } from "../searchContainer/SearchContainer";
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';
import { selectVisibility, toggleVisibility } from "../../features/sidebar/sidebarSlice";
import 'primeicons/primeicons.css';

export const SidebarContainer = () => {
    const isVisible = useSelector(selectVisibility);
    const dispatch = useDispatch();

    return (
        <div className="sidebar-button-container">
            <Sidebar visible={isVisible} onHide={() => dispatch(toggleVisibility())}>
                <SearchContainer />
            </Sidebar>
            <Button icon="pi pi-arrow-right" onClick={() => dispatch(toggleVisibility())} />
        </div>
    );
}