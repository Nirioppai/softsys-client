interface NameTypes {
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  nameExtension?: string;
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
 * @param {Object} nameObj - Name of the person in object form.
 * @param {string} nameObj.firstName - Person's first/given name.
 * @param {string=} nameObj.middleName - Person's middle name.
 * @param {string} nameObj.lastName - Person's last/family name.
 * @param {string=} nameObj.suffix - Person's honorific suffix.
 * @param {Object=} nameFormatOptions - Options for formatting the name.
 * @param {boolean=} nameFormatOptions.showMiddleName - Show or hide the middle
 * name. Enabled by default.
 * @param {boolean=} nameFormatOptions.useFullMiddleName - Show or hide the
 * middle name. Disabled by default.
 * @param {boolean=} nameFormatOptions.lastNameFirst - Display the last name
 * first, followed by a comma. Enabled by default.
 */
export const formatName = (
  { firstName, middleName = '', lastName, suffix, nameExtension }: NameTypes,
  {
    showMiddleName = true,
    useFullMiddleName = false,
    lastNameFirst = true,
  }: NameFormatOptions = {}
): string => {
  // hotfix for naming conflict (suffix, nameExtension)
  suffix = nameExtension ? nameExtension : suffix;

  const lastNameAndSuffix = [lastName, suffix].filter(Boolean).join(' ');
  let firstAndMiddleName = showMiddleName
    ? [
        firstName,
        useFullMiddleName
          ? middleName
          : middleName?.charAt(0) + (middleName ? '.' : ''),
      ]
        .join(' ')
        .trim()
    : firstName;

  if (lastName === undefined)
    return [firstAndMiddleName, lastNameAndSuffix].join(' ');

  if (lastNameFirst) {
    return [lastNameAndSuffix, firstAndMiddleName].join(', ');
  } else {
    return [firstAndMiddleName, lastNameAndSuffix].join(' ');
  }
};
