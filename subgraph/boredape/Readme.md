# How to build.

At first, It will be created JayLee/Jaycryptocoven subgraph in [here](https://thegraph.com/hosted-service/)

```shell
$ graph init --from-contract 0x5180db8F5c931aaE63c74266b211F580155ecac8 --protocol ethereum --network mainnet --contract-name Token --index-events
√ Product for which to initialize · hosted-service
√ Subgraph name · markjames12210/boredape
√ Directory to create the subgraph in · boredape
√ Ethereum network · mainnet
√ Contract address · 0x5180db8F5c931aaE63c74266b211F580155ecac8
√ Fetching ABI from Etherscan
√ Contract Name · Token

$ graph codegen
$ graph build
$ graph auth
$ yarn deploy
```