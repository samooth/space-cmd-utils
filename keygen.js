#!/usr/bin/env node
const HyperDHT = require('spacedht')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const libKeys = require('space-cmd-lib-keys')

function storeKeyPair (k) {
  return JSON.stringify({
    secretKey: k.secretKey.toString('hex'),
    publicKey: k.publicKey.toString('hex')
  })
}

const helpMsg = 'Usage:\nspace-cmd-util-keygen --gen_seed | --gen_keypair filename.json'

if (argv.gen_seed) {
  console.log('Seed:', libKeys.randomBytes(32).toString('hex'))
  process.exit(-1)
}

if (argv.gen_keypair) {
  const kp = HyperDHT.keyPair()
  const file = argv.gen_keypair

  if (typeof file !== 'string' || file.length < 2) {
    console.error('Please provide a valid filename')
    console.log(helpMsg)
    process.exit(-1)
  }

  fs.writeFileSync(file, storeKeyPair(kp))
  console.log('Public Key:', kp.publicKey.toString('hex'))
  process.exit(-1)
}

if (argv.help) {
  console.log(helpMsg)
  process.exit(-1)
}
