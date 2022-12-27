import styled from 'styled-components'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const NotSupport = () => {
  return (
    <StyledNotFound>
      <div>Unavailable for legal reasons</div>
    </StyledNotFound>
  )
}

export default NotSupport
