import hre from 'hardhat';

const contractName = 'EthscriptionsDepositooor';

async function deploy() {
  const [signer] = await hre.ethers.getSigners();

  console.log('=====================================================================');
  console.log(`Deploying ${contractName} contract with the account:`, signer.address);

  const args = [
    signer.address,
    '0xd9b1eec3d1d6b2cf0c1e22ede4c6389e4bb41a664fa36058eb376a695f8ed4ae' // Merkle root placeholder
  ];

  const ContractFactory = await hre.ethers.getContractFactory(contractName);
  const contract = await ContractFactory.deploy(args[0], args[1]);

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log('\n=====================================================================');
  console.log(`${contractName} deployed to:`, contractAddress);
  console.log('=====================================================================');
  console.log('\nVerify with:');
  console.log(`npx hardhat verify --network goerli ${contractAddress}`, args.map((arg) => `"${arg}"`).join(' '));
  console.log('=====================================================================');
  console.log(`\n`);

  return contractAddress;
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});