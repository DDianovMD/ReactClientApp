import axios from "axios";
import { Employee } from "../Models/Employee";

const URI = "https://localhost:7189/api/employees";

export const getEmployees = () => {
  return axios.get(URI);
};

export const getEmployeeById = (id: string) => {
  return axios.get(URI + `/${id}`);
};

export const addEmployee = (employee: Employee) => {
  return axios.post(URI, employee);
};

export const updateEmployee = (employee: Employee) => {
  return axios.put(URI + `/${employee.id}`, employee);
};

export const deleteEmployee = (id: string) => {
  return axios.delete(URI + `/${id}`);
};
