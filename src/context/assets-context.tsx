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

  // const handleAddAsset = async (asset: AssetData) => {
  //   // await addAsset()
  // };

  // const handleUpdateAsset = async (asset: AssetData) => {
  //   // await updateAsset()
  // };

  // const handleDeleteAsset = async (code: string) => {
  //   // await deleteAsset()
  // };

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

  // const refreshPortfolioData = () => {
  //   // await getPortfolio()
  // };

  useEffect(() => {
    getPortfolio();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        assets,
        portfolio,
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
