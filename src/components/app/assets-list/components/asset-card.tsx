import { AssetData } from "@/types/assets";
import colors from "@/utils/colors";
import { formatCurrency, sliceText } from "@/utils/utils";
import { RxDotsHorizontal } from "react-icons/rx";

interface IAssetCard {
  data: AssetData;
  index: number;
}

export function AssetCard({ data, index }: IAssetCard) {
  const totalValue = data.value * data.quantity;

  return (
    <div className="flex items-center justify-start w-full gap-2 p-4 rounded-lg bg-slate-100">
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
          Saldo atual:{" "}
          <span className="font-extrabold">{formatCurrency(totalValue)}</span>
        </p>
      </div>

      <div className="w-1/4">
        <p className="text-[12px]">
          Quantidade: <span className="font-extrabold">{data.quantity}</span>
        </p>
      </div>

      <div className="px-2 py-1 transition-all rounded-lg cursor-pointer bg-slate-200 hover:scale-x-110 hover:bg-slate-300">
        <RxDotsHorizontal />
      </div>
    </div>
  );
}
