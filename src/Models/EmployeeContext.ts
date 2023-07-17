import { createContext } from 'react';
import { Employee } from './Employee';

export const EmployeeContext = createContext<Employee>(new Employee());