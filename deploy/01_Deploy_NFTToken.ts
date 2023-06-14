import { Signer } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { NFTToken, NFTToken__factory } from "../typechain";

const contractName = "NFTToken";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    let accounts: Signer[];
    let nftTokenContract: NFTToken;

    accounts = await hre.ethers.getSigners();

    const tokenFactory = (await hre.ethers.getContractFactory(
        contractName,
        accounts[0]
    )) as NFTToken__factory;

    nftTokenContract = await tokenFactory.deploy();

    await nftTokenContract.deployed();

    console.log(
        `Contract ${contractName} deployed at ${nftTokenContract.address}`
    );
};
export default func;
func.id = "NFTToken";
func.tags = ["NFTToken", "local"];
