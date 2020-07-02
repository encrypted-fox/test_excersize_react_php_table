import React, {useState, useEffect} from 'react';

export default function TableComponent() {

    const [tableData, setTableData] = useState([{id: 5, date: "15.10.2020", name: "alice", quantity: "123", distance: 125}]);

    useEffect(() => {

    });

    const tableRows = tableData.map((element) =>
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
                <tr>
                    <th scope="col">Дата</th>
                    <th scope="col">Название</th>
                    <th scope="col">Количество</th>
                    <th scope="col">Расстояние</th>
                </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
    );
}