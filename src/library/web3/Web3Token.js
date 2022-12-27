import Web3Libs from 'web3'
import abiErc20 from 'config/constants/abis/erc20.json'

class Web3Token {
  constructor(address, abi, rpc) {
    this.address = address 
    this.abi = abi || abiErc20
    this.web3 = new Web3Libs(new Web3Libs.providers.HttpProvider(rpc ))
    this.contract = new this.web3.eth.Contract(this.abi, this.address)
  }

  async getInfo(funcName) {
    try {
      return await this.contract.methods[funcName]().call()
    } catch (error) {
      console.error('getInfo', error)
      return false
    }
  }

  async name() {
    const response = await this.contract.methods.name().call()
    return response
  }

  async symbol() {
    const response = await this.contract.methods.symbol().call()
    return response
  }

  async decimals() {
    const response = await this.contract.methods.decimals().call()
    return response
  }

  async totalSupply() {
    const response = await this.contract.methods.totalSupply().call()
    return response
  }

  async getFullInfo() {
    return Promise.all([await this.name(), await this.symbol(), await this.decimals(), await this.totalSupply()])
      .then(([name, symbol, decimals, totalSupply]) => {
        return { name, symbol, decimals, totalSupply, address: this.address }
      })
      .catch((error) => {
        console.error('E0089', error)
        return null
      })
  }

  async balanceOf(address) {
    const response = await this.contract.methods.balanceOf(address).call()
    return response
  }

  async getLastedBlockNumber() {
    try {
      return await this.web3.eth.getBlockNumber()
    } catch (error) {
      return false
    }
  }

  async getEventLogContract(event, fromBlock, toBlock) {
    try {
      const topic = this.contract.events[event]
      return await this.contract.getPastEvents(event, {
        fromBlock,
        toBlock,
        topic,
      })
    } catch (error) {
      return false
    }
  }
}

export default Web3Token
