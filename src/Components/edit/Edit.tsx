import React, { useContext } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Employee } from "../../Models/Employee";
import { EditProps } from "../../Models/EditProps";
import { UpdateEmployeeMutation } from "../../queries/employeeQueries";
import { showInfo, showWarning } from "../../toast/messages";
import { useQueryClient } from "react-query";
import { EmployeeContext } from "../../Models/EmployeeContext";
import { EmployeeContextType } from "../../Models/EmployeeContextType";

const Edit = ({ toast, employeeEditHandler }: EditProps) => {
  const queryClient = useQueryClient();
  const employeeContext = useContext<EmployeeContextType | undefined>(EmployeeContext);
  const employee = employeeContext?.employee;

  const updateMutation = UpdateEmployeeMutation((data) => {
    if (data.status === 204) {
      const messageSummary = "Info";
      const message = "Employee edited successfuly!"
      showWarning(toast, messageSummary, message);
    }

    queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
  });

  const editFormik = useFormik<Employee>({
    initialValues: employee!,
    onSubmit: (employee: Employee) => {
      if (employee !== editFormik.initialValues) {
        updateMutation.mutate(employee);
        employeeContext?.setEmployee(emp => new Employee());
      } else {
        const messageSummary = "No changes were made.";
        const message = "In order to update information you should change field values.";
        showInfo(toast, messageSummary, message);
      }
    },
  });

  return (
    <>
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
              employeeEditHandler(false);
            }}
          />
        </div>
      </form>
    </>
  );
};

export default Edit;
