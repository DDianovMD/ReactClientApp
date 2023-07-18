import { useQuery, useMutation } from "react-query";
import {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/apicalls";

export const AddEmployeeMutation = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
  return useMutation({
    mutationKey: "addEmployee",
    mutationFn: addEmployee,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const UpdateEmployeeMutation = (onSuccess: (data: any) => void) => {
  return useMutation({
    mutationKey: "getEmployees",
    mutationFn: updateEmployee,
    onSuccess: onSuccess,
    onError: (error) => console.error(error),
  });
};

export const DeleteEmployeeMutation = (onSuccess: (data: any) => void) => {
  return useMutation({
    mutationKey: "getEmployees",
    mutationFn: deleteEmployee,
    onSuccess: onSuccess,
    onError: (error) => console.error(error),
  });
};

export const GetEmployeesQuery = (onSuccess: (data: any) => void) => {
  return useQuery({
    queryKey: ["getEmployees"],
    queryFn: getEmployees,
    onSuccess: onSuccess,
    onError: (error) => console.error(error),
  });
};

export const GetByIdQuery = (id: string, onSuccess: (data: any) => void) => {
  return useQuery({
    queryKey: ["getEmployees", id],
    queryFn: () => getEmployeeById(id),
    onSuccess: onSuccess,
    onError: (error) => console.error(error),
    enabled: false
  });
};
