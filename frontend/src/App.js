import React, {Fragment, useState} from 'react';
import './App.css';
import TableComponent from "./components/TableComponent";
import ControlsComponent from "./components/ControlsComponent";

function App() {

    const [filterColumn, setFilterColumn] = useState(undefined);
    const [filterCondition, setFilterCondition] = useState(undefined);
    const [filterParameter, setFilterParameter] = useState('');

    const onFilterColumnChange = (option) => {
        setFilterColumn(option);
    };

    const onFilterConditionChange = (option) => {
        setFilterCondition(option);
    };

    const onFilterParameterChange = (option) => {
        setFilterParameter(option);
    };

    return (
        <div className="container">
            <div className="row mt-5 d-flex flex-column-reverse flex-md-row ">
                <TableComponent/>
                <ControlsComponent
                    onFilterColumnChange = {(option) => onFilterColumnChange(option)}
                    onFilterConditionChange = {(option) => onFilterConditionChange(option)}
                    onFilterParameterChange = {(option) => onFilterParameterChange(option)}
                    filterColumn = {filterColumn}
                    filterCondition = {filterCondition}
                    filterParameter = {filterParameter}
                />
            </div>
        </div>
    );
}

export default App;
