export interface IEmployee {
  _id: string;
  name: Name;
  contactNumber: ContactNumber;
  homeAddress: Address;
  currentAddress: Address;
  permanentAddress: Address;
  gender: string;
  role: string;
  permissions: any[];
  type: string;
  nationality: string;
  isActive: boolean;
  employeeId: string;
  dateOfBirth: string;
  password?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ContactNumber {
  mobileNumber: string[];
  landLineNumber: string[];
}

interface Address {
  homeNumOrLotNum: string;
  streetName: string;
  districtOrTown: string;
  zipCode: string;
  province: string;
  country: string;
}

interface Name {
  firstName: string;
  middleName: string;
  lastName: string;
  title: string;
  suffix: string;
}
