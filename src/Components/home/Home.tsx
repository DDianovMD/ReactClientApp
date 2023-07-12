import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

type Employee = {
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
}

export function Home(): React.JSX.Element {
    const [employees, setEmployees] = useState<Employee[]>([])
    const navigate = useNavigate();

    const URI = 'https://localhost:7189/api/employees'
    let counter: number = 1;

    function handleDeleteButtonClick(id: string) {
        axios.delete(URI + `/${id}`)
        .then((response) => { 
            alert('Successfully deleted employee!');
            setEmployees(employees.filter(employee => employee.id !== id));
        })
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        axios.get(URI)
            .then((response) => {
                if(typeof(response.data) === typeof(employees)) {
                    setEmployees(response.data)
                }
            })
            .catch((err) => console.log(err));
    }, [])
    
    if(employees.length === 0) {
        return <div>Loading...</div>
    } else {
        return (
            <section>
                <h1 className="mb-4">Employees</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">FirstName</th>
                        <th scope="col">LastName</th>
                        <th scope="col">Phone</th>
                        <th scope="col"></th>
                    </tr>   
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <th scope="row">{counter++}</th>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.phone}</td>
                            <td>
                                <Link to="/edit" state={{id: employee.id}} className="btn btn-warning edit-btn">Edit</Link>
                                <button type="button" className="btn btn-danger" onClick={(event) => handleDeleteButtonClick(employee.id)}>Delete</button>
                            </td>
                        </tr> 
                    ))}
                </tbody>
            </table>

            <Link to="/add" className="btn btn-success">Add</Link>
        </section>
        )
    }
}