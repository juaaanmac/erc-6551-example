import { expect } from "chai";
import { Signer } from "ethers";
import { deployments, ethers } from "hardhat";

import { NFTToken, NFTToken__factory } from "../typechain";

describe("NFTToken", function () {
    let accounts: Signer[];
    let nftTokenContract: NFTToken;

    beforeEach(async function () {
        accounts = await ethers.getSigners();

        const nftTokenFactory = (await ethers.getContractFactory(
            "NFTToken",
            accounts[0]
        )) as NFTToken__factory;

        nftTokenContract = await nftTokenFactory.deploy();
    });

});
