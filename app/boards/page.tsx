import { ActionButton } from "@/components/common/ui/ActionButton";
import { PopoverWindow } from "@/components/common/ui/PopoverWindow";
import { Plus } from "lucide-react";
import CreateBoardForm from "./components/CreateBoardForm";
import { BoardsList } from "./components/boards/BoardsList";

const BoardsPage = () => {
  return (
    <div className="flex flex-col gap-5 p-[30px]">
      <PopoverWindow
        triggerComponent={<ActionButton icon={<Plus />} title="Add board" />}
        content={<CreateBoardForm />}
        className="flex justify-end w-full"
      />
      <BoardsList />
    </div>
  );
};
export default BoardsPage;
