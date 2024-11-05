import { AssetData } from "@/types/assets";
import colors from "@/utils/colors";
import { formatCurrency, sliceText } from "@/utils/utils";
import { DropdownActions } from "./dropdown-menu";
import { useTranslation } from "react-i18next";

interface IAssetCard {
  data: AssetData;
  index: number;
}

export function AssetCard({ data, index }: IAssetCard) {
  const { t } = useTranslation();

  const totalValue = data.value * data.quantity;

  const teste = () => {
    return;
  };

  return (
    <div className="flex items-center justify-start w-full gap-2 p-4 rounded-lg shadow-sm bg-slate-50">
      <div
        style={{ backgroundColor: colors[index] }}
        className="flex items-center justify-center rounded-full w-9 h-9"
      >
        <p className="text-black text-[12px]">{data.code.slice(0, 2)}</p>
      </div>

      <div className="w-2/6">
        <p className="text-[14px]">{sliceText(data?.name, 24)}</p>
      </div>

      <div className="w-1/4">
        <p className="text-[12px]">
          {t("private.homepage.assets-list.current-balance")}{" "}
          <span className="font-extrabold">{formatCurrency(totalValue)}</span>
        </p>
      </div>

      <div className="w-1/4">
        <p className="text-[12px]">
          {t("private.homepage.assets-list.quantity")}{" "}
          <span className="font-extrabold">{data.quantity}</span>
        </p>
      </div>

      <DropdownActions onBuy={teste} onDelete={teste} onSell={teste} />
    </div>
  );
}
