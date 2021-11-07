import React, { useState, useEffect, ChangeEvent } from 'react';
import TableRender from './TableRender';
import { Select, FormControl, MenuItem } from '@material-ui/core';
import type { DataType, EmployeeRecord } from './MonthlyData';
import { getDailyAttendance } from '../services';
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
  parameters: {
    params: {
      day?: number;
      month: string;
      year: string;
      attendance: string;
      employee?: string;
    };
  };
}

export default function TableData() {
  const [state, setState] = useState<Overview>({
    month: '',
    monthData: null,
    currentColumn: [],
    renderData: [],
    isLoaded: false,
    parameters: {
      params: {
        month: '',
        year: '',
        attendance: '',
        employee: '',
      },
    },
  });

  useEffect(() => {
    let m = new Date();
    let month = m.getMonth();
    let year = m.getFullYear();
    let daysInCurrentMonth = new Date(year, month, 0).getDate();
    setState((prevState) => ({
      ...prevState,
      month: dates[month].name,
      monthData: dates[month],
      currentColumn: YearColumn.months[month].columns.slice(0,daysInCurrentMonth),
      currentMonth: YearColumn.months[month].name,
      parameters: {
        params: {
          month: `${dates[month].name}`,
          year: `${year}`,
          attendance: 'attendance-overview',
        },
      },
    }));
  }, []);

  useEffect(() => {
    const fetch = async () => {
      console.log(state);
      console.log(state.parameters);
      const fetchDailyAttendance = await getDailyAttendance(state.parameters);
      console.log(fetchDailyAttendance)
      if (fetchDailyAttendance) {
        setState((prevState) => ({
          ...prevState,
          renderData: fetchDailyAttendance.data.data,
        }));
      }
    };

    if (state.parameters.params.month) {
      fetch();
    }
  }, [state.parameters]);

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
        <Select
          value={month}
          onChange={(e) => handleChange(e, 'month')}
          name='age'
          inputProps={{ 'aria-label': 'age' }}
        >
          {dates.map((month) => (
            <MenuItem key={month.short} value={month.name}>
              {' '}
              {month.name}{' '}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableRender columns={currentColumn} data={renderData} />
    </>
  ) : null;
}