export interface IApplicant {
  applicant : {
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
  }[];

  info: {
    desiredPosition: string;
    interviewSchedule: string;
    applicationResult: string;
    applicationRemarks: string;
    applicantNumber: string;
  }[]
}

