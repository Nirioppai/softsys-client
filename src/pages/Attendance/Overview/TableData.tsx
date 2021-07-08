import React, { useState, useEffect, ChangeEvent } from 'react';
import TableRender from './TableRender';
import { NativeSelect, FormControl } from '@material-ui/core';
import type { DataType, EmployeeRecord } from './MonthlyData';

//data need

// data about date
import { dates } from './Dates';

//data about the data to render
import { dataToRender } from './MonthlyData';

//data about the columns when rendering
import { YearColumn } from './MonthlyColumn';

interface Overview {
  month: string;
  monthData: any;
  currentColumn: {
    Header: string;
    accessor: any;
  }[];
  renderData: EmployeeRecord[];
  isLoaded: boolean;
}

export default function TableData() {
  const [state, setState] = useState<Overview>({
    month: '',
    monthData: null,
    currentColumn: [],
    renderData: [],
    isLoaded: false,
  });

  useEffect(() => {
    let m = new Date();
    let monthNum = m.getMonth();
    setState((prevState) => ({
      ...prevState,
      month: dates[0].name,
      monthData: dates[0],
      currentColumn: YearColumn.months[0].columns,
      currentMonth: YearColumn.months[0].name,
      renderData: dataToRender[0].employeeRecords,
    }));

    //this one should be based on the current month when 1st visited
    //pero gagawin ko lang munang january para fit sa data na ginawa ko hehe
  }, []);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, isLoaded: true }));
  }, [state.renderData]);

  useEffect(() => {
    // state.month !== currentMonth;
    //every time the user changed the month
    //it will fetch the needed data in the database already sorted
    //then just print it in the frontend
    //assuming that everything was the same with my mockdata
    // if (state.month !== null || undefined) {
    //   setState((prevState) => ({
    //     ...prevState,
    //     currentColumn: YearColumn.months[state.monthData.number - 1].columns,
    //     renderData: dataToRender[state.monthData.number - 1],
    //   }));
    // }
  }, [state.month]);
  const handleChange = (e: ChangeEvent<{ value: unknown }>, state: string) => {
    setState((prevState) => ({
      ...prevState,
      [state]: e.target.value,
    }));
  };
  const { month, currentColumn, renderData, isLoaded } = state;
  return isLoaded ? (
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
      <TableRender columns={currentColumn} data={renderData} />
    </>
  ) : null;
}
