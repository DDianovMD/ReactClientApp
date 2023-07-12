import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Toast } from "primereact/toast";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export function EmployeeList(): React.JSX.Element {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const queryClient = useQueryClient();
  const toast = useRef<Toast>(null);

  const URI = "https://localhost:7189/api/employees";
  let counter: number = 1;

  const getEmployeesQuery = useQuery({
    queryKey: ["getEmployees"],
    queryFn: () => {
      return axios
        .get(URI)
        .then((response) => {
          if (typeof response.data === typeof employees) {
            setEmployees(response.data);
          } else {
            throw new Error(
              `Fetching employees results in response data type different from Employee[] ` +
                `(response data type: ${typeof response.data}).`
            );
          }
        })
        .catch((err) => console.error(err));
    },
  });

  const deleteEmployee = useMutation({
    mutationFn: (id: string) => {
      return axios
        .delete(URI + `/${id}`)
        .then((response) => {
          if (response.status === 200) {
            setEmployees(employees.filter((employee) => employee.id !== id));
            const messageSummary = "Employee deleted.";
            const message = "Successfully deleted employee!";
            showSuccessMessage(messageSummary, message);
          } else {
            const messageSummary = "Error!";
            const message = "Unexpected error occured. Please try again later.";
            showErrorMessage(messageSummary, message);
          }
        })
        .catch((error) => console.log(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
    },
  });

  const showSuccessMessage = (summary: string, message: string) => {
    toast.current?.show({
      severity: "success",
      summary: summary,
      detail: message,
    });
  };

  const showErrorMessage = (summary: string, errorMessage: string): void => {
    toast.current?.show({
      severity: "error",
      summary: summary,
      detail: errorMessage,
    });
  };

  if (getEmployeesQuery.isLoading) {
    return <div>Loading...</div>;
  } else if (getEmployeesQuery.isError) {
    return <div>Unexpected error occured. Please try again later.</div>;
  } else {
    if (getEmployeesQuery.isFetched && employees.length == 0) {
      return (
        <>
          <div className="mb-5 mt-5">Employees not found.</div>
          <div>
            <span>Add first employee by clicking </span>
            <Link to="/add" className="btn btn-success">
              here
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Toast ref={toast} />
          <section>
            <h1 className="mb-4">Employees</h1>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">FirstName</th>
                  <th scope="col">LastName</th>
                  <th scope="col">Phone</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <th scope="row">{counter++}</th>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.phone}</td>
                    <td>
                      <Link
                        to="/edit"
                        state={{ id: employee.id }}
                        className="btn btn-warning edit-btn"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteEmployee.mutate(employee.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Link to="/add" className="btn btn-success">
              Add
            </Link>
          </section>
        </>
      );
    }
  }
}
