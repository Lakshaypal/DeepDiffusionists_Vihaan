import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const uploadPrescription = async (prescriptionData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/prescriptions`, prescriptionData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPrescriptions = async (patientId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/prescriptions/${patientId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateHealthHistory = async (patientId, historyData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/health-history/${patientId}`, historyData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getHealthHistory = async (patientId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health-history/${patientId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};