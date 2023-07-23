import React, {
  useState,
  useRef,
  useReducer,
} from "react";
import { useQueryClient } from "react-query";
import { Skeleton } from "primereact/skeleton";
import { DataTable, DataTableValue } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Employee } from "../../Models/Employee";
import {
  GetEmployeesQuery,
  GetByIdQuery,
  DeleteEmployeeMutation,
} from "../../queries/employeeQueries";
import { showError, showSuccess } from "../../toast/messages";
import Add from "../add/Add";
import Edit from "../edit/Edit";
import { AxiosResponse } from "axios";
import { EmployeeContext } from "../../Models/EmployeeContext";
import EditedEmployee from "../edited-employee-info/EditedEmployee";
import { employeeReducer } from "../../Models/EmployeeReducer";

export function PrimeReactHomePage() {
  const [addVisibility, setAddVisibility] = useState(false);
  const [editVisibility, setEditVisibility] = useState(false);
  const [id, setId] = useState<string>("");
  const [employee, dispatch] = useReducer(employeeReducer, new Employee());
  const contextValue = {
    employee: employee,
    dispatch,
  };
  const [employees, setEmployees] = useState<Employee[]>([]);
  const toast = useRef<Toast>(null);
  const queryClient = useQueryClient();

  // Skeleton set
  const skeletonItems: DataTableValue[] = Array.from(
    { length: 5 },
    (v, i) => i as unknown as DataTableValue
  );
  function bodyTemplate(): JSX.Element {
    return <Skeleton></Skeleton>;
  }

  // Queries and mutations
  const employeesQuery = GetEmployeesQuery(
    (data: AxiosResponse<Employee[]>) => {
      if (isEmployeeArray(data.data)) {
        setEmployees(data.data);
      } else {
        throw new Error(
          `Fetching employees results in response data type different from Employee[] ` +
            `(response data type: ${typeof data}).`
        );
      }
    }
  );

  const employeeQuery = GetByIdQuery(id, (data: AxiosResponse<Employee>) => {
    if (isEmployee(data.data)) {
      dispatch({
        type: "getEmployee",
        payload: {
          id: data.data.id,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          phone: data.data.phone,
        },
      });
    } else {
      console.error("Server response didn't return object of type Employee");
    }
  });

  const deleteEmployee = DeleteEmployeeMutation((data) => {
    if (data.status === 200) {
      setEmployees(employees.filter((employee) => employee.id !== id));
      const messageSummary = "Employee deleted.";
      const message = "Successfully deleted employee!";
      showSuccess(toast, messageSummary, message);
    } else {
      const messageSummary = "Error!";
      const message = "Unexpected error occured. Please try again later.";
      showError(toast, messageSummary, message);
    }
    queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
  });

  function isEmployeeArray(object: any): object is Employee[] {
    let result: boolean = false;
    result = Array.isArray(object);
    for (const entity of object) {
      result = "id" in entity;
      result = "firstName" in entity;
      result = "lastName" in entity;
      result = "phone" in entity;
    }
    return result;
  }

  function isEmployee(object: any): object is Employee {
    let result: boolean = false;
    result = "id" in object;
    result = "firstName" in object;
    result = "lastName" in object;
    result = "phone" in object;
    return result;
  }

  // Event handlers
  const employeeEditHandler = (data: boolean) => {
    setEditVisibility(data);
  };

  const employeeAddHandler = (data: boolean) => {
    setAddVisibility(data);
  };

  if (employeesQuery.isLoading) {
    return (
      <DataTable value={skeletonItems} className="p-datatable-striped">
        <Column
          field="firstName"
          header="First name"
          style={{ width: "25%" }}
          body={bodyTemplate}
        ></Column>
        <Column
          field="lastName"
          header="Last name"
          style={{ width: "25%" }}
          body={bodyTemplate}
        ></Column>
        <Column
          field="phone"
          header="Phone"
          style={{ width: "25%" }}
          body={bodyTemplate}
        ></Column>
        <Column style={{ width: "25%" }} body={bodyTemplate}></Column>
      </DataTable>
    );
  } else {
    return (
      <>
        <Toast ref={toast} />
        <DataTable
          value={employees}
          tableStyle={{ minWidth: "50rem", marginBottom: "30px" }}
        >
          <Column field="firstName" header="First name"></Column>
          <Column field="lastName" header="Last name"></Column>
          <Column field="phone" header="Phone"></Column>
          <Column
            body={(rowData, column) => (
              <>
                <Button
                  icon="pi pi-user-edit"
                  style={{ marginRight: "15px" }}
                  onClick={() => {
                    setId(rowData.id);
                    employeeQuery.refetch(rowData.id);
                    setEditVisibility(true);
                  }}
                />
                <Button
                  icon="pi pi-trash"
                  onClick={() => deleteEmployee.mutate(rowData.id)}
                />
              </>
            )}
          ></Column>
        </DataTable>
        <Sidebar visible={addVisibility} onHide={() => setAddVisibility(false)}>
          <Add toast={toast} employeeAddHandler={employeeAddHandler} />
        </Sidebar>
        <Sidebar
          visible={editVisibility}
          onHide={() => {
            setEditVisibility(false);
          }}
        >
          {employeeQuery.isFetched ? (
            <EmployeeContext.Provider value={contextValue}>
              <Edit toast={toast} employeeEditHandler={employeeEditHandler} />
            </EmployeeContext.Provider>
          ) : (
            <></>
          )}
        </Sidebar>
        <Button icon="pi pi-plus" onClick={() => setAddVisibility(true)} />
        <br />
        <EmployeeContext.Provider value={contextValue}>
          <EditedEmployee isEditing={editVisibility} />
        </EmployeeContext.Provider>
      </>
    );
  }
}
