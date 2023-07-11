import React, { useState } from "react";
import axios from "axios";

export function Add() {
    const [employee, setEmployee] = useState({})
    const URI = `https://localhost:7189/api/employees`

    function handleFirstNameChange(event) {
        let inputValue = event.target.value;
        const updatedEmployee = {...employee, firstName: inputValue}
        setEmployee(updatedEmployee)
    }

    function handleLastnameChange(event) {
        let inputValue = event.target.value;
        const updatedEmployee = {...employee, lastName: inputValue}
        setEmployee(updatedEmployee)
    }

    function handlePhoneChange(event) {
        let inputValue = event.target.value;
        const updatedEmployee = {...employee, phone: inputValue}
        setEmployee(updatedEmployee)
    }

    function handleAddButtonClick() {
        axios.post(URI, employee)
        .then((response) => {
            document.location = 'http://localhost:3000'
            alert('Successfully added employee!')
        })
        .catch((error) => {
            const errors = error.response.data.errors
            let alertMessage = '';

            for (const key in errors) {
                if (Object.hasOwnProperty.call(errors, key)) {
                    const element = errors[key];
                    alertMessage += element + '\n';
                }
            }
            
            alert(alertMessage)
        })
    }

    return (
        <div className="d-flex justify-content-center flex-column">
                <div style={{alignSelf: "center"}}>
                    <h1>Add employee</h1>
                </div>
                <div style={{width: "200px", alignSelf: "center"}}>
                    <input type="text"
                            className="form-control mb-4"
                            placeholder="First name"
                            onChange={(event) => handleFirstNameChange(event)}>
                    </input>
                    <input type="text"
                            className="form-control mb-4"
                            placeholder="Last name"
                            onChange={(event) => handleLastnameChange(event)}>
                    </input>
                    <input type="string"
                            className="form-control mb-4"
                            placeholder="Phone number"
                            onChange={(event) => handlePhoneChange(event)}>
                    </input>
                    <button type="button" className="btn btn-success" onClick={(event) => handleAddButtonClick()}>Add</button>
                </div>
            </div>
    )
}