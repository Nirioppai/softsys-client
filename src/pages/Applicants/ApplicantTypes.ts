export interface ApplicantTypes {
  _id: string;
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
  interviewSchedule: {
    year: number;
    month: number;
    day: number;
  };
  applicationResult: string;
  applicationRemarks: string;
}
