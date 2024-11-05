import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { RxDotsHorizontal } from "react-icons/rx";
import { cn } from "@/utils/utils"; // ou substitua com sua função de classes
import { useTranslation } from "react-i18next";

interface DropdownActionsProps {
  onBuy: () => void;
  onSell: () => void;
  onDelete: () => void;
  className?: string;
}

export function DropdownActions({
  onBuy,
  onSell,
  onDelete,
  className,
}: DropdownActionsProps) {
  const { t } = useTranslation();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            "px-2 py-1 outline-none transition-all rounded-lg cursor-pointer bg-slate-200 hover:scale-110 hover:bg-slate-300",
            className
          )}
        >
          <RxDotsHorizontal />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="z-10 w-48 p-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-md"
        >
          <DropdownMenu.Item
            onClick={onBuy}
            className="px-4 py-2 text-sm text-gray-700 rounded-md cursor-pointer hover:bg-gray-100"
          >
            {t("private.homepage.assets-list.new-buy")}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={onSell}
            className="px-4 py-2 text-sm text-gray-700 rounded-md cursor-pointer hover:bg-gray-100"
          >
            {t("private.homepage.assets-list.new-sale")}
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-px my-1 bg-gray-200" />
          <DropdownMenu.Item
            onClick={onDelete}
            className="px-4 py-2 text-sm rounded-md cursor-pointer hover:text-red-600 hover:bg-red-100"
          >
            {t("private.homepage.assets-list.delete")}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
