export interface DataType {
  monthName: string;
  employeeRecords: EmployeeRecord[];
}

export interface EmployeeRecord {
  employee: {
    name: string;
  };
  date: {
    month: string;
    year: string;
  };
  monthRecord: {
    day: string;
    timeIn: string;
    timeOut: string;
    workStatus: string;
    attendanceStatus: string;
    note: string;
  }[];
}
