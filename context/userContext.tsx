import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useNetwork } from "wagmi";

interface Props {
  roundNum: (num: string) => number;
  chainId: number | undefined;
  account: `0x${string}` | undefined;
  setAccount: Dispatch<SetStateAction<`0x${string}` | undefined>>;
  liquidatable: boolean;
  setLiquidatable: Dispatch<SetStateAction<boolean>>;
  suppliedAssets: `0x${string}`[] | undefined;
  setSuppliedAssets: Dispatch<SetStateAction<`0x${string}`[] | undefined>>;
  borrowedAssets: `0x${string}`[] | undefined;
  setBorrowedAssets: Dispatch<SetStateAction<`0x${string}`[] | undefined>>;
  healthFactor: number | undefined;
  setHealthFactor: Dispatch<SetStateAction<number | undefined>>;
  maxLiquidationAmount: { [tokenAddress: `0x${string}`]: number };
  setMaxLiquidationAmount: Dispatch<SetStateAction<{}>>;
}

const UserContext = createContext<Props>({
  roundNum: () => 0,
  chainId: 0,
  account: undefined,
  setAccount: () => {},
  liquidatable: false,
  setLiquidatable: () => {},
  suppliedAssets: undefined,
  setSuppliedAssets: () => {},
  borrowedAssets: undefined,
  setBorrowedAssets: () => {},
  healthFactor: undefined,
  setHealthFactor: () => {},
  maxLiquidationAmount: {},
  setMaxLiquidationAmount: () => {},
});

const useUserContext = () => useContext(UserContext);

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const roundNum = (num: string) => {
    return Math.round(Number(num) * 1000) / 1000;
  };

  const { chain } = useNetwork();
  const chainId = chain?.id;

  const [account, setAccount] = useState<`0x${string}` | undefined>(undefined);
  const [liquidatable, setLiquidatable] = useState(false);
  const [suppliedAssets, setSuppliedAssets] = useState<
    `0x${string}`[] | undefined
  >(undefined);
  const [borrowedAssets, setBorrowedAssets] = useState<
    `0x${string}`[] | undefined
  >(undefined);
  const [healthFactor, setHealthFactor] = useState<number | undefined>(
    undefined
  );
  const [maxLiquidationAmount, setMaxLiquidationAmount] = useState({});

  return (
    <UserContext.Provider
      value={{
        roundNum,
        chainId,
        account,
        setAccount,
        liquidatable,
        setLiquidatable,
        suppliedAssets,
        setSuppliedAssets,
        borrowedAssets,
        setBorrowedAssets,
        healthFactor,
        setHealthFactor,
        maxLiquidationAmount,
        setMaxLiquidationAmount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { useUserContext, UserProvider };
