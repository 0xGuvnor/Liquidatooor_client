interface chainMappings {
  [chainId: string]: contractMappings;
}

interface contractMappings {
  name: string;
  PoolAddressesProvider: `0x${string}`;
  Pool: `0x${string}`;
  UiPoolProvider: `0x${string}`;
  [contractAddress: string]: string;
}

export const contractAddresses: chainMappings = {
  43114: {
    name: "avax",
    PoolAddressesProvider: "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",
    Pool: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
    UiPoolProvider: "0x1dDAF95C8f58d1283E9aE5e3C964b575D7cF7aE3",
  },
  43113: {
    name: "avaxFuji",
    PoolAddressesProvider: "0x1775ECC8362dB6CaB0c7A9C0957cF656A5276c29",
    Pool: "0xb47673b7a73D78743AFF1487AF69dBB5763F00cA",
    UiPoolProvider: "0x88138CA1e9E485A1E688b030F85Bb79d63f156BA",
    "0x28A8E6e41F84e62284970E4bc0867cEe2AAd0DA4": "WETH",
    "0x73b4C0C45bfB90FC44D9013FA213eF2C2d908D0A": "LINK",
    "0xFc7215C9498Fc12b22Bc0ed335871Db4315f03d3": "DAI",
  },
};
