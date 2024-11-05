import { formatCurrency } from "@/utils/utils";
import { useTranslation } from "react-i18next";

interface IChartCard {
  data: {
    value: number;
    name: string;
    itemStyle: {
      color: string;
    };
  };
}

export function ChartCard({ data }: IChartCard) {
  const { t } = useTranslation();

  const mapType = (word: string) => {
    switch (word) {
      case "Ação":
        return t("private.homepage.main-chart.types.stock");
      case "Cripto":
        return t("private.homepage.main-chart.types.crypto");
      case "Fundo":
        return t("private.homepage.main-chart.types.fii");
      case "Tesouro":
        return t("private.homepage.main-chart.types.fixed-income");
      default:
        return word;
    }
  };

  return (
    <div
      className="flex mb-2 items-center justify-center lg:justify-between md:w-[34%] lg:w-full xl:w-[47%]"
      key={data.name}
    >
      <div className="flex items-start justify-start w-8 h-8">
        <div
          style={{ backgroundColor: data.itemStyle.color }}
          className="w-[8px] h-[8px] rounded-full"
        />
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <p className="text-[12px]">{mapType(data.name)}</p>
        <p className="text-sm font-bold">{formatCurrency(data.value)}</p>
      </div>
    </div>
  );
}
