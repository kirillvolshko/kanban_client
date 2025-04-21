"use client";
import { useSelector } from "react-redux";
import { AddUserToProject } from "./form/AddUserToProject";
import { UserTable } from "./UsersTabel";
import { RootState } from "@/store";
import { useUserId } from "@/hooks/useUserId";

export const SettigsTab = () => {
  const { owner_id } = useSelector((state: RootState) => state.board);
  const userId = useUserId();
  return (
    <div className="flex flex-col gap-10">
      {userId === owner_id && <AddUserToProject />}

      <UserTable />
    </div>
  );
};
