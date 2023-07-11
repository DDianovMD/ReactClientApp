import axios from "axios";
import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";

export function Edit() {
    const { state } = useLocation();
    const [employee, setEmployee] = useState({})
    const id = state.id;
    const URI = `https://localhost:7189/api/employees/${id}`

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

    function handleSaveButtonClick() {
        axios.put(URI, employee)
        .then((response) => {
            if(response.status === 204) {
                document.location = 'http://localhost:3000'
                alert('Successfully updated employee!');
            }
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        axios.get(URI)
        .then((response) => {
            const data = response.data;
            setEmployee(data);
        })
        .catch(error => console.log(error))
    }, [])

    if(employee.firstName === undefined) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="d-flex justify-content-center flex-column">
                <div style={{alignSelf: "center"}}>
                    <h1>Edit employee</h1>
                </div>
                <div style={{width: "200px", alignSelf: "center"}}>
                    <input type="text"
                            className="form-control mb-4"
                            placeholder="First name"
                            defaultValue={employee.firstName}
                            onChange={(event) => handleFirstNameChange(event)}>
                    </input>
                    <input type="text"
                            className="form-control mb-4"
                            placeholder="Last name"
                            defaultValue={employee.lastName}
                            onChange={(event) => handleLastnameChange(event)}>
                    </input>
                    <input type="string"
                            className="form-control mb-4"
                            placeholder="Phone number"
                            defaultValue={employee.phone}
                            onChange={(event) => handlePhoneChange(event)}>
                    </input>
                    <button type="button" className="btn btn-success" onClick={(event) => handleSaveButtonClick()}>Save</button>
                </div>
            </div>
        )
    }
}