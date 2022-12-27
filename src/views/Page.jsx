import styled from 'styled-components'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 64px - 152px);
`

const Page = ({ children, ...props }) => {
  return (
    <StyledPage className="container" {...props}>
      {children}
    </StyledPage>
  )
}

export default Page
