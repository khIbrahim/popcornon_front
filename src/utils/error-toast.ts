import { AxiosError } from "axios";
import { toast } from "sonner";

export default function toastError(error: unknown): void {
  if (error instanceof AxiosError) {
    const message = `${error.response?.data?.message || "An error occurred"}: ${
      error.response?.data?.error || "Unknown error"
    }`;
    toast.error(message);
  } else if (error instanceof Error) {
    toast.error(error.message || "An unexpected error occurred");
  } else {
    toast.error("An unexpected error occurred. Please try again.");
  }
}