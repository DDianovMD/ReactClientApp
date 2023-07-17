import { createContext } from 'react';
import { Employee } from './Employee';

export const EmployeesContext = createContext<Employee[] | undefined>(undefined);