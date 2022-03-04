const HDWalletProvider = require('truffle-hdwallet-provider');
truffle-hdwallet-provider

 
//https://ropsten.infura.io/v3/310e49fb223d4562b9ccc3c8de160215
const secrets = JSON.parse(
fs.readFileSync('.secrets').toString().trim()
)
module.exports = {
  networks: {
    ropsten: {
      provider: () => {
        new HDWalletProvider(
          secrets.seed,
          //seed
          `https://ropsten.infura.io/v3/${secrets.projectId}`
        )
        network_id: 3

      }
    }
  }}