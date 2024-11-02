import { cn, formatCurrency, sliceText } from "@/utils/utils";
import { PieChart } from "../charts/pie-chart";
import colors from "@/utils/colors";
import getUserLogs from "@/utils/mock";
import { Button } from "@/components/ui/button/button";
import { FaPlus } from "react-icons/fa6";
import { RxDotsHorizontal } from "react-icons/rx";

interface IGrossBalance {
  className?: string;
}

export function AssetsList({ className }: IGrossBalance) {
  const totalValue = 321547.58;

  return (
    <div
      className={cn(
        className,
        "w-7/12 border p-4 rounded-[26px] bg-white shadow-md flex items-start gap-4 justify-start flex-col"
      )}
    >
      <div className="grid flex-col w-full grid-cols-2 gap-2">
        <h1>Lista de ativos</h1>
        <div className="flex justify-end w-full col-span-1">
          <Button leftIcon={<FaPlus className="mr-2 text-[11px]" />} size="sm">
            Adicionar ativo
          </Button>
        </div>
        <input
          type="text"
          placeholder="Buscar ativo"
          className="p-2 text-sm rounded-lg outline-none border-gray-6 bg-slate-100"
        />
      </div>
      <div className="flex flex-col w-full gap-4">
        {getUserLogs.map((each, i) => (
          <div
            key={each.code}
            className="flex items-center justify-start w-full gap-2 p-4 rounded-lg bg-slate-100"
          >
            <div
              style={{ backgroundColor: colors[i] }}
              className="flex items-center justify-center rounded-full w-9 h-9"
            >
              <p className="text-black text-[12px]">{each.code.slice(0, 2)}</p>
            </div>

            <div className="w-2/6">
              <p className="text-[14px]">{sliceText(each?.name, 24)}</p>
            </div>

            <div className="w-1/4">
              <p className="text-[12px]">
                Saldo atual:{" "}
                <span className="font-extrabold">
                  {formatCurrency(each.value)}
                </span>
              </p>
            </div>

            <div className="w-1/4">
              <p className="text-[12px]">
                Quantidade:{" "}
                <span className="font-extrabold">
                  {formatCurrency(each.quantity)}
                </span>
              </p>
            </div>

            <div className="px-2 py-1 transition-all rounded-lg cursor-pointer bg-slate-200 hover:scale-x-110 hover:bg-slate-300">
              <RxDotsHorizontal />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
