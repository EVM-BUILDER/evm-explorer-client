import React from 'react'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import BlockUnitconverter from './components/BlockUnitconverter'

const Unitconverter = () => {
  return (
    <div className="unitconverter-page">
      <h1>Unit Converter</h1>
      <div className="container">
        <p>
          PULSCAN or PULSE is often used in different denominations of its currency, such as Wei for interacting with
          smart contracts and Gwei for calculating gas prices. Use our Unit Converter to easily convert between them!
          For more info on unit conversion, read our <p>knowledge base article.</p>
        </p>
        <div className="block">
          <a href="#">[Reset]</a>

          <BlockUnitconverter />
          <BlockUnitconverter />
          <BlockUnitconverter />
          <BlockUnitconverter />
          <BlockUnitconverter />
          <BlockUnitconverter />
          <BlockUnitconverter />
        </div>
      </div>
    </div>
  )
}

Unitconverter.Layout = PublicLayoutBlock
export default Unitconverter
