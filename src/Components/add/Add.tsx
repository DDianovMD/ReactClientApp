import React, { useRef } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const URI = `https://localhost:7189/api/employees`;

type Employee = {
  firstName: string;
  lastName: string;
  phone: string;
};

export function Add() {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  let employee: Employee = {
    firstName: "",
    lastName: "",
    phone: "",
  };

  const formik = useFormik({
    initialValues: employee,
    onSubmit: (values) => {
      axios
        .post(URI, values)
        .then((response) => {
          if (response.status === 201) {
            showSuccessMessage();
            setTimeout(() => navigate("/"), 5000);
          } else {
            throw new Error(`Unexpected server response. Server responded with status code ${response.status}`);
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
          
          showValidationErrorMessage("All fields are required.")
          console.error(errorMessage);
        });
    },
  });

  const showSuccessMessage = (): void => {
    toast.current?.show({
      severity: "success",
      summary: "Employee added.",
      detail:
        "Successfully added employee! You will be redirected to homepage.",
    });
  };

  const showValidationErrorMessage = (errorMessage: string): void => {
    toast.current?.show({
        severity: "error",
        summary: "Invalid data.",
        detail: errorMessage
      });
  }

  return (
    <>
      <Toast ref={toast} />
      <div className="d-flex justify-content-center flex-column">
        <div className="align-self-center">
          <h1>Add employee</h1>
        </div>
        <div className="form-container">
          <form onSubmit={formik.handleSubmit}>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-control mb-4"
              placeholder="First name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            ></input>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="form-control mb-4"
              placeholder="Last name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            ></input>
            <input
              id="phone"
              name="phone"
              type="string"
              className="form-control mb-4"
              placeholder="Phone number"
              onChange={formik.handleChange}
              value={formik.values.phone}
            ></input>
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
