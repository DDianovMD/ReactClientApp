import React from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Employee } from "../../Models/Employee";
import { EditProps } from "../../Models/EditProps";
import { useUpdateEmployeeMutation } from "../../queries/employeeQueries";
import { showInfoMessage } from "../../toast/messages";
import { useQueryClient } from "react-query";
import { showEdited } from "../../toast/messages";

const Edit = ({ toast, setEditVisibility, employee }: EditProps) => {
  const queryClient = useQueryClient();

  const updateMutation = useUpdateEmployeeMutation((data) => {
    if (data.status === 204) {
      showEdited(toast);
    }

    queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
  });

  const editFormik = useFormik<Employee>({
    initialValues: employee,
    onSubmit: (employee: Employee) => {
      if (employee !== editFormik.initialValues) {
        updateMutation.mutate(employee);
      } else {
        showInfoMessage(toast);
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
              setEditVisibility(false);
            }}
          />
        </div>
      </form>
    </>
  );
};

export default Edit;
