export interface DataType {
  monthName: string;
  employeeRecords: EmployeeRecord[];
}

export interface EmployeeRecord {
  _id?: string;
  employee: string;
  month: string;
  year: string;
  monthRecord: MonthRecord[];
}

export interface MonthRecord {
  _id?: string;
  day: string;
  timeIn: string;
  timeOut: string;
  workStatus: string;
  attendanceStatus: string;
  note?: string;
}
