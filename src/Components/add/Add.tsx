import React, { useState } from "react";
import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import { Employee } from "../../Models/Employee";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAddEmployeeMutation } from "../../queries/employeeQueries";
import { showAdded, showValidationErrorMessage } from "../../toast/messages";
import { AddProps } from "../../Models/AddProps";

const Add = ({ toast, setAddVisibility }: AddProps) => {
  const queryClient = useQueryClient();

  const addEmployee = useAddEmployeeMutation(
    (data) => {
      if (data.status === 201) {
        showAdded(toast);
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
      showValidationErrorMessage(toast, "All fields are required.");
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
            onClick={() => setAddVisibility(false)}
          />
        </div>
      </form>
    </>
  );
};

export default Add;
