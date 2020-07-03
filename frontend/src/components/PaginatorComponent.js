import React, {useState, useEffect} from 'react';

export default function PaginatorComponentFunction(props) {
    const [paginator, changePaginator] = useState({});

    useEffect(() => {

        if (props.items && props.items.length) {
            setPage(1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.items]);

    const setPage = (page) => {
        let items = props.items;
        let pager = paginator;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = getPager(items.length, page);

        // get new page of items from items array
        let pageWithItems = items.slice(pager.startIndex, pager.endIndex + 1);

        changePaginator(pager);

        props.onPageChange(pageWithItems);
    };

    const getPager = (totalItems, currentPage, pageSize) => {
        currentPage = currentPage || 1;
        pageSize = pageSize || 10;
        let totalPages = Math.ceil(totalItems / pageSize);
        let startPage, endPage;

        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    };

    let pager = paginator;

    if (!pager.pages || pager.pages.length <= 1) {
        return <></>;
    }

    return (
        <ul className="pagination">
            <li className={pager.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                <button className='page-link' onClick={() => setPage(1)}>First</button>
            </li>
            <li className={pager.currentPage === 1 ? 'disabled page-item' : 'page-item'}>
                <button className='page-link' onClick={() => setPage(pager.currentPage - 1)}>Previous</button>
            </li>
            {pager.pages.map((page, index) =>
                <li key={index} className={pager.currentPage === page ? 'active page-item' : 'page-item'}>
                    <button className='page-link' onClick={() => setPage(page)}>{page}</button>
                </li>
            )}
            <li className={pager.currentPage === pager.totalPages ? 'disabled page-item' : 'page-item'}>
                <button className='page-link' onClick={() => setPage(pager.currentPage + 1)}>Next</button>
            </li>
            <li className={pager.currentPage === pager.totalPages ? 'disabled page-item' : 'page-item'}>
                <button className='page-link' onClick={() => setPage(pager.totalPages)}>Last</button>
            </li>
        </ul>
    );
}