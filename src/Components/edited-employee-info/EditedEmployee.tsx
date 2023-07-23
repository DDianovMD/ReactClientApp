import React, { useContext } from 'react'
import { EmployeeContext } from '../../Models/EmployeeContext'
import { EditedEmployeeProps } from '../../Models/EditedEmployeeProps';
import { EmployeeContextType } from '../../Models/EmployeeContextType';

const EditedEmployee = ({isEditing}: EditedEmployeeProps) => {
    const employeeContext = useContext<EmployeeContextType | undefined>(EmployeeContext);
    
    console.log(employeeContext!.employee.firstName + ' context value');
    
    let textContent;
    if(isEditing) {
        textContent = "Currently editing:"
    } else {
        textContent = "Last edited:"
    }

   
  if(employeeContext!.employee.firstName !== '') {
    return <span>{textContent} {employeeContext?.employee.firstName} {employeeContext?.employee.lastName}</span>
  } 

  return <></>
}

export default EditedEmployee