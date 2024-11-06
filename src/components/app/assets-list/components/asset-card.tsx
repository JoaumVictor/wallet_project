import { AssetData } from "@/types/assets";
import colors from "@/utils/colors";
import { formatCurrency, sliceText } from "@/utils/utils";
import { DropdownActions } from "./dropdown-menu";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { DeleteAssetDialog } from "../../dialogs/delete-asset-dialog/delete-asset-dialog";
import { BuyAssetDialog } from "../../dialogs/buy-asset-dialog/buy-asset-dialog";
import { SaleAssetDialog } from "../../dialogs/sale-asset-dialog/sale-asset-dialog";

interface IAssetCard {
  data: AssetData;
  index: number;
}

export function AssetCard({ data, index }: IAssetCard) {
  const { t } = useTranslation();
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [buyIsOpen, setBuyIsOpen] = useState(false);
  const [saleIsOpen, setSaleIsOpen] = useState(false);

  const totalValue = data.value * data.quantity;

  return (
    <div className="flex items-center justify-start w-full gap-2 p-4 rounded-lg shadow-sm bg-slate-50">
      <div
        style={{ backgroundColor: colors[index] }}
        className="items-center justify-center hidden rounded-full sm:flex w-9 h-9"
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

      <BuyAssetDialog
        isOpen={buyIsOpen}
        setIsOpen={setBuyIsOpen}
        asset={data}
      />

      <SaleAssetDialog
        isOpen={saleIsOpen}
        setIsOpen={setSaleIsOpen}
        asset={data}
      />

      <DeleteAssetDialog
        isOpen={deleteIsOpen}
        setIsOpen={setDeleteIsOpen}
        assetName={data.name}
      />

      <DropdownActions
        onBuy={() => setBuyIsOpen(true)}
        onDelete={() => setDeleteIsOpen(true)}
        onSell={() => setSaleIsOpen(true)}
      />
    </div>
  );
}
