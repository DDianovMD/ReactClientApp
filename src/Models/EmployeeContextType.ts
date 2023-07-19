import { Employee } from "./Employee"

export type EmployeeContextType = {
    employee: Employee,
    setEmployee: React.Dispatch<React.SetStateAction<Employee>>,
}