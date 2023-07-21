import { Employee } from "./Employee"

export type EmployeeContextType = {
    employee: Employee,
    dispatch: React.Dispatch<{type: string, payload: Employee}>
}