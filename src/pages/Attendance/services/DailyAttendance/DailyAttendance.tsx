import axios from 'axios'
const baseUrl = process.env.REACT_APP_HRIS_URL;
// dito mo lagay pre mga api ng daily attendance tapos sa iba
// gayahin mo lang tong page na to tska yung mga index index

export const getDailyAttendance = (parameters: any) => {
    return axios.get(`${baseUrl}/api/attendance/`,{ params: { month: parameters.params.month, year: parameters.params.year, attendance: parameters.params.attendance,} })
} 



// axios.get('/api/attendance/', { params: { day: “1”, month: “January”, year: ”2021”, attendance: “dailymanagement”, employee?: “employeeObjectId” } });

