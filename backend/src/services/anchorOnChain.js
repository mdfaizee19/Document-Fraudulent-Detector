// backend/src/services/anchorOnChain.js
const { ethers } = require('ethers');
require('dotenv').config();

const SEPOLIA_RPC = process.env.SEPOLIA_RPC;
const ANCHOR_CONTRACT_ADDRESS = process.env.ANCHOR_CONTRACT_ADDRESS;
const ANCHORER_PRIVATE_KEY = process.env.ANCHORER_PRIVATE_KEY;

if (!SEPOLIA_RPC) console.warn('SEPOLIA_RPC not set in .env');
if (!ANCHOR_CONTRACT_ADDRESS) console.warn('ANCHOR_CONTRACT_ADDRESS not set in .env');

const AnchorABI = [
  'event Anchored(bytes32 indexed anchorHash, address indexed by, uint256 at)',
  'function anchor(bytes32 _hash) public returns (bool)'
];

async function anchorVC(signedVc) {
  // signedVc should contain .hash (0x...)
  const hash = (signedVc && signedVc.hash) ? signedVc.hash : ethers.utils.keccak256(ethers.utils.toUtf8Bytes(JSON.stringify(signedVc)));

  if (!SEPOLIA_RPC || !ANCHOR_CONTRACT_ADDRESS || !ANCHORER_PRIVATE_KEY) {
    console.warn('anchorVC: missing env; returning simulated anchor result');
    return {
      hash,
      txHash: null,
      blockNumber: null,
      gasUsed: null
    };
  }

  const provider = new ethers.providers.JsonRpcProvider(SEPOLIA_RPC);
  const wallet = new ethers.Wallet(ANCHORER_PRIVATE_KEY, provider);
  const contract = new ethers.Contract(ANCHOR_CONTRACT_ADDRESS, AnchorABI, wallet);

  // anchor expects bytes32; ensure it's bytes32
  let bytes32Hash = hash;
  if (hash.length !== 66) {
    // convert to keccak256 so it's bytes32
    bytes32Hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(String(hash)));
  }

  const tx = await contract.anchor(bytes32Hash);
  const receipt = await tx.wait();

  return {
    hash: bytes32Hash,
    txHash: tx.hash,
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed.toString()
  };
}

module.exports = { anchorVC };
