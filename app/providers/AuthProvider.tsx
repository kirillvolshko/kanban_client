"use client";
import { Spinner } from "@/components/common/ui/Spinner";
import { RootState } from "@/store";
import { useRefreshQuery } from "@/store/auth/authService";
import { setToken, setUserId } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { access_token, refresh_token } = useSelector(
    (state: RootState) => state.auth
  );
  const { data, refetch, isLoading } = useRefreshQuery({});

  const router = useRouter();
  useEffect(() => {
    if (refresh_token) {
      if (data?.accessToken) {
        dispatch(setToken(data.accessToken));
        dispatch(setUserId(data.user.id));
        router.push("/home");
      }
    } else {
      router.push("/auth");
    }
  }, [data, dispatch, router, refresh_token]);

  useEffect(() => {
    if (!access_token) return;

    const refreshInterval = setInterval(() => {
      refetch();
    }, 29.5 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [access_token, refetch]);
  if (isLoading) return <Spinner />;
  return <>{children}</>;
};
