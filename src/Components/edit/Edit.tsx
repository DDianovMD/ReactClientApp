import axios from "axios";
import { FormikState, useFormik } from "formik";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export function Edit(): React.JSX.Element {
  const { state } = useLocation();
  const navigate = useNavigate();

  const id = state.id;
  const URI = `https://localhost:7189/api/employees/${id}`;

  let employee: Employee = {
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
  };

  const formik = useFormik<Employee>({
    initialValues: employee,

    onSubmit: (values) => {
      axios
        .put(URI, values)
        .then((response) => {
          if (response.status === 204) {
            alert("Successfully updated employee!");
            navigate("/")
          }
        })
        .catch((error) => console.log(error));
    },
  });

  useEffect(() => {
    axios
      .get(URI)
      .then((response) => {
        let nextState: Partial<FormikState<Employee>> = {
          values: response.data
        }

        formik.resetForm(nextState);
      })
      .catch((error) => console.log(error));
  }, []);

  if (formik.values.firstName === "") {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="d-flex justify-content-center flex-column">
        <div style={{ alignSelf: "center" }}>
          <h1>Edit employee</h1>
        </div>
        <div style={{ width: "200px", alignSelf: "center" }}>
          <form onSubmit={formik.handleSubmit}>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-control mb-4"
              placeholder="First name"
              defaultValue={formik.values.firstName}
              onChange={formik.handleChange}
            ></input>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="form-control mb-4"
              placeholder="Last name"
              defaultValue={formik.values.lastName}
              onChange={formik.handleChange}
            ></input>
            <input
              id="phone"
              name="phone"
              type="string"
              className="form-control mb-4"
              placeholder="Phone number"
              defaultValue={formik.values.phone}
              onChange={formik.handleChange}
            ></input>
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
