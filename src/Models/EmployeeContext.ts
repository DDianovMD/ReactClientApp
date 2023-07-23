import { createContext } from 'react';
import { EmployeeContextType } from './EmployeeContextType';

export const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);