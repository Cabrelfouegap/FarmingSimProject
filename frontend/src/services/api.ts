import axios from 'axios';

const API_BASE = 'http://localhost:3000'; // À adapter si besoin

export const getFields = async () => (await axios.get(`${API_BASE}/fields`)).data;
export const getMachines = async () => (await axios.get(`${API_BASE}/machines`)).data;
export const getFactories = async () => (await axios.get(`${API_BASE}/factories`)).data; 