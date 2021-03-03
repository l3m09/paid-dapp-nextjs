import React from "react";
import { useTable, useSortBy } from "react-table";
import { Button } from "reactstrap";

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20);

  return (
    <>
      <table {...getTableProps()} className="custom-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <img
                          className="arrow"
                          src="/assets/icon/arrowDown.svg"
                          alt=""
                        />
                      ) : (
                        <img
                          className="arrow"
                          src="/assets/icon/arrowUp.svg"
                          alt=""
                        />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={i % 2 === 0 ? "row-background" : ""}
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
      <br />
      {data.length < 1 && (
        <div className="empty-result row justify-content-center align-items-center">
          <p className="text-center">
            You don't have any agreements yet. Click bellow to create your first
            smart agreement! <br />
            <Button className="mt-3" color="primary">
              <img className="mr-1" src="/assets/icon/plus.svg" alt="" />
              New agreement
            </Button>
          </p>
        </div>
      )}
    </>
  );
}

export default Table;
