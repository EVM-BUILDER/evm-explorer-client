import styled from 'styled-components'
import { ClassNames } from 'utils/classNames.util'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 64px - 152px);
`

const Page = ({ className, children, ...props }) => {
  return (
    <StyledPage className={ClassNames({ container: true, [className]: true })} {...props}>
      {children}
    </StyledPage>
  )
}

export default Page
