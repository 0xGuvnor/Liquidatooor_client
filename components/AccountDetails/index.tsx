import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { poolAbi } from "../../constants/aave/v3/poolAbi";
import { uiPoolDataProviderAbi } from "../../constants/aave/v3/uiPoolDataProviderAbi";
import { contractAddresses } from "../../constants/contractAddresses";
import { useUserContext } from "../../context/userContext";
import AssetStats from "./AssetStats";
import UserStats from "./UserStats";

const AccountDetails = () => {
  const [hasTyped, setHasTyped] = useState(false);
  const {
    roundNum,
    chainId,
    account,
    setAccount,
    suppliedAssets,
    setSuppliedAssets,
    borrowedAssets,
    setBorrowedAssets,
    setHealthFactor,
  } = useUserContext();

  // Get health factor
  const { data: userAccountData, isError } = useContractRead({
    // Uses Avax mainnet chain id as default
    address: contractAddresses[chainId || 43114].Pool,
    abi: poolAbi,
    functionName: "getUserAccountData",
    args: [account as `0x${string}`],
  });

  // Get supplied & borrowed assets

  const { data: userReserveData } = useContractRead({
    // Uses Avax mainnet chain id as default
    address: contractAddresses[chainId || 43114].UiPoolProvider,
    abi: uiPoolDataProviderAbi,
    functionName: "getUserReservesData",
    args: [
      contractAddresses[chainId || 43114].PoolAddressesProvider,
      account as `0x${string}`,
    ],
  });

  useEffect(() => {
    // Transform supplied & borrowed assets into arrays of token addresses
    setSuppliedAssets(
      userReserveData?.[0]
        .filter((asset) => asset.usageAsCollateralEnabledOnUser)
        .map((asset) => asset.underlyingAsset)
    );

    setBorrowedAssets(
      userReserveData?.[0]
        .filter(
          (asset) =>
            asset.principalStableDebt.toString() !== "0" ||
            asset.scaledVariableDebt.toString() !== "0"
        )
        .map((asset) => asset.underlyingAsset)
    );

    if (userAccountData)
      setHealthFactor(
        roundNum(ethers.utils.formatEther(userAccountData.healthFactor))
      );
  }, [userAccountData, userReserveData]);

  return (
    <div className="flex flex-col p-2 my-4 transition duration-300 ease-in-out bg-base-200">
      <div className="flex flex-col px-4 py-4 space-y-2">
        <div className="text-base-content">
          Enter an address to check if it's eligible to be liquidated
        </div>
        <input
          placeholder="0x..."
          type="text"
          value={account}
          onChange={(e) => {
            setAccount(e.target.value as `0x${string}`);
            setHasTyped(true);
          }}
          className="flex-1 px-4 py-2 bg-neutral text-neutral-content focus:outline-none placeholder:text-secondary-content"
        />
        {isError && hasTyped && (
          <p className="text-error">Error: Invalid address!</p>
        )}
      </div>

      {userAccountData && (
        <>
          <p className="mx-4">Account Info</p>
          <UserStats title={"Health Factor"} />

          <p className="mx-4">Supplied Assets</p>
          {suppliedAssets && (
            <AssetStats assets={suppliedAssets} isCollateral />
          )}

          <p className="mx-4">Borrowed Assets</p>
          {borrowedAssets && <AssetStats assets={borrowedAssets} />}
        </>
      )}
    </div>
  );
};
export default AccountDetails;
