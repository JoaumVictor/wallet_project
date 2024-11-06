/* eslint-disable no-case-declarations */
import { AssetData } from "@/types/assets";
import getUserAssetsMock from "@/utils/mock";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface PortfolioContextProps {
  assets: AssetData[];
  portfolio: IPortfolio;
  handleAddAsset: (data: AssetData) => void;
  handleDeleteAsset: (assetName: string) => void;
  handleUpdateAsset: (
    assetName: string,
    quantity: number,
    value: number
  ) => void;
  handleRemoveAsset: (assetName: string, quantity: number) => void;
}

interface IPortfolio {
  grossBalance: number;
  totalAssets: number;
  monthlyMovements: number;
}

const PortfolioContext = createContext<PortfolioContextProps | undefined>(
  undefined
);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [assets, setAssets] = useState<AssetData[]>([]);
  const [portfolio, setPortfolio] = useState<IPortfolio>({} as IPortfolio);

  const handleDeleteAsset = (assetName: string) => {
    const data = assets.filter((each) => each.name !== assetName);
    updatePortfolio(data);
  };

  const handleUpdateAsset = (name: string, quantity: number, value: number) => {
    const findAsset = assets.find((each) => each.name === name);
    if (!findAsset) {
      // essa lógica era pra estar no back, aqui moralmente vou lidar só retornando porquê é um mock!
      return;
    }
    findAsset.quantity = findAsset?.quantity + quantity;
    findAsset.value = value;
    const assetsFiltered = assets.filter((each) => each.name !== name);
    updatePortfolio([...assetsFiltered, findAsset]);
  };

  const handleRemoveAsset = (name: string, quantity: number) => {
    const findAsset = assets.find((each) => each.name === name);
    if (!findAsset) {
      // essa lógica era pra estar no back, aqui moralmente vou lidar só retornando porquê é um mock!
      return;
    }
    if (quantity >= findAsset.quantity) {
      handleDeleteAsset(name);
      return;
    }
    findAsset.quantity = findAsset?.quantity - quantity;
    const assetsFiltered = assets.filter((each) => each.name !== name);
    updatePortfolio([...assetsFiltered, findAsset]);
  };

  const handleAddAsset = (newAsset: AssetData) => {
    setAssets((prevAssets) => {
      const assetIndex = prevAssets.findIndex(
        (asset) => asset.code === newAsset.code && asset.type === newAsset.type
      );

      if (assetIndex !== -1) {
        const updatedAssets = [...prevAssets];
        const existingAsset = updatedAssets[assetIndex];
        const totalQuantity = existingAsset.quantity + newAsset.quantity;
        updatedAssets[assetIndex] = {
          ...existingAsset,
          quantity: totalQuantity,
          value:
            (existingAsset.value * existingAsset.quantity +
              newAsset.value * newAsset.quantity) /
            totalQuantity,
        };
        return updatedAssets;
      }
      return [
        ...prevAssets,
        {
          code: newAsset.code,
          name: newAsset.name,
          type: newAsset.type,
          value: newAsset.value,
          quantity: newAsset.quantity,
        },
      ];
    });
    setPortfolio((prevPortfolio) => ({
      ...prevPortfolio,
      grossBalance:
        prevPortfolio.grossBalance + newAsset.value * newAsset.quantity,
      totalAssets: prevPortfolio.totalAssets + newAsset.quantity,
    }));
  };

  const getPortfolio = () => {
    const data = {
      assets: getUserAssetsMock,
      grossBalance: getUserAssetsMock.reduce((acc, each) => {
        return each.value * each.quantity + acc;
      }, 0),
      totalAssets: getUserAssetsMock.reduce((acc, each) => {
        return each.quantity + acc;
      }, 0),
      monthlyMovements: 0,
    };
    setAssets(data.assets);
    setPortfolio(data);
  };

  const updatePortfolio = (data: AssetData[]) => {
    const newPortfolio = {
      grossBalance: data.reduce((acc, each) => {
        return each.value * each.quantity + acc;
      }, 0),
      totalAssets: data.reduce((acc, each) => {
        return each.quantity + acc;
      }, 0),
      monthlyMovements: 0,
    };
    setAssets(data);
    setPortfolio(newPortfolio);
  };

  useEffect(() => {
    getPortfolio();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        assets,
        portfolio,
        handleAddAsset,
        handleDeleteAsset,
        handleUpdateAsset,
        handleRemoveAsset,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio deve ser usado em um PortfolioProvider");
  }
  return context;
};
