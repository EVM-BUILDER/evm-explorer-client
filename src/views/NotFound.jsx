import { Link } from 'components/Link'
import { useSettings } from 'redux/settings/hooks'
import styled from 'styled-components'
import Page from './Page'

const StyledNotFound = styled.div`
    height: 100%;
    padding-top: 48px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    img {
        max-width: 60px;
        margin-bottom: 10px;
    }

    h2 {
        font-weight: bold;
        font-size: 38px;
        line-height: 1.4;
    }
    p {
        font-size: 16px;
        font-weight: 400;
    }
    a {
        margin-top: 12px;
        display: block;
        button {
            padding: 2px 10px;
            cursor: pointer;
        }
    }
`

const NotFound = ({ statusCode = 404 }) => {
    const settings = useSettings()
    return (
        <Page>
            <StyledNotFound>
                {settings.logo && <img src={settings.logo} alt="" />}
                <h2>{statusCode}</h2>
                <p>Oops, page not found.</p>
                <Link href="/">
                    <button>Back Home</button>
                </Link>
            </StyledNotFound>
        </Page>
    )
}

export default NotFound
