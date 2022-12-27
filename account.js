const Web3 = require('web3');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const web3 = new Web3("https://test-rpc.trustcoin.om");

async function getLastedBlockNumber() {
    try {
        return await web3.eth.getBlockNumber()
    } catch (error) {
        return false
    }
}

async function getBlock(blockNumber) {
    try {
        return await web3.eth.getBlock(blockNumber)
    } catch (error) {
        return 0
    }
}


async function init() {
    let lastBlock = await getLastedBlockNumber()
    let currentBlockNumber = lastBlock
    let txCount = 0
    while (txCount < 10) {
        currentBlockNumber = currentBlockNumber - 1
        let blockTx = await getBlock(currentBlockNumber)
        txCount = txCount + blockTx.transactions.length
        console.log(currentBlockNumber, txCount)
        await delay(10)
    }
}
init()
