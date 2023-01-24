import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { erc20ABI, useContractRead } from "wagmi";
import { protocolDataProvider } from "../../constants/aave/v3/protocolDataProvider";
import { contractAddresses } from "../../constants/contractAddresses";
import { useUserContext } from "../../context/userContext";
import {
  HiOutlineClipboardDocument,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";

interface StatsProps {
  assets: `0x${string}`[];
  isCollateral?: boolean;
}

const AssetStats = ({ assets, isCollateral }: StatsProps) => {
  return (
    <div className="mx-4 mb-4 rounded-none divide-neutral stats stats-vertical md:stats-horizontal">
      {assets.map((asset) => (
        <AssetStat asset={asset} isCollateral={isCollateral} key={asset} />
      ))}
    </div>
  );
};
export default AssetStats;

interface StatProps {
  asset: `0x${string}`;
  isCollateral?: boolean;
}

const AssetStat = ({ asset, isCollateral }: StatProps) => {
  const { roundNum, chainId, healthFactor, setMaxLiquidationAmount, account } =
    useUserContext();
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [totalDebt, setTotalDebt] = useState(0);
  const truncateAddress = (address: `0x${string}`) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  const { data: decimals } = useContractRead({
    address: asset,
    abi: erc20ABI,
    functionName: "decimals",
  });

  const { data: assetData, isLoading } = useContractRead({
    address: contractAddresses[chainId || 43114].ProtocolDataProvider,
    abi: protocolDataProvider,
    functionName: "getUserReserveData",
    args: [asset, account as `0x${string}`],
  });

  useEffect(() => {
    if (assetData) {
      setTotalDebt(
        Number(
          ethers.utils.formatUnits(assetData.currentStableDebt, decimals)
        ) +
          Number(
            ethers.utils.formatUnits(assetData.currentVariableDebt, decimals)
          )
      );
    }

    if (healthFactor && healthFactor < 1 && healthFactor > 0.95) {
      // Default liquidation close factor
      setMaxLiquidationAmount((prevState) => ({
        ...prevState,
        [asset]: totalDebt / 2,
      }));
    } else if (healthFactor && healthFactor < 0.95) {
      // Max liquidation close factor
      setMaxLiquidationAmount((prevState) => ({
        ...prevState,
        [asset]: totalDebt,
      }));
    }
  }, [asset, assetData]);

  if (isLoading) return null;

  return (
    <div className="stat place-items-center">
      <div className="stat-title">
        {/* Uses Avax mainnet chain id as default  */}
        {contractAddresses[chainId || 43114][asset]}
      </div>
      <div className="stat-value">
        {isCollateral && assetData
          ? roundNum(
              ethers.utils.formatUnits(assetData.currentATokenBalance, decimals)
            )
          : roundNum(totalDebt.toString())}
      </div>
      <div
        onClick={() => {
          navigator.clipboard.writeText(asset);
          setCopiedToClipboard(true);
        }}
        className="flex items-center space-x-1 text-blue-500 stat-desc hover:cursor-pointer"
      >
        <p>{truncateAddress(asset)}</p>{" "}
        {copiedToClipboard ? (
          <HiOutlineClipboardDocumentCheck className="text-lg" />
        ) : (
          <HiOutlineClipboardDocument className="text-lg" />
        )}
      </div>
    </div>
  );
};
