import styled from 'styled-components'

const width = 24
const height = 24
const lineWidth = 3

const WrapCollapseIcon = styled.div`
  width: ${width}px;
  height: ${height}px;

  display: block;
  align-items: center;

  position: relative;

  input#menu {
    display: none;
  }

  .icon {
    width: 34px;
    height: auto;
    padding: 0;
    display: block;
    cursor: pointer;
  }

  .icon .menu,
  .icon .menu::before,
  .icon .menu::after {
    content: '';
    height: ${lineWidth}px;
    background: ${({ theme }) => theme.colors.primaryColor};
    display: block;
    position: absolute;
    transition: ease 0.3s, top ease 0.3s 0.3s, transform ease 0.3s;
  }

  .icon .menu::before {
    width: ${width}px;
  }

  .icon .menu {
    width: ${width}px;
    position: absolute;
    top: ${(width - lineWidth) / 2}px;
  }

  .icon .menu::after {
    width: ${width}px;
  }

  .icon:hover .menu,
  .icon:hover .menu::before,
  .icon:hover .menu::after {
    background: ${({ theme }) => theme.colors.textMain};
  }

  .icon .menu::before {
    top: -${(width - lineWidth) / 2}px;
  }

  .icon .menu::after {
    top: ${(width - lineWidth) / 2}px;
  }

  #menu:checked + .icon .menu {
    background: transparent;
  }

  #menu:checked + .icon .menu::before {
    width: ${width + 2}px;
    transform: rotate(45deg);
  }

  #menu:checked + .icon .menu::after {
    width: ${width + 2}px;
    transform: rotate(-45deg);
  }

  #menu:checked + .icon .menu::before,
  #menu:checked + .icon .menu::after {
    top: 0;
    transition: top ease 0.3s, transform ease 0.3s 0.3s;
  }
`

export default function MenuCollapseIcon({ className, showMenu, toggleMenu }) {
  return (
    <WrapCollapseIcon className={className}>
      <input type="checkbox" id="menu" checked={showMenu} onChange={toggleMenu} />
      <label htmlFor="menu" className="icon">
        <div className="menu" />
      </label>
    </WrapCollapseIcon>
  )
}
MenuCollapseIcon.defaultProps = {
  className: '',
}
