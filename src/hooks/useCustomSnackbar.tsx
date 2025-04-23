import { enqueueSnackbar } from "notistack";

interface SnackbarOptions {
  variant?: "default" | "error" | "success" | "warning" | "info";
}

const useCustomSnackbar = () => {
  return (
    message: string,
    variant: SnackbarOptions["variant"] = "success",
    options: SnackbarOptions = {}
  ) =>
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      ...options,
    });
};

export default useCustomSnackbar;
