import React from 'react'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import { BackTop, Col, Row } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import { requestAddNetworkToWallet } from 'utils/requestWallet'

const Footer = () => {
    const { settings } = useSelector((state) => state.Settings)

    const ftLogo = settings?.['menu_footer']?.['ftlogo']
    const ftTitle = settings?.['menu_footer']?.['fttitle']
    const ftDesciption = settings?.['menu_footer']?.['ftdesciption']
    const ftCopyright = settings?.['menu_footer']?.['ftcopyright']

    const fSocials = settings?.['menu_footer']?.['ftsocials']

    const footer01 = settings?.['menu_footer']?.['ft01']
    const footer02 = settings?.['menu_footer']?.['ft02']
    const footer03 = settings?.['menu_footer']?.['ft03']

    // console.log('2352352', get(settings, 'appearance.footer.show_addmetamask', false))

    return (
        <>
            <footer className="footer-container-wrapper">
                <div className="footer-container container">
                    <Row
                        gutter={[
                            { xs: 12, md: 32 },
                            { xs: 12, md: 32 },
                        ]}
                    >
                        <Col xs={24} sm={24} md={9} className="footer-info">
                            <div className="info-title">
                                {ftLogo && <img src={ftLogo} alt="" />}
                                <span>{ftTitle}</span>
                            </div>
                            <p className="info-desc">{ftDesciption}</p>

                            {get(settings, 'appearance.footer.show_addmetamask', false) && (
                                <div className="d-flex">
                                    <button
                                        type="button"
                                        className="btn-add-metamask"
                                        onClick={() => requestAddNetworkToWallet(settings.addToMetamask)}
                                    >
                                        <img className="mr-1" width="15" src="/images/metamask.svg" alt="Metamask" /> Add{' '}
                                        {get(settings, 'chain.native.symbol', '')} Network
                                    </button>
                                </div>
                            )}

                            <ul className="list-social">
                                {fSocials?.map((item) => {
                                    return (
                                        <li key={item.title}>
                                            <a href={item.url}>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    {...(item.item && { target: item.target })}
                                                />
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                            <p className="copyright">{ftCopyright}</p>
                        </Col>

                        {footer01?.items.length > 0 && (
                            <Col xs={24} sm={12} md={5} className="footer-link">
                                <h2 className="link-title">{footer01?.title}</h2>
                                <ul className="list-link">
                                    {footer01?.items?.map((item) => {
                                        return (
                                            <li key={item.title}>
                                                <a href={item.url} target={item.target}>
                                                    {item.title}
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Col>
                        )}
                        {footer02?.items.length > 0 && (
                            <Col xs={24} sm={12} md={5} className="footer-link">
                                <h2 className="link-title">{footer02?.title}</h2>
                                <ul className="list-link">
                                    {footer02?.items?.map((item) => {
                                        return (
                                            <li key={item.title}>
                                                <a href={item.url} target={item.target}>
                                                    {item.title}
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Col>
                        )}
                        {footer03?.items.length > 0 && (
                            <Col xs={24} sm={12} md={5} className="footer-link">
                                <h2 className="link-title">{footer03?.title}</h2>
                                <ul className="list-link">
                                    {footer03?.items?.map((item) => {
                                        return (
                                            <li key={item.title}>
                                                <a href={item.url} target={item.target}>
                                                    {item.title}
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Col>
                        )}
                    </Row>
                </div>
            </footer>
            <BackTop duration={10}>
                <div className="crollTop">
                    <ArrowUpOutlined />
                </div>
            </BackTop>
        </>
    )
}

export default Footer
