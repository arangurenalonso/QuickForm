import { getCountries, getCountryCallingCode } from 'libphonenumber-js/min';

export type PhoneCountryOption = {
  iso2: string;
  name: string;
  dialCode: string;
  flag: string;
};

function isoToFlagEmoji(iso2: string): string {
  return iso2
    .toUpperCase()
    .split('')
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join('');
}

export function getPhoneCountryOptions(
  locale: string = 'en'
): PhoneCountryOption[] {
  const regionNames = new Intl.DisplayNames([locale], { type: 'region' });

  return getCountries()
    .map((iso2) => {
      const typedIso2 = iso2 as Parameters<typeof getCountryCallingCode>[0];

      return {
        iso2,
        name: regionNames.of(iso2) ?? iso2,
        dialCode: getCountryCallingCode(typedIso2),
        flag: isoToFlagEmoji(iso2),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
