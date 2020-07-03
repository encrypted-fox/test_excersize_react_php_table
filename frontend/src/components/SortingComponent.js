import React from 'react';

export default function SortingComponent(props) {

    const onTableHeaderCellClick = (column) => {
        if (props.sortingColumn === column) {
            props.onSortingOrderChange((props.sortingOrder === 'descending') ? 'ascending' : 'descending');
        } else {
            props.onSortingOrderChange('ascending');
        }
        props.onSortingColumnChange(column);
    };

    return (
        <tr>
            <th scope="col" onClick={() => onTableHeaderCellClick('date')}>Дата</th>
            <th scope="col" onClick={() => onTableHeaderCellClick('name')}>Название</th>
            <th scope="col" onClick={() => onTableHeaderCellClick('quantity')}>Количество</th>
            <th scope="col" onClick={() => onTableHeaderCellClick('distance')}>Расстояние</th>
        </tr>
    );
}