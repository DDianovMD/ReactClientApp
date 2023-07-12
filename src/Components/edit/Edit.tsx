import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FormikState, useFormik } from "formik";
import { useQuery, useMutation } from "react-query";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export function Edit(): React.JSX.Element {
  const { state } = useLocation();
  const id = state.id;
  const URI = `https://localhost:7189/api/employees/${id}`;

  const navigate = useNavigate();

  const getEmployee = useQuery({
    queryKey: ["getEmployee"],
    queryFn: () => {
      axios
        .get(URI)
        .then((response) => {
          let nextState: Partial<FormikState<Employee>> = {
            values: response.data,
          };
          formik.resetForm(nextState);
        })
        .catch((error) => console.log(error));
    },
  });

  const editEmployee = useMutation({
    mutationFn: (values: Employee) => {
      return axios
        .put(URI, values)
        .then((response) => {
          if (response.status === 204) {
            alert("Successfully updated employee!");
            navigate("/");
          }
        })
        .catch((error) => console.log(error));
    },
  });

  let employee: Employee = {
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
  };

  const formik = useFormik<Employee>({
    initialValues: employee,
    onSubmit: (employee) => {
      editEmployee.mutate(employee);
    },
  });

  if (getEmployee.isLoading) {
    return <div>Loading...</div>;
  } else if (getEmployee.isError) {
    return <div>Unexpected error occured. Please try again later.</div>;
  } else {
    return (
      <div className="d-flex justify-content-center flex-column">
        <div className="align-self-center">
          <h1>Edit employee</h1>
        </div>
        <div className="form-container">
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
