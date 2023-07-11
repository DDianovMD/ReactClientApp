import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URI = `https://localhost:7189/api/employees`;

export function Add() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      employee: {
        firstName: "",
        lastName: "",
        phone: "",
      },
    },
    onSubmit: (values) => {
      axios
        .post(URI, values.employee)
        .then((response) => {
          alert("Successfully added employee!");
          navigate("/");
        })
        .catch((error) => {
          const errors = error.response.data.errors;
          let alertMessage = "";

          for (const key in errors) {
            if (Object.hasOwnProperty.call(errors, key)) {
              const element = errors[key];
              alertMessage += element + "\n";
            }
          }

          alert(alertMessage);
        });
    },
  });

  return (
    <div className="d-flex justify-content-center flex-column">
      <div style={{ alignSelf: "center" }}>
        <h1>Add employee</h1>
      </div>
      <div style={{ width: "200px", alignSelf: "center" }}>
        <form onSubmit={formik.handleSubmit}>
          <input
            id="employee.firstName"
            name="employee.firstName"
            type="text"
            className="form-control mb-4"
            placeholder="First name"
            onChange={formik.handleChange}
            value={formik.values.employee.firstName}
          ></input>
          <input
            id="employee.lastName"
            name="employee.lastName"
            type="text"
            className="form-control mb-4"
            placeholder="Last name"
            onChange={formik.handleChange}
            value={formik.values.employee.lastName}
          ></input>
          <input
            id="employee.phone"
            name="employee.phone"
            type="string"
            className="form-control mb-4"
            placeholder="Phone number"
            onChange={formik.handleChange}
            value={formik.values.employee.phone}
          ></input>
          <button type="submit" className="btn btn-success">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
