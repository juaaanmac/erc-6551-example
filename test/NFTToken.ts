import { expect } from "chai";
import { Contract, Signer } from "ethers";
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

    describe("Deployment", function () {
        it("Should set correct NFTToken symbol", async function () {
            expect(await nftTokenContract.symbol()).to.equal("MAC");
        });

        it("Should set correct NFTToken name", async function () {
            expect(await nftTokenContract.name()).to.equal("JUAN MACRI");
        });
    });

    describe("Mint", function () {
        const URI = "http://uri.com/nfttoken.json";

        it("Should update NFTToken balance for user", async function () {
            const user = await accounts[0].getAddress();

            await (await nftTokenContract.safeMint(user, URI)).wait();

            expect(await nftTokenContract.balanceOf(user)).to.equal(1);
        });

        it("Should emit NFTMinted event", async function () {
            const user = await accounts[0].getAddress();

            const tx = await (
                await nftTokenContract.safeMint(user, URI)
            ).wait();
            const eventArgs = tx.events?.find(
                (event) => event.event === "NFTMinted"
            )!!.args!!;

            expect(eventArgs["to"]).to.equal(user);
            expect(eventArgs["tokenId"]).to.equal(0);
        });
    });
});
