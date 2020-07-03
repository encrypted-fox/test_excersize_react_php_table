import React, {useEffect} from 'react';
import SortingComponent from "./SortingComponent";

export default function TableComponent(props) {

    useEffect(() => {

    });

    const tableRows = props.tableItems.map((element) =>
        <tr key={element.id}>
            <td>{element.date}</td>
            <td>{element.name}</td>
            <td>{element.quantity}</td>
            <td>{element.distance}</td>
        </tr>
    );

    return (
        <div className="col-auto col-md-8">
            <table className="table table-striped table-bordered table-responsive-sm">
                <thead className="thead-dark">
                <SortingComponent
                onSortingColumnChange={props.onSortingColumnChange}
                onSortingOrderChange={props.onSortingOrderChange}
                sortingColumn={props.sortingColumn}
                sortingOrder={props.sortingOrder}/>
                </thead>
                <tbody>
                {tableRows}
                </tbody>
            </table>
        </div>
    );
}