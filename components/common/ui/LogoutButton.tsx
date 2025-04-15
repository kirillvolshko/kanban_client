"use client";
import { useLogoutMutation } from "@/store/auth/authService";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeToken } from "@/store/auth/authSlice";

export const LogoutButton = () => {
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleOnClick = async () => {
    await logout({}).unwrap();
    dispatch(removeToken());
    router.push("/auth");
  };
  return <Button onClick={handleOnClick}>Log out</Button>;
};
