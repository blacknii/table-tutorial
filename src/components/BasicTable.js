import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import { COLUMNS } from "./columns";
import "../style/basicTable.css";
import { useNavigate } from "react-router-dom";

export const BasicTable = (props) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => props.BooksData, [props.BooksData]);
  const navigate = useNavigate();

  const [selectedRowId, setSelectedRowId] = useState(
    String(props.page * 10 + (props.book - 1) - 10)
  );

  useEffect(() => {
    props.getInfo(parseInt(props.book) + (props.page - 1) * 10);
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: props.page - 1 },
    },
    usePagination,
    useRowSelect
  );

  const handleRowClick = (row) => {
    setSelectedRowId(row.id);
    props.getInfo(row.allCells[0].value);
    navigate(
      "/table/" +
        props.author +
        "/" +
        (pageIndex + 1) +
        "/" +
        row.allCells[0].value
    );
  };

  useEffect(() => {
    gotoPage(parseInt(props.page) - 1);
  }, [props.page, gotoPage]);

  useEffect(() => {
    let filteredRows = page.filter((row) => {
      return row.cells[0].value === props.book;
    });

    let newId;
    if (filteredRows.length > 0) {
      newId = filteredRows[0].id;
    }

    setSelectedRowId(newId);
    props.getInfo(props.book);
  }, [props, props.book, page]);

  return (
    <div>
      <div className="pagination">
        <button
          onClick={() => {
            gotoPage(0);
            navigate("/table/" + props.author);
          }}
          disabled={!canPreviousPage}
        >
          {"First"}
        </button>
        <button
          onClick={() => {
            previousPage();
            navigate("/table/" + props.author + "/" + pageIndex);
          }}
          disabled={!canPreviousPage}
        >
          {"Previous"}
        </button>
        <span>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <button
          onClick={() => {
            nextPage();
            navigate("/table/" + props.author + "/" + (pageIndex + 2));
          }}
          disabled={!canNextPage}
        >
          {"Next"}
        </button>
        <button
          onClick={() => {
            gotoPage(pageCount - 1);
            navigate("/table/" + props.author + "/" + pageCount);
          }}
          disabled={!canNextPage}
        >
          {"Last"}
        </button>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps({
                  onClick: () => handleRowClick(row),
                  style: {
                    backgroundColor:
                      row.id === selectedRowId ? "#f1faee" : "white",
                  },
                })}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
