import { usePortfolio } from "@/context/assets-context";
import { cn } from "@/utils/utils";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface IGrossBalance {
  className?: string;
}

export function Movements({ className }: IGrossBalance) {
  const { t } = useTranslation();
  const { movementLogs } = usePortfolio();

  const buys = useMemo(
    () =>
      movementLogs.reduce(
        (acc, each) => (each.type === "buy" ? acc + 1 : acc),
        0
      ),
    [movementLogs]
  );

  const sales = useMemo(
    () =>
      movementLogs.reduce(
        (acc, each) => (each.type === "sale" ? acc + 1 : acc),
        0
      ),
    [movementLogs]
  );

  return (
    <div
      className={cn(
        className,
        "w-full border col-span-2 md:col-span-1 h-[121px] p-4 rounded-[26px] bg-white shadow-md"
      )}
    >
      <p className="w-full text-sm font-bold lg:text-lg">
        {t("private.homepage.movements.title")}
      </p>
      <span className="text-sm font-bold text-black lg:text-lg">{`${buys} ${t(
        "private.homepage.movements.buys"
      )} - ${sales} ${t("private.homepage.movements.sales")}`}</span>
    </div>
  );
}
