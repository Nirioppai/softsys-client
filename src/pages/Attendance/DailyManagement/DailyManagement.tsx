import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, Select, MenuItem, InputLabel, Grid } from '@material-ui/core';
import { AdminWrapper } from 'components';
import { data } from './Data/Data';
import { columns } from './Data/Column';
import Table from "./TableRender";
import DMContext from './Context';
import {getDailyAttendance, getEmployeeInformations} from '../services/DailyManagement/index';
import {EmployeeTypes} from 'types'
import {AttendanceType} from './Data/Types';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const monthDays = [31, 29, 31, 30, 31, 30,
  31, 31, 30, 31, 30, 31
];

const DailyManagement: FC = () => {
  const [testData, setTestData] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState([]);
  const [employees, setEmployees] = useState<EmployeeTypes[]>([]);
  const [attendance, setAttendance] = useState<AttendanceType[]>([]);
  const [year, setYear] = useState<number>(2021);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);

  useEffect(()=>{
    if(attendance.length !== 0 && employees.length !== 0){
      setTestData(data(attendance, employees, day, year));
    }
  },[attendance, employees])

  const changeMonth = (event: ChangeEvent<{ value: any }>) =>{
    setMonth(event.target.value);
    setDay(1);
  }
  const changeDay = (event: ChangeEvent<{ value: any }>) =>{
    setDay(event.target.value);
  }
  const changeYear = (event: ChangeEvent<{ value: any }>) =>{
    setYear(event.target.value);
    setMonth(1);
    setDay(1);
  }

  useEffect(()=>{
    let newDate = new Date();
    let newYear = newDate.getFullYear();
    let newMonth = newDate.getMonth()+1;
    let newDay = newDate.getDate();
    setYear(newYear);
    setMonth(newMonth);
    setDay(newDay);
  },[])

  useEffect(()=>{
    if(employees.length === 0){
      const callGetEmployeeInformations = async () =>{
        try {
          const { data } = await getEmployeeInformations();
          console.log(data);
          setEmployees(data.data);
        } catch (err) {
          console.error(err);
        }
      }
      callGetEmployeeInformations();
    }
  },[employees])

  useEffect(()=>{
    let parameters ={
      params: {
        month: monthNames[month-1], day, year, attendance: 'dailymanagement'
      }
    }
    const callGetDailyAttendance = async () =>{
      try {
        const { data } = await getDailyAttendance(parameters);
        console.log(data);
        setAttendance(data.data);
      } catch (err) {
        console.error(err);
      }
    }
    callGetDailyAttendance()
  },[year, month, day]);
  
  return (
    <>
      <DMContext.Provider 
        value={{
          testData, setTestData, selectedData, setSelectedData, attendance, employees,
          year, month, day
        }}
      >
        <AdminWrapper>
          <Helmet title='Daily Management' />
          <Typography variant='h1' gutterBottom>
          Daily Management
          </Typography>
          <Grid container>
            <Grid item xs={3}>
              <InputLabel>Month</InputLabel>
              <Select
                value={month}
                style={{width: '90%'}}
                onChange={changeMonth}
              >
                {monthNames.map((mon, index)=>{
                  return(
                    <MenuItem value={index+1}>{mon}</MenuItem>
                  )
                })}
              </Select>
            </Grid>
            <Grid item xs={3}>
              <InputLabel>Day</InputLabel>
              <Select
                value={day}
                style={{width: '90%'}}
                onChange={changeDay}
              >
                {monthDays.map((days, index)=>{
                  let menuItems = [];
                  if(month === index+1){
                    if(month === 2){
                      if(year % 4 === 0){
                        for (let i = 0; i < 29; i++) {
                          menuItems.push(<MenuItem value={i+1}>{i+1}</MenuItem>)
                        }
                      }else{
                        for (let i = 0; i < days; i++) {
                          menuItems.push(<MenuItem value={i+1}>{i+1}</MenuItem>)
                        }
                      }
                    }else{
                      for (let i = 0; i < days; i++) {
                        menuItems.push(<MenuItem value={i+1}>{i+1}</MenuItem>)
                      }
                    }
                  }
                  return(menuItems);
                })}
              </Select>
            </Grid>
            <Grid item xs={3}>
              <InputLabel>Year</InputLabel>
              <Select
                value={year}
                style={{width: '90%'}}
                onChange={changeYear}
                displayEmpty
              >
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
          <Table columns={columns} data={testData} />
        </AdminWrapper>
      </DMContext.Provider>
    </>
  );
};

export default DailyManagement;
