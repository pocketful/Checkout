import { SelectOption } from '@/components/UI/Select/Select'
import { countryData, Country, State } from '@/data/location'

export const transformCountriesToOptions = (): SelectOption[] => {
  return countryData.countries.map(
    (country: Country): SelectOption => ({
      value: country.isoCode,
      label: country.name,
    }),
  )
}

export const getStatesByCountry = (countryCode: string): SelectOption[] => {
  const country = getCountryByCode(countryCode)
  return (
    country?.states?.map(
      (state: State): SelectOption => ({
        value: state.isoCode,
        label: state.name,
      }),
    ) ?? []
  )
}

export const getCountryByCode = (countryCode: string): Country | undefined => {
  return countryData.countries.find((c) => c.isoCode === countryCode)
}

export const countries = transformCountriesToOptions()
