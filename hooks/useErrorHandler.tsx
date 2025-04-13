import { useEffect } from "react";
import { toast } from "sonner";

export const useErrorHandler = (error: unknown) => {
  useEffect(() => {
    if (!error) return;

    const err = error as { status?: number; data?: { message?: string } };

    if (err?.status && err?.data?.message) {
      toast.error(err.data.message);
    } else {
      toast.error("Something went wrong, please try again.");
    }
  }, [error]);
};
