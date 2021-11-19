import React, { FC, useState, useEffect } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import clsx from 'clsx';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Input,
  Button,
} from '@material-ui/core';
import { Magnify as MagnifyIcon } from 'mdi-material-ui';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableWidth: {
      width: '85%',
    },
    paperWidth: {
      width: '85%',
    },
    searchPadding: {
      padding: '10px',
    },
  })
);

interface tableRender {
  columns: any;
  data: any;
}
interface GlobalFilterType {
  globalFilter: any;
  setGlobalFilter: (filterValue: any) => void;
}
const GlobalFilter: FC<GlobalFilterType> = ({
  globalFilter,
  setGlobalFilter,
}) => {
  const [value, setValue] = useState(globalFilter);

  const onChange = (value: any) => {
    setGlobalFilter(value || undefined);
  };

  return (
    <div>
      <Input
        id='search'
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={``}
      />
    </div>
  );
};

const TableRender: FC<tableRender> = ({ columns, data }) => {
  useEffect(() => {
    console.log(data);
    console.log(columns);
  }, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );
  const classes = useStyles();
  return (
    <>
      {data && (
        <Paper className={classes.paperWidth}>
          <Box
            display='flex'
            flexDirection='row'
            className={classes.searchPadding}
          >
            <MagnifyIcon />
            <GlobalFilter
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </Box>
          <TableContainer>
            <Table className={classes.tableWidth} {...getTableProps()}>
              <TableHead>
                {headerGroups.map((headerGroup) => (
                  <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <TableCell {...column.getHeaderProps()}>
                        {column.render('Header')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <TableRow {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <TableCell {...cell.getCellProps()}>
                            {cell.value === 'Late'
                              ? 'L'
                              : cell.value === 'Present'
                              ? 'P'
                              : cell.value === 'Absent'
                              ? 'A'
                              : cell.column.Header === 'Name'
                              ? cell.value
                              : null}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
          rowsPerPageOptions={[3, 5, 10, 25, 100]}
          component='div'
          count={pageOptions.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          onChangeRowsPerPage={(e) => {
            setPageSize(Number(e.target.value));
            gotoPage(1);
          }}
          onChangePage={(event, page) => gotoPage(page)}
        /> */}
          {/* ayaw gumana pukingina */}
          {/* kaya gagamit na ko ng built in ni react-table */}

          <div className='pagination'>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </button>{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Go to page:{' '}
              <input
                type='number'
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: '100px' }}
              />
            </span>{' '}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[3, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </Paper>
      )}
    </>
  );
};

export default TableRender;
