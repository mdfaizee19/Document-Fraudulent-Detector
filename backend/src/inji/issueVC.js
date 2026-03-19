const { SignJWT, importJWK } = require("jose");
const { v4: uuidv4 } = require("uuid");
const issuerKey = require("../keys/issuer.json");

async function issueInspectionVC(structured) {
  const privateKey = await importJWK(issuerKey, "EdDSA");

  const vc = {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    id: `urn:uuid:${uuidv4()}`,
    type: ["VerifiableCredential", "ExportInspectionCredential"],
    issuer: "did:web:demeter.io",
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      inspectionId: structured.inspectionId,
      exporter: structured.exporter,
      shipment: structured.shipment,
      trustScore: structured.trustScore,
      trustworthiness: structured.trustworthiness,
      status: "APPROVED"
    }
  };

  const jwt = await new SignJWT({ vc })
    .setProtectedHeader({ alg: "EdDSA", kid: issuerKey.kid })
    .setIssuedAt()
    .setIssuer("did:web:demeter.io")
    .setAudience("inji-wallet")
    .setJti(vc.id)
    .sign(privateKey);

  return { vc, jwt };
}

module.exports = { issueInspectionVC };
