import { usePortfolio } from "@/context/assets-context";
import { cn, formatCurrency } from "@/utils/utils";
import { useTranslation } from "react-i18next";

interface IGrossBalance {
  className?: string;
}

export function GrossBalance({ className }: IGrossBalance) {
  const { portfolio } = usePortfolio();
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        className,
        "w-full border h-[121px] p-4 rounded-[26px] bg-white shadow-md"
      )}
    >
      <p className="text-sm font-bold lg:text-lg">
        {t("private.homepage.gross-balance.title")}
      </p>
      <p className="text-sm font-bold text-black lg:text-lg">
        {formatCurrency(portfolio.grossBalance)}
      </p>
    </div>
  );
}
