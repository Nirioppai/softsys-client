import { FC, Fragment } from 'react';
import clsx from 'clsx';
import {
  Paper,
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { TableProps } from 'types';

const Table: FC<TableProps> = ({
  columns,
  data,
  // showToolbar = true,
  // ExtraToolbarActions,
  actionButtonCount = 0,
  // showColumnToggle = false,
  TableProps,
  TableContainerProps,
  // ...rest
}) => {
  const hasActionButtons = actionButtonCount > 0;

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      tableContainer: {
        '& tr:last-of-type td': {
          borderBottom: 'none',
        },
        '& th': {
          backgroundColor: theme.palette.background.paper,
        },
      },
      table: {
        '& th:last-child': {
          minWidth: hasActionButtons
            ? theme.spacing(actionButtonCount === 1 ? 8 : actionButtonCount * 6)
            : 'initial',
          width: hasActionButtons
            ? theme.spacing(actionButtonCount === 1 ? 8 : actionButtonCount * 6)
            : 'initial',
        },
        '& td:last-child': {
          textAlign: hasActionButtons ? 'right' : 'inherit',
          '& > * + *': {
            marginLeft: hasActionButtons ? theme.spacing(1) : 0,
          },
        },
      },
    })
  );

  const classes = useStyles();

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    // allColumns,
    // getToggleHideAllColumnsProps,
    // state,
    // preGlobalFilteredRows,
    // setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <>
      {/* {showToolbar && (
        <TableToolbar
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
          allColumns={allColumns}
          showColumnToggle={showColumnToggle}
          ExtraToolbarActions={ExtraToolbarActions}
        />
      )} */}
      <TableContainer
        component={Paper}
        {...TableContainerProps}
        className={clsx(classes.tableContainer, {
          [TableContainerProps?.className || '']: TableContainerProps,
        })}
      >
        <MuiTable
          {...getTableProps()}
          stickyHeader
          {...TableProps}
          className={clsx(classes.table, {
            [TableProps?.className || '']: TableContainerProps,
          })}
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) =>
                  // @ts-ignore
                  !column?.hideColumn ? (
                    <TableCell
                      {...(column.id === 'selection'
                        ? column.getHeaderProps([
                            {
                              // @ts-ignore
                              className: column?.className || '',
                              // @ts-ignore
                              style: column?.style || {},
                              // @ts-ignore
                              'aria-label': column?.ariaLabel,
                            },
                          ])
                        : column.getHeaderProps([
                            {
                              // @ts-ignore
                              className: column?.className || '',
                              // @ts-ignore
                              style: column?.style || {},
                              // @ts-ignore
                              'aria-label': column?.ariaLabel,
                            },
                            column.getSortByToggleProps(),
                          ]))}
                    >
                      {column.render('Header')}
                      {column.id !== 'selection' ? (
                        <TableSortLabel
                          active={column.isSorted}
                          direction={column.isSortedDesc ? 'desc' : 'asc'}
                        />
                      ) : null}
                    </TableCell>
                  ) : (
                    <Fragment key={column.getHeaderProps().key} />
                  )
                )}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow hover {...row.getRowProps()}>
                  {row.cells.map((cell) =>
                    // @ts-ignore
                    !cell.column?.hideColumn ? (
                      <TableCell
                        {...cell.getCellProps([
                          {
                            // @ts-ignore
                            className: cell?.column?.cellClassName || '',
                            // @ts-ignore
                            style: cell?.column?.cellStyle || {},
                          },
                        ])}
                      >
                        {cell.render('Cell')}
                      </TableCell>
                    ) : (
                      <Fragment key={cell.getCellProps().key} />
                    )
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </>
  );
};

export default Table;
