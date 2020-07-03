import React, {useState, useEffect} from 'react';

export default function FiltersComponent(props) {

    const [columnSelectionDropdownLabel, setColumnSelectionDropdownLabel] = useState('Столбец');
    const [conditionSelectionDropdownLabel, setConditionSelectionDropdownLabel] = useState('Условие');

    useEffect(() => {
        switch (props.filterColumn) {
            case "date":
                setColumnSelectionDropdownLabel('Дата');
                break;
            case "name":
                setColumnSelectionDropdownLabel('Название');
                break;
            case "quantity":
                setColumnSelectionDropdownLabel('Количество');
                break;
            case "distance":
                setColumnSelectionDropdownLabel('Расстояние');
                break;
            default:
                setColumnSelectionDropdownLabel('Столбец');
                break;
        }
    }, [props.filterColumn]);

    useEffect(() => {
        switch (props.filterCondition) {
            case "equals":
                setConditionSelectionDropdownLabel('Равно');
                break;
            case "contains":
                setConditionSelectionDropdownLabel('Содержит');
                break;
            case "moreThen":
                setConditionSelectionDropdownLabel('Больше чем');
                break;
            case "lessThen":
                setConditionSelectionDropdownLabel('Меньше чем');
                break;
            default:
                setConditionSelectionDropdownLabel('Условие');
                break;
        }
    }, [props.filterCondition]);

    return (
        <div className="col-auto col-md-4 mb-3 w-sm-100">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Фильтрация</h5>
                    <div className="d-flex justify-content-between">
                        <p className="p-2 m-0">Столбец: </p>
                        <div className="dropdown mt-2">
                            <button className="btn btn-sm btn-secondary dropdown-toggle" type="button"
                                    id="columnSelectionDropdown"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {columnSelectionDropdownLabel}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="columnSelectionDropdown">
                                <button className="dropdown-item"
                                        onClick={() => props.onFilterColumnChange("date")}>Дата
                                </button>
                                <button className="dropdown-item"
                                        onClick={() => props.onFilterColumnChange("name")}>Название
                                </button>
                                <button className="dropdown-item"
                                        onClick={() => props.onFilterColumnChange("quantity")}>Количество
                                </button>
                                <button className="dropdown-item"
                                        onClick={() => props.onFilterColumnChange("distance")}>Расстояние
                                </button>
                                <button className="dropdown-item"
                                        onClick={() => props.onFilterColumnChange(undefined)}>Столбец
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="p-2 m-0">Условие: </p>
                        <div className="dropdown mt-2">
                            <button className="btn btn-sm btn-secondary dropdown-toggle" type="button"
                                    id="conditionSelectionDropdown"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {conditionSelectionDropdownLabel}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="conditionSelectionDropdown">
                                <button className="dropdown-item"
                                        onClick={() => props.onFilterConditionChange("equals")}>Равно
                                </button>
                                <button className="dropdown-item"
                                        onClick={() => props.onFilterConditionChange("contains")}>Содержит
                                </button>
                                <button className="dropdown-item"
                                        onClick={() => props.onFilterConditionChange("moreThen")}>Больше чем
                                </button>
                                <button className="dropdown-item"
                                        onClick={() => props.onFilterConditionChange("lessThen")}>Меньше чем
                                </button>
                                <button className="dropdown-item"
                                        onClick={() => props.onFilterConditionChange(undefined)}>Условие
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="d-flex justify-content-between mt-2">
                        <p className="p-2 m-0">Параметр: </p>
                        <input type="text" className="form-control" id="parameterInput"
                               onChange={(e) => props.onFilterParameterChange(e.target.value)}
                               value={props.filterParameter}/>
                    </div>

                    <button className="btn btn-secondary float-right mt-3"
                            onClick={() => props.fetchDataWithParameters()}>Подтвердить
                    </button>
                </div>
            </div>
        </div>
    );
}