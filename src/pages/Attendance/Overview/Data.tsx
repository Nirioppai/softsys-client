interface Data {
  employee: {
    name: string;
  };
  date: {
    month: string;
    year: string;
  };
  attendance1: Array<string>;
}
export const data: Data[] = [
  {
    employee: {
      name: 'Emmanuel Tolosa',
    },
    date: {
      month: 'January',
      year: '2021',
    },
    attendance1: [
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Late',
      'Present',
      'Present',
      'Absent',
    ],
  },
  {
    employee: {
      name: 'hatdog digididog',
    },
    date: {
      month: 'January',
      year: '2021',
    },
    attendance1: [
      'Present',
      'Present',
      'Late',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Present',
      'Late',
      'Present',
      'Present',
      'Absent',
    ],
  },
];
