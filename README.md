# Ethscriptions Depositooor (Proof of Concept)

## Overview
The EthscriptionsDepositooor contract is a proof-of-concept Solidity contract designed to manage a collection of Ethscriptions using a Merkle tree. This contract allows the deployer to specify a collection of Ethscriptions identified by their Ethscription IDs, which are then stored in a Merkle tree. The main feature of this contract is its ability to validate specific Ethscription deposits through a unique fallback function.

## Features
- **Merkle Tree Validation**: Ethscriptions are validated against a specified Merkle root, ensuring secure and verifiable transactions.
- **Fallback Function for Deposits**: Utilizes a fallback function to handle Ethscription deposits, taking the first `bytes32` as the Ethscription ID and the rest as the Merkle proof for validation.
- **Owner Privileges**: The contract deployer, or owner, can update the Merkle root to manage the collection of Ethscriptions.
- **Withdraw Functionality**: Allows Ethscriptions to be withdrawn from escrow, facilitating the management of actively stored Ethscriptions.
- **Pause and Resume Contract**: The contract includes functionality to be paused and resumed, providing additional control and security.

## How It Works
1. **Setting the Merkle Root**: The owner sets the initial Merkle root in the constructor and can update it later as needed.
2. **Receiving Deposits**: When the contract receives an Ethscription, the fallback function is triggered. It takes the first 32 bytes of the transaction data as the Ethscription ID and the rest as the Merkle proof.
3. **Validating Deposits**: The `_verifyDeposit` function validates the Ethscription against the Merkle tree using the provided proof. If the validation is successful, the Ethscription is considered deposited.
4. **Withdrawal of Ethscriptions**: Ethscriptions can be withdrawn from escrow through the `withdraw` function, which calls the inherited `withdrawEthscription` from `EthscriptionsEscrower`.

## Examples
##### Creating the Merkle Tree
Learn more about Merkle trees with OpenZeppelin's MerkleTree library:
https://github.com/OpenZeppelin/merkle-tree

## Deployment and Usage
1. **Deployment**: Deploy the contract with the initial owner address and the Merkle root of your Ethscription collection. [bytes32]
2. **Manage Ethscriptions**: Update the Merkle root as needed to manage the collection of Ethscriptions.
3. **Receive Deposits**: Users can send Ethscriptions to the contract with the Ethscription ID and Merkle proof encoded in the transaction calldata.
4. **Withdraw Ethscriptions**: Withdraw Ethscriptions using the `withdraw` function, specifying the hash ID of the Ethscription.

## Security Considerations
- **This contract has NOT been audited and should NOT be used in production until proper security audits have been completed.**
- The contract uses Solidity's latest secure coding practices and OpenZeppelin's secure libraries.
- The owner's ability to set the Merkle root is a powerful feature that should be used carefully.
- The contract can be paused in case of an emergency, adding an extra layer of security.

## Technical Details
- **Solidity Version**: 0.8.20
- **OpenZeppelin Libraries**: Utilizes OpenZeppelin's `MerkleProof`, `Pausable`, and `Ownable` for enhanced security and functionality.
- **Inheritance**: Inherits from `EthscriptionsEscrower`, `Ownable`, and `Pausable` contracts.

#Steal this code