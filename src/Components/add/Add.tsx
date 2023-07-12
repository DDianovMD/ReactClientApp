import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URI = `https://localhost:7189/api/employees`;

type Employee = {
  firstName: string,
  lastName: string,
  phone: string,
}

export function Add() {
  const navigate = useNavigate();

  let employee: Employee = {
      firstName: "",
      lastName: "",
      phone: "",
  }

  const formik = useFormik({
    initialValues: employee,
    onSubmit: (values) => {
      axios
        .post(URI, values)
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
  );
}
