import { contractAddresses } from "../constants/contractAddresses";
import { useUserContext } from "../context/userContext";
import { ImCheckmark } from "react-icons/im";
import { useEffect, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import networkMapping from "../constants/networkMapping.json";
import LiquidatooorABI from "../constants/LiquidatooorV3.json";
import { Rings } from "react-loading-icons";
import { poolAbi } from "../constants/aave/v3/poolAbi";
import { ethers } from "ethers";
import useIsMounted from "../hooks/useIsMounted";
import { oracleABI } from "../constants/aave/v3/oracleABI";
import { protocolDataProvider } from "../constants/aave/v3/protocolDataProvider";

interface NetworkMapping {
  "43113": { LiquidatooorV3: string[] };
  "80001": { LiquidatooorV3: string[] };
}

const LiquidationCard = () => {
  const {
    liquidatable,
    suppliedAssets,
    borrowedAssets,
    chainId,
    account,
    maxLiquidationAmount,
  } = useUserContext();
  const mounted = useIsMounted();
  const [liquidateAsset, setLiquidateAsset] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [collateralAsset, setCollateralAsset] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [liquidatooorAddress, setLiquidatooorAddress] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [liquidationBonus, setLiquidationBonus] = useState(0);

  const { config: requestFlashLoanConfig } = usePrepareContractWrite({
    address: liquidatooorAddress,
    abi: LiquidatooorABI,
    functionName: "requestFlashLoan",
    args: [liquidateAsset, , maxLiquidationAmount, collateralAsset, account],
  });

  const {
    isLoading,
    isSuccess,
    write: requestFlashLoan,
  } = useContractWrite(requestFlashLoanConfig);

  const { data: flashLoanFee } = useContractRead({
    address: contractAddresses[chainId || 43114].Pool,
    abi: poolAbi,
    functionName: "FLASHLOAN_PREMIUM_TOTAL",
  });

  const { data: prices } = useContractRead({
    address: contractAddresses[chainId || 43114].Oracle,
    abi: oracleABI,
    functionName: "getAssetsPrices",
    args: [[collateralAsset!, liquidateAsset!]],
  });

  const { data: configData } = useContractRead({
    address: contractAddresses[chainId || 43114].ProtocolDataProvider,
    abi: protocolDataProvider,
    functionName: "getReserveConfigurationData",
    args: [collateralAsset!],
  });

  useEffect(() => {
    setLiquidationBonus(Number(configData?.liquidationBonus) / 10000);
  }, [configData]);

  useEffect(() => {
    if (chainId && chainId in networkMapping) {
      const len =
        networkMapping[chainId.toString() as keyof NetworkMapping]
          .LiquidatooorV3.length;

      setLiquidatooorAddress(
        networkMapping[chainId.toString() as keyof NetworkMapping]
          .LiquidatooorV3[len - 1] as `0x${string}`
      );
    }
  }, [chainId]);

  // Prevent hydration errors
  if (!mounted) return null;

  return (
    <div className="flex items-center justify-around transition duration-300 ease-in-out bg-base-300">
      <div className="flex items-center justify-center space-x-10">
        <ul className="h-96 steps steps-vertical">
          <li className="step step-primary">
            <span
              className={`${
                !liquidateAsset && "invisible"
              } flex items-center gap-2`}
            >
              Asset chosen
              <ImCheckmark />
            </span>
          </li>
          <li className={`${collateralAsset && "step-primary"} step`}>
            <span
              className={`${
                !collateralAsset && "invisible"
              } flex items-center gap-2`}
            >
              Collateral chosen <ImCheckmark />
            </span>
          </li>
          <li className={`${(isLoading || isSuccess) && "step-primary"} step`}>
            <span
              className={`${
                (!isLoading || !isSuccess) && "invisible"
              } flex items-center gap-2`}
            >
              Liquidating... <ImCheckmark />
            </span>
          </li>
        </ul>

        <div className="flex flex-col items-center justify-between h-72">
          <select
            onChange={(e) => setLiquidateAsset(e.target.value as `0x${string}`)}
            className="w-[273px] rounded-none select select-secondary focus:outline-none"
          >
            <option disabled selected>
              Select the asset to liquidate
            </option>
            {borrowedAssets?.map((asset) => (
              <option key={asset} value={asset}>
                {contractAddresses[chainId || 43114][asset]}
              </option>
            ))}
          </select>

          <select
            onChange={(e) =>
              setCollateralAsset(e.target.value as `0x${string}`)
            }
            disabled={!liquidateAsset}
            className="w-[273px] rounded-none select select-secondary focus:outline-none"
          >
            <option disabled selected>
              Select the collateral to receive
            </option>
            {suppliedAssets?.map((asset) => (
              <option key={asset} value={asset}>
                {contractAddresses[chainId || 43114][asset]}
              </option>
            ))}
          </select>

          <button
            disabled={!liquidatable}
            onClick={() => requestFlashLoan?.()}
            className={`${
              !liquidatable && "cursor-not-allowed"
            } relative inline-block px-4 py-2 w-[273px] font-medium group h-12`}
          >
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-in-out transform translate-x-2 translate-y-2 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span
              className={`${
                liquidatable
                  ? "bg-primary group-hover:bg-primary-focus"
                  : "bg-gray-500 group-hover:bg-gray-600"
              } absolute inset-0 w-full h-full `}
            ></span>
            <span className="relative font-bold text-primary-content">
              {isLoading ? (
                <div className="flex justify-center">
                  <Rings className="-mt-2" />
                </div>
              ) : (
                "AHHHHHH I'M LIQUIDATING!!!!"
              )}
            </span>
          </button>
        </div>
      </div>

      <div
        className={`${
          !collateralAsset && "invisible"
        } self-start mt-8 space-y-2 max-w-md w-full`}
      >
        <h4 className="text-2xl font-bold leading-loose">
          Transaction Summary
        </h4>

        <div className="flex justify-between space-x-8">
          <p className="font-extralight">Max. liquidatable amt:</p>{" "}
          {liquidatable ? (
            <p>
              {liquidateAsset && maxLiquidationAmount[liquidateAsset]}{" "}
              {chainId &&
                liquidateAsset &&
                contractAddresses[chainId][liquidateAsset]}
            </p>
          ) : (
            "NA"
          )}
        </div>

        {chainId && liquidateAsset && (
          <div className="flex justify-between">
            <p className="font-extralight">Flash loan fee:</p>
            {liquidatable ? (
              <p>
                {maxLiquidationAmount[liquidateAsset] *
                  (Number(flashLoanFee?.toString()) / 10000)}{" "}
                {contractAddresses[chainId][liquidateAsset]}
              </p>
            ) : (
              "NA"
            )}
          </div>
        )}

        {chainId && liquidateAsset && collateralAsset && (
          <div className="flex justify-between">
            <p className="font-extralight">
              Est. collateral ({contractAddresses[chainId][collateralAsset]}) to
              liquidate:{" "}
            </p>
            {liquidatable ? (
              <p>
                {prices &&
                  (Number(ethers.utils.formatUnits(prices[1], 8)) *
                    maxLiquidationAmount[liquidateAsset] *
                    liquidationBonus) /
                    Number(ethers.utils.formatUnits(prices[0], 8))}
              </p>
            ) : (
              "NA"
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default LiquidationCard;
