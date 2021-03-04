import React, { FC } from "react";
import { useTable, useSortBy } from "react-table";
import { Button } from "reactstrap";
import classNames from "classnames";

import { agreementStatus } from "../../utils/agreement";

type TableProps = {
  /** Array of columns*/
  columns: any[];
  /** Data to populate the table  */
  data: any[];
  /** The `onDetailClick` callback */
  onDetailClick: () => void;
   /** The `onNewAgreementClick` callback */
   onNewAgreementClick : () => void;
};

const Table: FC<TableProps> = ({ columns, data, onDetailClick, onNewAgreementClick }) => {
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

  const firstPageRows = rows.slice(0, 20);

  return (
    <>
      <table {...getTableProps()} className="custom-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
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
          {firstPageRows.map((row, rowIndex) => {
            prepareRow(row);
            const rowClass = classNames({
              "row-background": rowIndex % 2 === 0,
            });
            const statusButtonClass = classNames("btn-status mr-3", {
              "btn-danger": row.original.status === agreementStatus.DECLINED,
              "btn-success": row.original.status === agreementStatus.SIGNED,
              "btn-info": row.original.status === agreementStatus.PENDING,
            });

            const titleStatus = { 1: "Pending", 2: "Declined", 3: "Signed" };
            return (
              <tr
                key={`${rowIndex}-row`}
                {...row.getRowProps()}
                className={rowClass}
              >
                <>
                  {row.cells.map((cell, index) => {
                    return (
                      <td {...cell.getCellProps()} id={`${rowIndex}-${index}`}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                  <td key={`btn-${rowIndex}`} className="text-right pr-5">
                    <Button className={statusButtonClass}>
                      {titleStatus[row.original.status]}
                    </Button>
                    <Button onClick={onDetailClick} className="btn-transparent" color="primary">
                      <img src="/assets/icon/3dot.svg" alt="" />
                    </Button>
                  </td>
                </>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      {data.length > 1 && (
        <div className="empty-result row justify-content-center align-items-center">
          <p className="text-center">
            You don't have any agreements yet. Click bellow to create your first
            smart agreement! <br />
            <Button className="mt-3" color="primary" onClick={onNewAgreementClick}>
              <img className="mr-1" src="/assets/icon/plus.svg" alt="" />
              New agreement
            </Button>
          </p>
        </div>
      )}
    </>
  );
};

export default Table;
