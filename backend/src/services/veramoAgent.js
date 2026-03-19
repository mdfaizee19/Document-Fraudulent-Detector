const { createAgent } = require('@veramo/core');
const { DIDManager } = require('@veramo/did-manager');
const { KeyManager } = require('@veramo/key-manager');
const { MemoryPrivateKeyStore } = require('@veramo/key-manager');
const { MemoryKeyStore } = require('@veramo/data-store');
const { DIDKey } = require('@veramo/did-provider-key');
const { Resolver } = require('@veramo/did-resolver');
const { CredentialPlugin } = require('@veramo/credential-w3c');

let agent = null;

async function buildAgent() {
  if (agent) return agent;

  agent = createAgent({
    plugins: [
      new KeyManager({
        store: new MemoryPrivateKeyStore(),
        kms: {
          local: new DIDKey().kms,
        }
      }),

      new DIDManager({
        store: new MemoryKeyStore(),
        defaultProvider: 'did:key',
        providers: {
          'did:key': new DIDKey(),
        },
      }),

      new CredentialPlugin(),
      new Resolver({})
    ],
  });

  return agent;
}

module.exports = { buildAgent };
