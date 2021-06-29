import React, { useState, useEffect, ChangeEvent } from 'react';
import TableRender from './TableRender';
import { NativeSelect, FormControl } from '@material-ui/core';
import { dates } from './Dates';
import { data } from './Data';
import { janColumn } from './JanColumn';
interface Overview {
  month: string;
  monthData: any;
  currentData: any;
  currentColumns: any;
}

export default function TableData() {
  const [state, setState] = useState<Overview>({
    month: '',
    monthData: null,
    currentData: null,
    currentColumns: null,
  });

  useEffect(() => {
    let m = new Date();
    let monthNum = m.getMonth();
    setState((prevState) => ({
      ...prevState,
      month: dates[monthNum].name,
      monthData: dates[monthNum],
    }));
  }, []);
  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: 'First Name',
  //       accessor: 'firstName',
  //     },
  //     {
  //       Header: 'Last Name',
  //       accessor: 'lastName',
  //     },
  //   ],
  //   []
  // );

  // const data = [
  //   {
  //     firstName: 'hatdog',
  //     lastName: 'digididog',
  //   },
  //   {
  //     firstName: 'shampoo',
  //     lastName: 'soap',
  //   },
  // ];
  // useEffect(() => {
  //   let columns = [];
  //   let obj = {
  //     Header: '',
  //     accessor: '',
  //   };

  //   // for (let x = 0; x<=data[0].attendance1.length; x++) {
  //   //   obj.Header = `${x + 1}`;
  //   //   obj.accessor = "data[0].attendance"
  //   // }
  //   //gawa ng json every month

  // }, [state.month]);
  const handleChange = (e: ChangeEvent<{ value: unknown }>, state: string) => {
    setState((prevState) => ({
      ...prevState,
      [state]: e.target.value,
    }));
    console.log(e.target.value);
  };
  const { month } = state;
  return (
    <>
      <FormControl>
        <NativeSelect
          value={month}
          onChange={(e) => handleChange(e, 'month')}
          name='age'
          inputProps={{ 'aria-label': 'age' }}
        >
          {dates.map((month) => (
            <option key={month.short} value={month.name}>
              {' '}
              {month.name}{' '}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
      <TableRender columns={janColumn} data={data} />
    </>
  );
}
