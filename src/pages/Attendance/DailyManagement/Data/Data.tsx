import React, {useContext} from "react";

type Data = {
   id: string;
   firstName: string;
   lastName: string;
   middleName: string;
   status: string;
   timeIn: string;
   timeOut: string;
};

export const data = (attendance: any[], employees: any[], day: number, year: number): Data[] => {
   const dat: Data[] = [];
   attendance.forEach((att: any)=>{
      employees.forEach((emp: any) => {
         if(att.employee._id === emp._id && att.day == day && att.year == year){
            dat.push({
               id: emp.employeeId,
               firstName: emp.name.firstName,
               lastName: emp.name.lastName,
               middleName: emp.name.middleName,
               status: att.workStatus,
               timeIn: att.timeIn,
               timeOut: att.timeOut
            });
         }
      });
   })
   return dat;
};