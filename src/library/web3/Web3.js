import Web3Libs from 'web3'

class Web3 {
  constructor(address, abi, rpc) {
    this.web3 = new Web3Libs(new Web3Libs.providers.HttpProvider(rpc))
    if (address) {
      this.address = address
      this.abi = abi
      this.contract = new this.web3.eth.Contract(this.abi, this.address)
    }
  }

  async getLastedBlockNumber() {
    try {
      return await this.web3.eth.getBlockNumber()
    } catch (error) {
      return false
    }
  }

  async getBlock(blockNumber) {
    try {
      return await this.web3.eth.getBlock(blockNumber)
    } catch (error) {
      return false
    }
  }

  async getTransaction(txHash) {
    try {
      const result = await this.web3.eth.getTransaction(txHash)
      return result
    } catch (error) {
      return false
    }
  }
  async getTransactionReceipt(txHash) {
    try {
      const result = await this.web3.eth.getTransactionReceipt(txHash)
      return result
    } catch (error) {
      console.error('getTransactionReceipt', error)
      return false
    }
  }
}

export default Web3
