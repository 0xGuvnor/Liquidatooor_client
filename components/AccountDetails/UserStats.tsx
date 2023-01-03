import { BigNumber, ethers } from "ethers";
import { useUserContext } from "../../context/userContext";
import { MdInfoOutline } from "react-icons/md";
import { useState } from "react";

interface Props {
  title: string;
}

const UserStats = ({ title }: Props) => {
  const { liquidatable, setLiquidatable, healthFactor } = useUserContext();
  const [showTooltip, setShowTooltip] = useState(true);

  if (healthFactor && healthFactor < 1) {
    setLiquidatable(true);
  }

  return (
    <div
      className={`${
        liquidatable
          ? "bg-success text-success-content"
          : "bg-error text-error-content"
      } mx-4 rounded-none divide-neutral stats stats-vertical md:stats-horizontal mb-4`}
    >
      <div className="stat place-items-center">
        <div className="flex items-center space-x-1 stat-title">
          <p>{title}</p>
          {liquidatable ? null : (
            <div
              data-tip="Account not eligible for liquidation."
              onClick={() => setShowTooltip((prevState) => !prevState)}
              className={`${
                showTooltip && "tooltip-open"
              } tooltip tooltip-right tooltip-info cursor-pointer`}
            >
              <MdInfoOutline />
            </div>
          )}
        </div>
        <div className="stat-value">{healthFactor}</div>
      </div>
    </div>
  );
};
export default UserStats;
