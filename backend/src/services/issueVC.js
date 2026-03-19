// backend/src/services/issueVC.js
const { ethers } = require('ethers');
require('dotenv').config();

const ANCHORER_PRIVATE_KEY = process.env.ANCHORER_PRIVATE_KEY || '';
const ISSUER_DID = process.env.ISSUER_DID || 'did:example:issuer';

if (!ANCHORER_PRIVATE_KEY) {
  console.warn('WARNING: ANCHORER_PRIVATE_KEY not set. issueVC will run but cannot sign.');
}

async function issueVC(structured) {
  // Build minimal VC
  const vc = {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential', 'ExportInspectionCredential'],
    issuer: { id: ISSUER_DID },
    issuanceDate: new Date().toISOString(),
    credentialSubject: structured
  };

  // Compute canonical JSON and its keccak256 hash
  const jsonString = JSON.stringify(vc);
  const hashBytes = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(jsonString));
  const hash = hashBytes; // 0x...

  // Sign hash with anchorer private key (if available)
  let signature = null;
  let signerAddress = null;
  try {
    if (ANCHORER_PRIVATE_KEY && ANCHORER_PRIVATE_KEY.length > 10) {
      const wallet = new ethers.Wallet(ANCHORER_PRIVATE_KEY);
      signerAddress = await wallet.getAddress();
      signature = await wallet.signMessage(ethers.utils.arrayify(hash));
    } else {
      signature = null;
    }
  } catch (err) {
    console.error('issueVC signing error', err);
    signature = null;
  }

  // return the signed vc object (signed by issuer's private key) with metadata
  return {
    vc,
    hash,
    signature,
    signerAddress
  };
}

module.exports = { issueVC };
