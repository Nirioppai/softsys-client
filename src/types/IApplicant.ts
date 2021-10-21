export interface IApplicant {
  _id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
  };
  gender: string;
  birthDate: string;
  nationality: string;
  contactNumber: string;
  address: string;
  desiredPosition: string;
  interviewSchedule: string;
  applicationResult: string;
  applicationRemarks: string;
  applicantNumber: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

