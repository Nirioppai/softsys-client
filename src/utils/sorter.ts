import { formatName } from 'utils';

export const fullNameSorter = (a: any, b: any) =>
  formatName(a).localeCompare(formatName(b), 'en', { sensitivity: 'base' });

export const nestedFullNameSorter = (a: any, b: any, key: string) =>
  formatName(a[key]).localeCompare(formatName(b[key]), 'en', {
    sensitivity: 'base',
  });
