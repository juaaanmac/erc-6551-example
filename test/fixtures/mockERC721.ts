import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { MockERC721 } from "typechain";

const deployedMockERC721 = async () : Promise<MockERC721> => {
    const mockERC721Factory = await ethers.getContractFactory('MockERC721')
    const mockERC721 = await mockERC721Factory.deploy()
    return await mockERC721.deployed() as MockERC721
}

export default deployedMockERC721 