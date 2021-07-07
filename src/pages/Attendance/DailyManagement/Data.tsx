
import React from "react";
import { Column } from "react-table";

type Data = {
  id: string;
  date: string;
  firstName: string;
  lastName: string;
  unit: string;
  status: string;
  validation: boolean;
  view: React.ReactNode;
};

const randomId = ():string =>{
   var length = 10;
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const randomValidation = ():boolean =>{
   var random_boolean = Math.random() < 0.5;
   return random_boolean;
}

const randomFirstName = ():string =>{
   var names = [
      'Short', 'Long', 'Thick', 'Round', 'Jordan', 'Rick'
   ]
   const random = Math.floor(Math.random() * names.length);
   return names[random];
}

const randomLastName = ():string =>{
   var names = [
      'Shlong', 'Dickinson', 'Cockeroo', 'Uranus', 'Mickey', 'Donger'
   ]
   const random = Math.floor(Math.random() * names.length);
   return names[random];
}

const randomUnit = ():string =>{
   var names = [
      'Sales', 'Agriculture', 'Education', 'Militart', 'Entertainment', 'Useless'
   ]
   const random = Math.floor(Math.random() * names.length);
   return names[random];
}

const randomStatus = ():string =>{
   var names = [
      'Present', 'Late', 'Early Dismissal', 'Absent', 'On Leave'
   ]
   const random = Math.floor(Math.random() * names.length);
   return names[random];
}

const createArr = (n: number): Data[] => {
  const data: Data[] = [];
  for (let i = 0; i < n; i += 1) {
    data.push({
      id: randomId(),
      date: new Date().toDateString(),
      firstName: randomFirstName(),
      lastName: randomLastName(),
      unit: randomUnit(),
      status: randomStatus(),
      validation: randomValidation(),
      view: <button>View</button>
    });
  }
  return data;
};
export const data = createArr(10);
export const columns = [
   {
      Header: "ID",
      accessor: "id"
   },
   {
      Header: "Date Requested",
      accessor: "date"
   },
   {
      Header: "First Name",
      accessor: "firstName"
   },
   {
      Header: "Last Name",
      accessor: "lastName"
   },
   {
      Header: "Status",
      accessor: "status"
   },
   {
      Header: "Unit/Department",
      accessor: "unit"
   },
   {
      accessor: "view"
   }
];
