import React from "react";
import { connect } from "react-redux";
import {MultiStateCheckbox} from 'primereact/multistatecheckbox';
import 'primeicons/primeicons.css';

const MultiSearchSeparator = ({isAnd, dispatch, action}) => {
    const options = [
        { value: true, icon: 'pi pi-plus-circle' },
        { value: false, icon: 'pi pi-minus-circle' }
    ];

    return (
        <div>
            <MultiStateCheckbox 
                value={isAnd}
                options={options}
                onChange={(event) => dispatch(action(event.value))}
                optionValue="value"
                empty={false}
            />
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(null, mapDispatchToProps)(MultiSearchSeparator);