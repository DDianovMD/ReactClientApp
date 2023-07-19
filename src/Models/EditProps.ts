import { Toast } from "primereact/toast"

export type EditProps = {
    toast: React.RefObject<Toast>,
    employeeEditHandler: Function,
    // setEditVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}