interface NameTypes {
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
}

interface NameFormatOptions {
  showMiddleName?: boolean;
  useFullMiddleName?: boolean;
  lastNameFirst?: boolean;
}

/**
 * This takes the person's name in a form of an object and formats it into the
 * desired format.
 *
 * @param param0 nameObj
 * @param param1 nameFormatOptions
 */
export const formatName = (
  { firstName, middleName, lastName, suffix }: NameTypes,
  {
    showMiddleName = true,
    useFullMiddleName = false,
    lastNameFirst = true,
  }: NameFormatOptions = {}
) => {
  const lastNameAndSuffix = [lastName, suffix].filter(Boolean).join(' ');
  const firstAndMiddleName = showMiddleName
    ? [
        firstName,
        useFullMiddleName
          ? middleName
          : middleName?.charAt(0) + (middleName ? '.' : ''),
      ].join(' ')
    : firstName;

  if (lastNameFirst) {
    return [lastNameAndSuffix, firstAndMiddleName].join(', ');
  } else {
    return [firstAndMiddleName, lastNameAndSuffix].join(' ');
  }
};
