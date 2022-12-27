import React from 'react'
import ApiKeys from '../ApiKey'
import ApiPlans from '../ApiPlans'

const Api = () => {
  return (
    <>
      <ApiKeys />
      <ApiPlans />
      <div className="notes">
        <img style={{ width: '16px' }} src="/images/account/matching.png" />
        &emsp;
        <span>
          API keys created on Etherscan.io can be used for the Kovan, Rinkeby, Ropsten, Sepolia and Goerli Testnets.
          Detailed documentation to get started can be found at
        </span>
      </div>
    </>
  )
}

export default Api
