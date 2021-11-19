import React, { FC, useState, useEffect, useContext } from 'react';
import { useTable } from 'react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TablePagination,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  Input,
  InputAdornment
} from '@material-ui/core';
import DMContext from './Context';
import { CardSearch as SearchIcon } from 'mdi-material-ui';
interface tableRender {
  columns: any;
  data: any;
}

interface checkboxProps {
  index: number;
}

const SelectColumn: FC<checkboxProps> = ({index}) =>{
  const newDMContext = useContext(DMContext);
  const [select, setSelect] = useState(false);

  return(
    <Checkbox checked={newDMContext.selectedData.includes(index)} color="primary" 
      onChange={event=>{
        if(select === false){
          if(!newDMContext.selectedData.includes(index)){
            var newSelectedData = [...newDMContext.selectedData];
            newSelectedData.push(index)
            newDMContext.setSelectedData(newSelectedData);
          }
        }else{
          var newSelectedData = [...newDMContext.selectedData];
          var filteredAry = newSelectedData.filter(e => e !== index);
          newDMContext.setSelectedData(filteredAry);
        }
        setSelect(!select);
      }
    }
    />
  )
}

const SelectAllColumn: FC = () =>{
  const newDMContext = useContext(DMContext);
  const [select, setSelect] = useState(false);

  return(
    <Checkbox checked={select} color="primary" 
      onChange={event=>{
        if(select === true){
          newDMContext.setSelectedData([]);
          setSelect(false);
        }else{
          var newSelectedData: any[] = [];
          newDMContext.testData.forEach((element:any,i:any) => {
            newSelectedData.push(i);
          });
          newDMContext.setSelectedData(newSelectedData);
          setSelect(true);
        }
        console.log(select);
      }
    }
    />
  )
}

const TableRender: FC<tableRender> = ({ columns, data }) => {
  const newDMContext = useContext(DMContext);
  const [dataLength, setDataLength] = useState(data.length);
  const [currentCount, setCurrentCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(()=>{
    setDataLength(data.length);
  },[data]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
    
  return (
    <>
      <Paper>
        {/* <Grid container>
          <Grid item xs={3}>
            <FormControl style={{width: '100%', padding: 20}}>
              <Select
                value={null}
                style={{width: '100%'}}
                onChange={e=>{

                }}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="" disabled>
                  Mark as
                </MenuItem>
                <MenuItem value={'true'}>validated</MenuItem>
                <MenuItem value={'false'}>invalid</MenuItem>
              </Select>
              <FormHelperText>mark as</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
          <FormControl style={{width: '100%', padding: 20}}>
            <Input
              style={{width: '100%'}}
              id="input-with-icon-adornment"
              placeholder='search'
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          </Grid>
        </Grid> */}
        <TableContainer>
          <Table style={{width: '100%'}} {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  <TableCell>
                    <SelectAllColumn />
                  </TableCell>
                  {headerGroup.headers.map((column) => (
                    <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                if(i >= currentPage*currentCount && i < (currentPage*currentCount)+currentCount){
                  prepareRow(row);
                  return (
                    <TableRow {...row.getRowProps()}>
                      <TableCell><SelectColumn index={i} /></TableCell>
                      {row.cells.map((cell) => {
                        return (
                          <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                        );
                      })}
                    </TableRow>
                  );
                }
                else{
                  return(null);
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={dataLength}
          rowsPerPage={currentCount}
          page={currentPage}
          onChangePage={(event, page) => {setCurrentPage(page)}}
          onChangeRowsPerPage={(event) => {setCurrentCount(parseInt(event.target.value, 10)); setCurrentPage(0)}}
        />
      </Paper>
    </>
  );
};

export default TableRender;
