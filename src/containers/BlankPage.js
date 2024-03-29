import React, { Component } from 'react'
import LayoutContentWrapper from 'components/utility/layoutWrapper'
import LayoutContent from 'components/utility/layoutContent'

class BlankPage extends Component {
  render() {
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>Blank Page</h1>
        </LayoutContent>
      </LayoutContentWrapper>
    )
  }
}

export default BlankPage
