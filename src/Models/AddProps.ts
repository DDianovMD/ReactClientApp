import { Toast } from "primereact/toast";

export type AddProps = {
    toast: React.RefObject<Toast>,
    setAddVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}