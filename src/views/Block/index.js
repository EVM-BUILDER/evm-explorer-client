import React from 'react'
import { Link } from 'components/Link'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import CardTabs from 'components/Card/CardTabs'
import Overview from './components/Overview'
import ConsensusInfo from './components/ConsensusInfo'
import Comments from './components/Comments'

export const TABS_VIEW = {
  OVERVIEW: 1,
  CONSENSUSINFO: 2,
  COMMENTS: 3,
}

const Block = () => {
  return (
    <section className="block-wrapper">
      <div className="container ">
        <div className="block-card">
          <CardTabs
            tabs={[
              {
                key: TABS_VIEW.OVERVIEW,
                title: 'Overview',
                content: <Overview />,
              },
              {
                key: TABS_VIEW.CONSENSUSINFO,
                title: 'Consensus Info',
                content: <ConsensusInfo />,
              },
              {
                key: TABS_VIEW.COMMENTS,
                title: 'Comments',
                content: <Comments />,
              },
            ]}
          />
        </div>
        <div className="block-desc">
          <img src="/images/icon/lamp-hub.png" alt="" />
          <span>
            A wallet address is a publicly available address that allows its owner to receive funds from another party.
            To access the funds in an address, you must have its private key. Learn more about addresses in our{' '}
            <Link href="/knowledgw-base">Knowledge Base.</Link>
          </span>
        </div>
      </div>
    </section>
  )
}

Block.Layout = PublicLayoutBlock

export default Block
