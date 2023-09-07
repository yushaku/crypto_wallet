import { ethers, upgrades } from "hardhat";
import { writeDownAddress } from "./util/helper";

async function main() {
  const MissionMint = await ethers.getContractFactory("MissionMint");
  const missionMint = await upgrades.deployProxy(MissionMint, [5, 5]);

  const proxyAddress = await missionMint.getAddress();
  const [implementAddress, adminAddress] = await Promise.all([
    await upgrades.erc1967.getImplementationAddress(proxyAddress),
    await upgrades.erc1967.getAdminAddress(proxyAddress),
  ]);

  writeDownAddress("proxyAddress", proxyAddress);
  writeDownAddress("implementAddress", implementAddress);
  writeDownAddress("adminAddress", adminAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
