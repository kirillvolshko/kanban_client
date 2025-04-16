import Link from "next/link";
import { LogoutButton } from "../common/ui/LogoutButton";

export const Header = () => {
  return (
    <header className="flex justify-between p-[30px] bg-secondary">
      <Link href="/boards">
        <div className="">
          <span className="text-white text-[25px] font-bold">Kanban</span>
          <span className="text-primary text-[25px] font-bold">Kiki</span>
        </div>
      </Link>
      <LogoutButton />
    </header>
  );
};
