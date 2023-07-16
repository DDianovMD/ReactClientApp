import React, { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Skeleton } from "primereact/skeleton";
import { DataTable, DataTableValue } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useFormik, FormikState } from "formik";
import { Employee } from "../../Models/Employee";
import {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../api/apicalls";
import { useContext } from "react";
import { EmployeeContext } from "../../Models/EmployeeContext";

export function PrimeReactHomePage() {
  const [addVisibility, setAddVisibility] = useState(false);
  const [editVisibility, setEditVisibility] = useState(false);
  const [id, setId] = useState<string>("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const toast = useRef<Toast>(null);
  const queryClient = useQueryClient();
  const editedEmployee = useContext(EmployeeContext);
  console.log(editedEmployee);
  const addFormik = useFormik<Employee>({
    initialValues: new Employee(),
    onSubmit: (values) => {
      addEmployeeMutation.mutate(values);
    },
  });

  const editFormik = useFormik<Employee>({
    initialValues: new Employee(),
    onSubmit: (employee) => {
      if (employee !== editFormik.initialValues) {
        updateEmployeeMutation.mutate(employee);
      } else {
        showInfoMessage();
      }
    },
  });

  // Queries and mutations
  const getEmployeesQuery = useQuery({
    queryKey: ["getEmployees"],
    queryFn: () => {
      return getEmployees()
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

  const getByIdQuery = async (id: string) => {
    getEmployeeById(id)
      .then((response) => {
        let nextState: Partial<FormikState<Employee>> = {
          values: response.data,
        };
        editFormik.resetForm(nextState);
      })
      .catch((error) => console.log(error));
  };

  const addEmployeeMutation = useMutation({
    mutationFn: (employee: Employee) => {
      return addEmployee(employee)
        .then((response) => {
          if (response.status === 201) {
            showAdded();
          } else {
            throw new Error(
              `Unexpected server response. Server responded with status code ${response.status}`
            );
          }
        })
        .catch((error) => {
          const errors = error.response.data.errors;
          let errorMessage = "";

          for (const key in errors) {
            if (Object.hasOwnProperty.call(errors, key)) {
              const element = errors[key];
              errorMessage += element + "\n";
            }
          }

          showValidationErrorMessage("All fields are required.");
          console.error(errorMessage);
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: (values: Employee) => {
      return updateEmployee(id, values)
        .then((response) => {
          if (response.status === 204) {
            showEdited();
          }
        })
        .catch((error) => console.log(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteEmployee(id)
        .then((response) => {
          if (response.status === 200) {
            setEmployees(employees.filter((employee) => employee.id !== id));
            const messageSummary = "Employee deleted.";
            const message = "Successfully deleted employee!";
            showDeleteSuccessMessage(messageSummary, message);
          } else {
            const messageSummary = "Error!";
            const message = "Unexpected error occured. Please try again later.";
            showDeleteErrorMessage(messageSummary, message);
          }
        })
        .catch((error) => console.log(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
    },
  });

  // Skeleton set
  const items: DataTableValue[] = Array.from(
    { length: 5 },
    (v, i) => i as unknown as DataTableValue
  );
  function bodyTemplate(): JSX.Element {
    return <Skeleton></Skeleton>;
  }

  // Toast
  const showAdded = (): void => {
    toast.current?.show({
      severity: "success",
      summary: "Info",
      detail: "Employee added successfuly!",
      life: 3000,
    });
  };

  const showEdited = (): void => {
    toast.current?.show({
      severity: "warn",
      summary: "Info",
      detail: "Employee edited successfuly!",
      life: 3000,
    });
  };

  const showDeleteSuccessMessage = (summary: string, message: string) => {
    toast.current?.show({
      severity: "success",
      summary: summary,
      detail: message,
    });
  };

  const showDeleteErrorMessage = (
    summary: string,
    errorMessage: string
  ): void => {
    toast.current?.show({
      severity: "error",
      summary: summary,
      detail: errorMessage,
    });
  };

  const showValidationErrorMessage = (errorMessage: string): void => {
    toast.current?.show({
      severity: "error",
      summary: "Invalid data.",
      detail: errorMessage,
    });
  };

  const showInfoMessage = () => {
    toast.current?.show({
      severity: "info",
      summary: "No changes were made.",
      detail: "In order to update information you should change field values.",
    });
  };

  if (getEmployeesQuery.isLoading) {
    return (
      <DataTable value={items} className="p-datatable-striped">
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
                    getByIdQuery(rowData.id);
                    setEditVisibility(true);
                  }}
                />
                <Button
                  icon="pi pi-trash"
                  onClick={() => deleteEmployeeMutation.mutate(rowData.id)}
                />
              </>
            )}
          ></Column>
        </DataTable>
        <Sidebar visible={addVisibility} onHide={() => setAddVisibility(false)}>
          <h2>Add employee</h2>
          <form onSubmit={addFormik.handleSubmit}>
            <InputText
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First name"
              style={{ marginBottom: "15px" }}
              onChange={addFormik.handleChange}
            />
            <InputText
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last name"
              style={{ marginBottom: "15px" }}
              onChange={addFormik.handleChange}
            />
            <InputText
              id="phone"
              name="phone"
              type="text"
              placeholder="Phone"
              style={{ marginBottom: "15px" }}
              onChange={addFormik.handleChange}
            />
            <div style={{ marginLeft: "75px" }}>
              <Button
                type="submit"
                icon="pi pi-check"
                onClick={() => setAddVisibility(false)}
              />
            </div>
          </form>
        </Sidebar>
        <Sidebar
          visible={editVisibility}
          onHide={() => setEditVisibility(false)}
        >
          <h2>Edit employee</h2>
          <form onSubmit={editFormik.handleSubmit}>
            <InputText
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First name"
              style={{ marginBottom: "15px" }}
              defaultValue={editFormik.values.firstName}
              onChange={editFormik.handleChange}
            />
            <InputText
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last name"
              style={{ marginBottom: "15px" }}
              defaultValue={editFormik.values.lastName}
              onChange={editFormik.handleChange}
            />
            <InputText
              id="phone"
              name="phone"
              type="text"
              placeholder="Phone"
              style={{ marginBottom: "15px" }}
              defaultValue={editFormik.values.phone}
              onChange={editFormik.handleChange}
            />
            <div style={{ marginLeft: "75px" }}>
              <Button
                type="submit"
                icon="pi pi-save"
                onClick={(event) => {
                  setEditVisibility(false);
                }}
              />
            </div>
          </form>
        </Sidebar>
        <Button icon="pi pi-plus" onClick={() => setAddVisibility(true)} />
      </>
    );
  }
}
