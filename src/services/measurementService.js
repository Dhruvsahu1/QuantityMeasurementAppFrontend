import api from './api';
import { UNIT_MAP } from '../utils/constants';

function getMeasurementType(unit) {
  return UNIT_MAP[unit] || 'LengthUnit';
}

const measurementService = {
  async convert(value, fromUnit, targetUnit) {
    const response = await api.post('/measurements/convert', {
      thisQuantity: {
        value: parseFloat(value),
        unit: fromUnit,
        measurementType: getMeasurementType(fromUnit),
      },
      targetUnit,
    });
    return response.data;
  },

  async compare(value1, unit1, value2, unit2) {
    const response = await api.post('/measurements/compare', {
      thisQuantity: {
        value: parseFloat(value1),
        unit: unit1,
        measurementType: getMeasurementType(unit1),
      },
      thatQuantity: {
        value: parseFloat(value2),
        unit: unit2,
        measurementType: getMeasurementType(unit2),
      },
    });
    return response.data;
  },

  async add(value1, unit1, value2, unit2, targetUnit) {
    const body = {
      thisQuantity: {
        value: parseFloat(value1),
        unit: unit1,
        measurementType: getMeasurementType(unit1),
      },
      thatQuantity: {
        value: parseFloat(value2),
        unit: unit2,
        measurementType: getMeasurementType(unit2),
      },
    };
    if (targetUnit) body.targetUnit = targetUnit;
    const response = await api.post('/measurements/add', body);
    return response.data;
  },

  async getHistory() {
    const response = await api.get('/measurements/history');
    return response.data;
  },

  async getHistoryByOperation(operation) {
    const response = await api.get(`/measurements/history/${operation}`);
    return response.data;
  },

  async getOperationCount(operation) {
    const response = await api.get(`/measurements/count/${operation}`);
    return response.data;
  },
};

export default measurementService;
