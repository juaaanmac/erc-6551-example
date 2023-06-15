import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { MockERC20 } from "typechain";

const deployedMockERC20 = async () : Promise<MockERC20> => {
    const mockERC20Factory = await ethers.getContractFactory('MockERC20')
    const mockERC20 = await mockERC20Factory.deploy(BigNumber.from("5000000000000000000"))
    return await mockERC20.deployed() as MockERC20
}

export default deployedMockERC20 