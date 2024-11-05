import { cn, formatCurrency } from "@/utils/utils";
import { PieChart } from "../charts/pie-chart";
import colors from "@/utils/colors";
import { usePortfolio } from "@/context/assets-context";
import { useCallback, useMemo } from "react";
import { ChartCard } from "./components/chart-card";

interface IGrossBalance {
  className?: string;
}

export function MainChart({ className }: IGrossBalance) {
  const { assets, portfolio } = usePortfolio();

  const data = useMemo(() => {
    const types = ["Ação", "Cripto", "Fundo", "Tesouro"];
    return types.map((type, i) => ({
      value: assets
        .filter((each) => each.type === type)
        .reduce((acc, each) => each.value * each.quantity + acc, 0),
      name: type,
      itemStyle: { color: colors[i] },
    }));
  }, [assets]);

  const formattedBalance = useCallback(
    () => formatCurrency(portfolio.grossBalance),
    [portfolio.grossBalance]
  );

  return (
    <div
      className={cn(
        className,
        "w-full lg:w-[45%] pr-0 lg:pr-5 rounded-[26px] flex-col lg:flex-row bg-white shadow-md flex items-center justify-center lg:max-h-[360px] pb-10 lg:pb-0"
      )}
    >
      <div className="relative flex flex-col w-full lg:w-3/5">
        <PieChart data={data} />
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
          <p className="text-[12px] font-extrabold hover:scale-105 transition-all cursor-pointer">
            {formattedBalance()}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center w-full p-10 lg:p-0 lg:w-2/5">
        {data.map((each, i) => (
          <ChartCard data={each} key={i} />
        ))}
      </div>
    </div>
  );
}
