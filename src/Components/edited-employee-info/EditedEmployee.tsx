import React, { useContext } from 'react'
import { EmployeeContext } from '../../Models/EmployeeContext'
import { EditedEmployeeProps } from '../../Models/EditedEmployeeProps';
import { Employee } from '../../Models/Employee';

const EditedEmployee = ({isEditing}: EditedEmployeeProps) => {
    let employee = useContext<Employee>(EmployeeContext);

    let textContent;
    if(isEditing) {
        textContent = "Currently editing:"
    } else {
        textContent = "Last edited:"
    }

  return (
    <span>{textContent} {employee?.firstName} {employee?.lastName}</span>
  )
}

export default EditedEmployee