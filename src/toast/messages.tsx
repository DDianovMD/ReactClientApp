import { Toast } from "primereact/toast";

export const showAdded = (toast: React.RefObject<Toast>): void => {
  toast.current?.show({
    severity: "success",
    summary: "Info",
    detail: "Employee added successfuly!",
    life: 3000,
  });
};

export const showEdited = (toast: React.RefObject<Toast>): void => {
  toast.current?.show({
    severity: "warn",
    summary: "Info",
    detail: "Employee edited successfuly!",
    life: 3000,
  });
};

export const showDeleteSuccessMessage = (
  toast: React.RefObject<Toast>,
  summary: string,
  message: string
) => {
  toast.current?.show({
    severity: "success",
    summary: summary,
    detail: message,
  });
};

export const showDeleteErrorMessage = (
  toast: React.RefObject<Toast>,
  summary: string,
  errorMessage: string
): void => {
  toast.current?.show({
    severity: "error",
    summary: summary,
    detail: errorMessage,
  });
};

export const showValidationErrorMessage = (
  toast: React.RefObject<Toast>,
  errorMessage: string
): void => {
  toast.current?.show({
    severity: "error",
    summary: "Invalid data.",
    detail: errorMessage,
  });
};

export const showInfoMessage = (toast: React.RefObject<Toast>) => {
  toast.current?.show({
    severity: "info",
    summary: "No changes were made.",
    detail: "In order to update information you should change field values.",
  });
};
