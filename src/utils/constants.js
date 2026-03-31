export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const UNIT_MAP = {
  FEET: 'LengthUnit',
  INCHES: 'LengthUnit',
  YARDS: 'LengthUnit',
  CENTIMETERS: 'LengthUnit',
  LITRE: 'VolumeUnit',
  MILLILITRE: 'VolumeUnit',
  GALLON: 'VolumeUnit',
  MILLIGRAM: 'WeightUnit',
  GRAM: 'WeightUnit',
  KILOGRAM: 'WeightUnit',
  POUND: 'WeightUnit',
  TONNE: 'WeightUnit',
  CELSIUS: 'TemperatureUnit',
  FAHRENHEIT: 'TemperatureUnit',
  KELVIN: 'TemperatureUnit',
};

export const UNIT_CATEGORIES = {
  LENGTH: {
    label: 'Length',
    units: [
      { value: 'FEET', label: 'Feet (ft)' },
      { value: 'INCHES', label: 'Inches (in)' },
      { value: 'YARDS', label: 'Yards (yd)' },
      { value: 'CENTIMETERS', label: 'Centimeters (cm)' },
    ],
  },
  WEIGHT: {
    label: 'Weight',
    units: [
      { value: 'MILLIGRAM', label: 'Milligrams (mg)' },
      { value: 'GRAM', label: 'Grams (g)' },
      { value: 'KILOGRAM', label: 'Kilograms (kg)' },
      { value: 'POUND', label: 'Pounds (lb)' },
      { value: 'TONNE', label: 'Tonnes (t)' },
    ],
  },
  TEMPERATURE: {
    label: 'Temperature',
    units: [
      { value: 'CELSIUS', label: 'Celsius (°C)' },
      { value: 'FAHRENHEIT', label: 'Fahrenheit (°F)' },
      { value: 'KELVIN', label: 'Kelvin (K)' },
    ],
  },
  VOLUME: {
    label: 'Volume',
    units: [
      { value: 'LITRE', label: 'Litres (L)' },
      { value: 'MILLILITRE', label: 'Millilitres (mL)' },
      { value: 'GALLON', label: 'Gallons (gal)' },
    ],
  },
};

export const STORAGE_KEYS = {
  TOKEN: 'jwt_token',
  USER: 'user_data',
};
