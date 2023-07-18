import { Toast } from "primereact/toast"

export type EditProps = {
    toast: React.RefObject<Toast>,
    setEditVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}