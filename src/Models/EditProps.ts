import { Toast } from "primereact/toast"
import { Employee } from "./Employee"

export type EditProps = {
    toast: React.RefObject<Toast>,
    setEditVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    employee: Employee,
}