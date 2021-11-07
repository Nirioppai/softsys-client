
export interface AttendanceType {
  employee: String;
  month: String;
  year: String;
  monthRecord: {
    attendanceStatus: String;
    timeIn: String;
    timeOut: String;
    workStatus: String;
    day: String;
    notes: String;
  }[];
}