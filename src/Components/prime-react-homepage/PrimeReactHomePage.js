import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import React, {useState, useRef} from "react";
import axios from 'axios';
import { useQuery } from 'react-query'                                       
import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Sidebar } from 'primereact/sidebar';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

export function PrimeReactHomePage() {
    const URI = 'https://localhost:7189/api/employees';
    const [addVisibility, setAddVisibility] = useState(false);
    const [editVisibility, setEditVisibility] = useState(false);
    const [employeeId, setEmployeeId] = useState('');
    const [employee, setEmployee] = useState({})
    const toast = useRef(null);

    const getAllQuery = useQuery('getEmployees', () => {
        return axios.get(URI)
    })

    const getByIdQuery = useQuery({
        queryKey: ['getEmployee', employeeId],
        queryFn: () => getSingleEmployee(employeeId),
        enabled: false
    })

    const addQuery = useQuery({
        queryKey: ['addEmployee'],
        queryFn: () => {
            axios.post(URI, employee)
        },
        enabled: false
    })

    const updateQuery = useQuery({
        queryKey: ['updateEmployee', employeeId],
        queryFn: () => updateEmployee(employeeId),
        enabled: false
    })

    const deleteQuery = useQuery({
        queryKey: ['deleteEmployee', employeeId],
        queryFn: () => deleteEmployee(employeeId),
        enabled: false
    })

    // Skeleton set
    const items = Array.from({ length: 4 }, (v, i) => i);
    function bodyTemplate() {
        return (
          <Skeleton></Skeleton>
        )
    }

    // Fetching functions
    function getSingleEmployee(id) {
        return axios.get(URI + `/${id}`);
    }

    function updateEmployee(id) {
        return axios.put(URI + `/${id}`, employee)
    }

    function deleteEmployee(id) {
        return axios.delete(URI + `/${id}`)
    }

    // Input handlers
    function handleFirstNameChange(event) {
        setEmployee({...employee, firstName: event.target.value});
    }

    function handleLastNameChange(event) {
        setEmployee({...employee, lastName: event.target.value})
    }

    function handlePhoneChange(event) {
        setEmployee({...employee, phone: event.target.value})
    }
  
    // Toast
    const showAdded = () => {
        toast.current.show({severity:'success', summary: 'Info', detail:'Employee added successfuly!', life: 3000})
    }

    const showEdited = () => {
        toast.current.show({severity:'warn', summary: 'Info', detail:'Employee edited successfuly!', life: 3000})
    }

    const showDeleted = () => {
        toast.current.show({severity:'error', summary: 'Info', detail:'Employee deleted successfuly!', life: 3000})
    }

    if(getAllQuery.isLoading) {
        return (
            <div className="card">
                <DataTable value={items} className="p-datatable-striped">
                    <Column field="firstName" header="First name" style={{ width: '25%' }} body={bodyTemplate}></Column>
                    <Column field="lastName" header="Last name" style={{ width: '25%' }} body={bodyTemplate}></Column>
                    <Column field="phone" header="Phone" style={{ width: '25%' }} body={bodyTemplate}></Column>
                </DataTable>
            </div>
        )
    } else {
        return (
            <>
            <Toast ref={toast} />
            <DataTable value={getAllQuery.data.data} tableStyle={{ minWidth: '50rem', marginBottom: "30px" }}>
                <Column field="firstName" header="First name"></Column>
                <Column field="lastName" header="Last name"></Column>
                <Column field="phone" header="Phone"></Column>
                <Column body={(rowData, column) => 
                    <>
                        <Button id={rowData.id} icon="pi pi-user-edit" style={{marginRight: "15px"}} onClick={(event) => {
                            setEmployeeId(event.target.id);
                            getByIdQuery.refetch();
                            setEditVisibility(true);
                        }}>
                        </Button>
                        <Button id={rowData.id} icon="pi pi-trash" onClick={(event) => {
                            setEmployeeId(event.target.id);
                            deleteQuery.refetch();
                            showDeleted();
                        }}>
                        </Button>
                    </>
                }></Column>
            </DataTable>
            <div className="card flex justify-content-center">
                <Sidebar visible={addVisibility} onHide={() => setAddVisibility(false)}>
                    <h2>Add employee</h2>
                    <InputText type="text"
                               placeholder="First name"
                               style={{marginBottom: "15px"}}
                               onChange={(event) => handleFirstNameChange(event)}
                    />
                    <InputText type="text" 
                               placeholder="Last name" 
                               style={{marginBottom: "15px"}} 
                               onChange={(event) => handleLastNameChange(event)}
                    />
                    <InputText type="text" 
                               placeholder="Phone" 
                               style={{marginBottom: "15px"}} 
                               onChange={(event) => handlePhoneChange(event)}
                    />
                    <div style={{marginLeft: "75px"}}>
                        <Button icon="pi pi-check" onClick={() => {
                            addQuery.refetch(); 
                            showAdded()
                            }}>
                        </Button>
                    </div>
                </Sidebar>
                <Sidebar visible={editVisibility} onHide={() => setEditVisibility(false)}>
                    {
                        getByIdQuery.isLoading === true || getByIdQuery.data === undefined ? 
                        <>
                            <h2>Edit employee</h2>
                            <InputText type="text" placeholder="First name" style={{marginBottom: "15px"}} body={{bodyTemplate}} />
                            <InputText type="text" placeholder="Last name" style={{marginBottom: "15px"}} body={bodyTemplate}/>
                            <InputText type="text" placeholder="Phone" style={{marginBottom: "15px"}} body={bodyTemplate}/>
                            <div style={{marginLeft: "75px"}}>
                                <Button icon="pi pi-save" body={bodyTemplate}></Button>
                            </div>
                        </>
                        : 
                        <>
                            <h2>Edit employee</h2>
                            <InputText type="text"
                                       placeholder="First name" 
                                       style={{marginBottom: "15px"}} 
                                       defaultValue={getByIdQuery.data.data.firstName} 
                                       onChange={(event) => handleFirstNameChange(event)}
                            />
                            <InputText type="text" 
                                       placeholder="Last name" 
                                       style={{marginBottom: "15px"}} 
                                       defaultValue={getByIdQuery.data.data.lastName}
                                       onChange={(event) => handleLastNameChange(event)}
                            />
                            <InputText type="text" 
                                       placeholder="Phone" 
                                       style={{marginBottom: "15px"}} 
                                       defaultValue={getByIdQuery.data.data.phone}
                                       onChange={(event) => handlePhoneChange(event)}
                            />
                            <div style={{marginLeft: "75px"}}>
                                <Button icon="pi pi-save" onClick={(event) => {
                                    updateQuery.refetch();
                                    setEditVisibility(false);
                                    showEdited();
                                }}>
                                </Button>
                            </div>
                        </>
                    }
                    
                </Sidebar>
                <Button icon="pi pi-plus" onClick={() => setAddVisibility(true)} />
            </div>
            </>
        )
    }
}