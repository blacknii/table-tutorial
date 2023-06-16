import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import "../style/basicTable.css";
import { useNavigate } from "react-router-dom";

export const BasicTable = (props) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const navigate = useNavigate();

  const [selectedRowId, setSelectedRowId] = useState(
    String(props.page * 10 + (props.book - 1) - 10)
  );

  useEffect(() => {
    props.getInfo(parseInt(props.book) + (props.page - 1) * 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
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
    props.getInfo(parseInt(row.id) + 1);
    navigate("/table/" + (pageIndex + 1) + "/" + ((parseInt(row.id) % 10) + 1));
  };

  useEffect(() => {
    gotoPage(parseInt(props.page) - 1);
  }, [props.page, gotoPage]);

  useEffect(() => {
    // your logic to get the row id from book
    const newSelectedRowId = String(props.page * 10 + (props.book - 1) - 10);
    props.getInfo(parseInt(newSelectedRowId) + 1);
    setSelectedRowId(newSelectedRowId);
  }, [props, props.book]);

  // useEffect(() => {
  //   // convert to number and subtract one because pageIndex is zero based
  //   const newPageIndex = parseInt(props.page) - 1;
  //   // make sure to keep within page bounds
  //   if (newPageIndex >= 0 && newPageIndex < pageCount) {
  //     gotoPage(newPageIndex);
  //   }
  // }, [props.page]);

  return (
    <div>
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
                      row.id === selectedRowId ? "lightgray" : "white",
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
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div>
        <button
          onClick={() => {
            gotoPage(0);
            navigate("/table/1");
          }}
          disabled={!canPreviousPage}
        >
          {"First"}
        </button>
        <button
          onClick={() => {
            previousPage();
            navigate("/table/" + pageIndex);
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
            navigate("/table/" + (pageIndex + 2));
          }}
          disabled={!canNextPage}
        >
          {"Next"}
        </button>
        <button
          onClick={() => {
            gotoPage(pageCount - 1);
            navigate("/table/" + pageCount);
          }}
          disabled={!canNextPage}
        >
          {"Last"}
        </button>
      </div>
    </div>
  );
};

export default BasicTable;
