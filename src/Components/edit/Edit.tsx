import React, { useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FormikState, useFormik } from "formik";
import { useQuery, useMutation } from "react-query";
import { Toast } from "primereact/toast";
import { Employee } from "../../Models/Employee";

export function Edit(): React.JSX.Element {
  const { state } = useLocation();
  const id = state.id;
  const URI = `https://localhost:7189/api/employees/${id}`;

  const navigate = useNavigate();

  const toast = useRef<Toast>(null);

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
            showSuccessMessage();
            setTimeout(() => navigate("/"), 5000);
          }
        })
        .catch((error) => console.log(error));
    },
  });

  let employee = new Employee();

  const formik = useFormik<Employee>({
    initialValues: employee,
    onSubmit: (employee) => {
        if(employee !== formik.initialValues) {
            editEmployee.mutate(employee);
        } else {
            showInfoMessage();
        }
    },
  });

  const showSuccessMessage = () => {
    toast.current?.show({
      severity: "success",
      summary: "Employee updated.",
      detail: "Successfully updated employee! You will be redirected to homepage.",
    });
  };

  const showInfoMessage = () => {
    toast.current?.show({
        severity: "info",
        summary: "No changes were made.",
        detail: "In order to update information you should change field values.",
      });
  }

  if (getEmployee.isLoading) {
    return <div>Loading...</div>;
  } else if (getEmployee.isError) {
    return <div>Unexpected error occured. Please try again later.</div>;
  } else {
    return (
      <>
        <Toast ref={toast} />
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
      </>
    );
  }
}
