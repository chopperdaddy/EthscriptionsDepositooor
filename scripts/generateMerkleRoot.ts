import { StandardMerkleTree } from '@openzeppelin/merkle-tree';
import { readFile, writeFile } from 'fs/promises';

import hashIds from '../assets/hashIds.json';

async function createTree(): Promise<void> {

  // Convert flat array to nested array of hashIds
  const hashIdArr = hashIds.map((hashId) => [hashId]);

  // Create Merkle Tree
  const tree = StandardMerkleTree.of(hashIdArr, ['bytes32']);

  // Print Merkle Root
  console.log('Merkle Root:', tree.root);

  // Write Merkle Root to file
  await writeFile('./assets/merkleRoot.txt', tree.root);
  await writeFile('./assets/merkleTree.json', JSON.stringify(tree.dump()), 'utf-8');
}

async function generateProof(leaf: string): Promise<string[]> {
  // Read Merkle Tree from file
  const rawTree = await readFile('./assets/merkleTree.json', 'utf-8');
  const parsedTree = JSON.parse(rawTree);
  const tree = StandardMerkleTree.load(parsedTree);

  // Generate proof
  let proof!: string[];
  for (const [i, v] of tree.entries()) {
    if (v[0] === leaf) {
      proof = tree.getProof(i);
    }
  }
  return proof;
}

async function verifyProof(leaf: string, proof: string[]): Promise<void> {
  // Read Merkle Tree from file
  const rawTree = await readFile('./assets/merkleTree.json', 'utf-8');
  const parsedTree = JSON.parse(rawTree);
  const tree = StandardMerkleTree.load(parsedTree);

  // Verify proof
  const verified = tree.verify([leaf], proof);
  // Print result
  console.log('Proof verified:', verified);
}

createTree().then(async () => {
  // Use these functions for testing
  // const testHashId = '0x1e7631db58a4e8f4794cc99f0ad81a9a2db2d4face40c0d199170e0ca3870e74';
  // const proof = await generateProof(testHashId);
  // await verifyProof(testHashId, proof);
}).catch((err) => {
  console.error(err);
});