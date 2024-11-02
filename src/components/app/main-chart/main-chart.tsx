import { cn, formatCurrency } from "@/utils/utils";
import { PieChart } from "../charts/pie-chart";
import colors from "@/utils/colors";
import getUserLogs from "@/utils/mock";

interface IGrossBalance {
  className?: string;
}

export function MainChart({ className }: IGrossBalance) {
  const totalValue = 321547.58;

  const data = getUserLogs.map((each, i) => ({
    value: each.value,
    name: each.name,
    itemStyle: { color: colors[i] ?? colors[0] },
  }));

  return (
    <div
      className={cn(
        className,
        "w-5/12 border p-4 rounded-[26px] bg-white shadow-md flex items-center gap-4 justify-center"
      )}
    >
      <div className="relative flex flex-col w-6/12">
        <PieChart data={data} />
        <div className="absolute top-0 left-0 z-0 flex items-center justify-center w-full h-full">
          <p className="text-[12px] font-bold hover:scale-105 transition-all cursor-pointer">
            {formatCurrency(totalValue)}
          </p>
        </div>
      </div>
      <div className="grid w-7/12 grid-cols-2 gap-4">
        {data.map((each, i) => (
          <div
            className="flex flex-col items-center justify-start w-full"
            key={i}
          >
            <div className="flex items-start justify-start w-full gap-2">
              <div
                style={{ backgroundColor: each.itemStyle.color }}
                className="w-[8px] h-[8px] mt-1 rounded-full"
              />
              <p className="text-[12px] font-bold w-10/12">{each.name}</p>
            </div>
            <p className="w-full text-sm font-bold ml-7">
              {formatCurrency(each.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
