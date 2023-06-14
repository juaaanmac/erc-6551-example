import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-solhint";
import "@typechain/hardhat";
import "dotenv/config";
import "hardhat-deploy";
import "solidity-coverage";

const mnemonic: string | undefined = process.env.MNEMONIC;
if (!mnemonic) {
    throw new Error("Please set your MNEMONIC in a .env file");
}

const mumbaiExplorerApiKey: string | undefined =
    process.env.MUMBAI_EXPLORER_API_KEY;
if (!mumbaiExplorerApiKey) {
    throw new Error("Please set your MUMBAI_EXPLORER_API_KEY in a .env file");
}

const alchemyMumbaiApiKey: string | undefined =
    process.env.MUMBAI_ALCHEMY_API_KEY;
if (!alchemyMumbaiApiKey) {
    throw new Error("Please set your MUMBAI_ALCHEMY_API_KEY in a .env file");
}

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            live: false,
            saveDeployments: true,
            forking: {
                url:
                    "https://polygon-mumbai.g.alchemy.com/v2/" +
                    alchemyMumbaiApiKey,
            },
        },
        mumbai: {
            chainId: 80001,
            live: true,
            saveDeployments: true,
            url:
                "https://polygon-mumbai.g.alchemy.com/v2/" +
                alchemyMumbaiApiKey,
            accounts: { mnemonic: mnemonic },
        },
    },
    etherscan: {
        apiKey: {
            polygonMumbai: mumbaiExplorerApiKey,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.4",
            },
        ],
    },
    mocha: {
        timeout: 100000,
    },
    typechain: {
        outDir: "typechain",
        target: "ethers-v5",
    },
};
