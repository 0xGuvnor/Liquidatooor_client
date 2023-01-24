interface chainMappings {
  [chainId: string]: contractMappings;
}

interface contractMappings {
  name: string;
  PoolAddressesProvider: `0x${string}`;
  Pool: `0x${string}`;
  UiPoolProvider: `0x${string}`;
  ProtocolDataProvider: `0x${string}`;
  Oracle: `0x${string}`;
  [contractAddress: string]: string;
}

export const contractAddresses: chainMappings = {
  43114: {
    name: "avax",
    PoolAddressesProvider: "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",
    Pool: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
    UiPoolProvider: "0x1dDAF95C8f58d1283E9aE5e3C964b575D7cF7aE3",
    ProtocolDataProvider: "0x69FA688f1Dc47d4B5d8029D5a35FB7a548310654",
    Oracle: "0xEBd36016B3eD09D4693Ed4251c67Bd858c3c7C9C",
    "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E": "USDC",
  },
  43113: {
    name: "avaxFuji",
    PoolAddressesProvider: "0x1775ECC8362dB6CaB0c7A9C0957cF656A5276c29",
    Pool: "0xb47673b7a73D78743AFF1487AF69dBB5763F00cA",
    UiPoolProvider: "0x88138CA1e9E485A1E688b030F85Bb79d63f156BA",
    ProtocolDataProvider: "0xa41E284482F9923E265832bE59627d91432da76C",
    Oracle: "0x9F616c65b5298E24e155E4486e114516BC635b63",
    "0x28A8E6e41F84e62284970E4bc0867cEe2AAd0DA4": "WETH",
    "0x73b4C0C45bfB90FC44D9013FA213eF2C2d908D0A": "LINK",
    "0xFc7215C9498Fc12b22Bc0ed335871Db4315f03d3": "DAI",
  },
  80001: {
    name: "polygonMumbai",
    PoolAddressesProvider: "0x5343b5bA672Ae99d627A1C87866b8E53F47Db2E6",
    Pool: "0x6C9fB0D5bD9429eb9Cd96B85B81d872281771E6B",
    UiPoolProvider: "0x74E3445f239f9915D57715Efb810f67b2a7E5758",
    ProtocolDataProvider: "0xacB5aDd3029C5004f726e8411033E6202Bc3dd01",
    Oracle: "0xf0E6744a59177014738e1eF920dc676fb3b8CB62",
  },
  137: {
    name: "polygon",
    PoolAddressesProvider: "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",
    Pool: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
    UiPoolProvider: "0x7006e5a16E449123a3F26920746d03337ff37340",
    ProtocolDataProvider: "0x69FA688f1Dc47d4B5d8029D5a35FB7a548310654",
    Oracle: "0xb023e699F5a33916Ea823A16485e259257cA8Bd1",
  },
};
