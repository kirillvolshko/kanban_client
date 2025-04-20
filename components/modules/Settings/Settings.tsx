import { AddUserToProject } from "./form/AddUserToProject";
import { UserTable } from "./UsersTabel";

export const SettigsTab = () => {
  return (
    <div className="flex flex-col gap-10">
      <AddUserToProject />
      <UserTable />
    </div>
  );
};
