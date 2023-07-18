import { Toast } from "primereact/toast";

const showMessage = (
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

export const showSuccess = (
  toast: React.RefObject<Toast>,
  summary: string,
  detail: string
): void => {
  showMessage(toast, "success", summary, detail);
};

export const showInfo = (
  toast: React.RefObject<Toast>,
  summary: string,
  detail: string
): void => {
  showMessage(toast, "info", summary, detail);
};

export const showWarning = (
  toast: React.RefObject<Toast>,
  summary: string,
  detail: string
): void => {
  showMessage(toast, "warn", summary, detail);
};

export const showError = (
  toast: React.RefObject<Toast>,
  summary: string,
  detail: string
): void => {
  showMessage(toast, "error", summary, detail);
};