export interface IEmployeeInformation {
  _id: string;
  employee: string;
  employment: Employment;
  employmentHistory: EmploymentHistory;
  department: Department;
  governmentIssuedNumbers: GovernmentIssuedNumbers;
  immediateSuperior: string;
  civilStatus: string;
  emailAddresses: EmailAddresses;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface Employment {
  classification: string;
  tenureShip: string;
}

interface EmploymentHistory {
  employmentStart: string;
  employmentEnd: string;
  contractStart: string;
  contractEnd: string;
  probationStart: string;
  probationEnd: string;
  regularizationStart: string;
  regularizationEnd: string;
}

interface Department {
  departmentId: string;
  unit: string;
  departmentName: string;
  office: string;
}

interface GovernmentIssuedNumbers {
  sss: string;
  gsis: string;
  tin: string;
  philhealth: string;
  pagibig: string;
  universalId: string;
  dln: string;
  prc: string;
}

interface EmailAddresses {
  email1: string;
  email2: string;
}
