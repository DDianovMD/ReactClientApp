import { Employee } from "./Employee";

export function employeeReducer(
    employee: Employee,
    action: { type: string; payload: Employee }
  ): Employee {
    switch (action.type) {
      case "getEmployee":
        return {
          ...employee,
          ...({
            id: action.payload.id,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            phone: action.payload.phone,
          } as Employee),
        } as Employee;
      default:
        throw new Error("Unexpected action type received.");
    }
  }