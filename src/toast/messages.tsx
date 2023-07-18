import { Toast } from "primereact/toast";

export const showMessage = (
  toast: React.RefObject<Toast>,
  severity: "warn" | "success" | "info" | "error",
  summary: string,
  detail: string
): void => {
  toast.current?.show({
    severity: severity,
    summary: summary,
    detail: detail,
    life: 3000,
  });
};
