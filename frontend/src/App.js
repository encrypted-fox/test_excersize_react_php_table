import React, {useState, useEffect} from 'react';
import './App.css';
import TableComponent from "./components/TableComponent";
import FiltersComponent from "./components/FiltersComponent";
import PaginatorComponent from "./components/PaginatorComponent";
import axios from "axios";

function App() {

    const [filterColumn, setFilterColumn] = useState(undefined);
    const [filterCondition, setFilterCondition] = useState(undefined);
    const [filterParameter, setFilterParameter] = useState('');
    const [tableItems, setTableItems] = useState([]);
    const [pageWithItems, setPageWithItems] = useState([]);
    const [sortingColumn, setSortingColumn] = useState(undefined);
    const [sortingOrder, setSortingOrder] = useState(undefined);

     const onSortingColumnChange = (option) => {
        setSortingColumn(option);
        fetchDataWithParameters();
    };

    const onSortingOrderChange = (option) => {
        setSortingOrder(option);
        fetchDataWithParameters();
    };

    const onFilterColumnChange = (option) => {
        setFilterColumn(option);
    };

    const onFilterConditionChange = (option) => {
        setFilterCondition(option);
    };

    const onFilterParameterChange = (option) => {
        setFilterParameter(option);
    };

    const onPageChange = (pageWithItems) => {
        setPageWithItems(pageWithItems);
    };


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                'http://localhost/backend/',
            );

            setTableItems(response.data);
        };

        fetchData().catch(err => console.log(err));
    }, []);

    const fetchDataWithParameters = () => {
        const fetchData = async () => {
            const response = await axios.post(
                'http://localhost/backend/',
                JSON.stringify({sortingOrder, sortingColumn, filterColumn, filterParameter, filterCondition})
            );
            setTableItems(response.data);
        };

        fetchData().catch(err => console.log(err));
    };

    return (
        <div className="container">
            <div className="row mt-5 d-flex flex-column-reverse flex-md-row ">
                <TableComponent
                    tableItems={pageWithItems}
                    onSortingColumnChange={onSortingColumnChange}
                    onSortingOrderChange={onSortingOrderChange}
                    sortingColumn={sortingColumn}
                    sortingOrder={sortingOrder}
                />
                <FiltersComponent
                    onFilterColumnChange={onFilterColumnChange}
                    onFilterConditionChange={onFilterConditionChange}
                    onFilterParameterChange={onFilterParameterChange}
                    filterColumn={filterColumn}
                    filterCondition={filterCondition}
                    filterParameter={filterParameter}
                    fetchDataWithParameters={fetchDataWithParameters}
                />
            </div>
            <div className="row">
                <div className="col-12">
                    <nav>
                        <PaginatorComponent
                            items={tableItems}
                            onPageChange={onPageChange}
                        />
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default App;
