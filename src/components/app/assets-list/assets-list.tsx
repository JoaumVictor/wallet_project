import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleDoubleRight,
  FaAngleRight,
} from "react-icons/fa";

import { Button } from "@/components/ui/button/button";
import { AssetCard } from "./components/asset-card";
import { cn } from "@/utils/utils";
import { ItemsPerPageSelect } from "../items-per-page/items-per-page";
import { AddAssetDialog } from "../dialogs/add-asset-dialog/add-asset-dialog";
import { usePortfolio } from "@/context/assets-context";
import { useTranslation } from "react-i18next";

interface IGrossBalance {
  className?: string;
}

export function AssetsList({ className }: IGrossBalance) {
  const { t } = useTranslation();
  const [filterByName, setFilterByName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItensPerPage] = useState(5);

  const { assets } = usePortfolio();

  const filteredLogs = useMemo(() => {
    return assets?.filter((each) =>
      each.name.toLowerCase().includes(filterByName.toLowerCase())
    );
  }, [assets, filterByName]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredLogs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div
      className={cn(
        className,
        "w-full lg:w-[53%] max-h-[750px] border p-4 rounded-[26px] bg-white shadow-md flex items-start gap-4 justify-between flex-col"
      )}
    >
      <div className="grid flex-col w-full grid-cols-2 gap-2">
        <h1 className="font-bold">{t("private.homepage.assets-list.title")}</h1>
        <div className="flex justify-end w-full col-span-1">
          <AddAssetDialog>
            <Button
              className="!text-[12px]"
              leftIcon={<FaPlus className="mr-2 text-[11px]" />}
              size="sm"
            >
              {t("private.homepage.assets-list.add-asset")}
            </Button>
          </AddAssetDialog>
        </div>
        <input
          type="text"
          placeholder={t("private.homepage.assets-list.placeholder")}
          className="p-2 text-[13px] rounded-lg outline-none border-gray-6 bg-slate-100"
          value={filterByName}
          onChange={(e) => {
            setFilterByName(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="flex flex-col w-full h-full gap-4 overflow-y-scroll">
        {currentItems.map((each, i) => (
          <AssetCard key={each.code} data={each} index={i} />
        ))}
      </div>

      <div className="flex items-center justify-between w-full mt-4">
        <div className="w-6/12">
          <p className="text-sm">
            {t("private.homepage.assets-list.showing")} {currentItems.length}{" "}
            <span className="font-bold">
              {currentItems.length === 1
                ? t("private.homepage.assets-list.result")
                : t("private.homepage.assets-list.results")}
            </span>
          </p>
        </div>

        <div className="flex overflow-hidden border rounded-xl">
          <div
            onClick={() => {
              if (currentPage <= 2) return;
              setCurrentPage((prev) => Math.max(prev - 2, 1));
            }}
            className="flex items-center justify-center p-2 cursor-pointer bg-smoke hover:bg-slate-200"
          >
            <FaAngleDoubleLeft className="text-sm text-gray-6" />
          </div>

          <div
            onClick={() => {
              if (currentPage === 1) return;
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }}
            className="flex items-center justify-center p-2 cursor-pointer bg-smoke hover:bg-slate-200"
          >
            <FaAngleLeft className="text-sm text-gray-6" />
          </div>

          <div className="flex items-center justify-center p-2 w-9 h-9 bg-primary">
            <p className="text-sm font-bold text-white">{currentPage}</p>
          </div>

          <div
            onClick={() => {
              if (currentPage === Math.ceil(filteredLogs.length / itemsPerPage))
                return;

              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil(filteredLogs.length / itemsPerPage)
                )
              );
            }}
            className="flex items-center justify-center p-2 cursor-pointer bg-smoke hover:bg-slate-200"
          >
            <FaAngleRight className="text-sm text-gray-6" />
          </div>

          <div
            onClick={() => {
              if (
                currentPage >=
                Math.ceil(filteredLogs.length / itemsPerPage) - 1
              )
                return;
              setCurrentPage((prev) =>
                Math.min(
                  prev + 2,
                  Math.ceil(filteredLogs.length / itemsPerPage)
                )
              );
            }}
            className="flex items-center justify-center p-2 cursor-pointer bg-smoke hover:bg-slate-200"
          >
            <FaAngleDoubleRight className="text-sm text-gray-6" />
          </div>
        </div>

        <ItemsPerPageSelect value={itemsPerPage} onChange={setItensPerPage} />
      </div>
    </div>
  );
}
