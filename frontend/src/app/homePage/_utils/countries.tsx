import countries from "world-countries";

export const formattedCountries = countries.map((country) => ({
  name: country.name.common,
  region: country.region,
  subregion: country.subregion,
  latlng: country.latlng,
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
}));
