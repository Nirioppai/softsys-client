export interface EmployeeTypes {
  _id: string;
  employeeId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  gender: string;
  birthDate: {
    year: number;
    month: number;
    day: number;
  };
  nationality: string;
  contactNumber: string;
  address: string;
  position: string;
}
