import React from "react";
import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import { Employee } from "../../Models/Employee";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { AddEmployeeMutation } from "../../queries/employeeQueries";
import { showError, showSuccess } from "../../toast/messages";
import { AddProps } from "../../Models/AddProps";

const Add = ({ toast, employeeAddHandler }: AddProps) => {
  const queryClient = useQueryClient();

  const addEmployee = AddEmployeeMutation(
    (data) => {
      if (data.status === 201) {
        const messageSummary = "Info";
        const message = "Employee added successfuly!"
        showSuccess(toast, messageSummary, message);
      } else {
        throw new Error(
          `Unexpected server response. Server responded with status code ${data.status}`
        );
      }
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
    },
    (error) => {
      const errors = error.response.data.errors;
      let errorMessage = "";
      for (const key in errors) {
        if (Object.hasOwnProperty.call(errors, key)) {
          const element = errors[key];
          errorMessage += element + "\n";
        }
      }

      const messageSummary = "Invalid data."
      const message = "All fields are required."
      showError(toast, messageSummary, message);
      console.error(errorMessage);
    }
  );

  const addFormik = useFormik<Employee>({
    initialValues: new Employee(),
    onSubmit: (employee) => {
      addEmployee.mutate(employee);
    },
  });

  return (
    <>
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
            onClick={() => employeeAddHandler(false)}
          />
        </div>
      </form>
    </>
  );
};

export default Add;
