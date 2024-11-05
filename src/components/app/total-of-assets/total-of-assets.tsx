import { usePortfolio } from "@/context/assets-context";
import { cn } from "@/utils/utils";
import { useTranslation } from "react-i18next";

interface IGrossBalance {
  className?: string;
}

export function TotalOfAssets({ className }: IGrossBalance) {
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
        {t("private.homepage.total-of-assets.title")}
      </p>
      <p className="text-sm font-bold text-black lg:text-lg">
        {Math.ceil(portfolio.totalAssets)}
      </p>
    </div>
  );
}
