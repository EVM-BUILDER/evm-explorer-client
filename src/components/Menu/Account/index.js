import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import useAuth from 'hooks/useAuth'
import { Link } from 'components/Link'
import { UserIcon } from 'widgets/Svg'
import ItemWithDropdown from '../components/ItemWithDropdow'
import NextLink from 'components/Link/Link'
import { get } from 'lodash'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'

const WrapAccount = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  .username {
    margin: ${({ iconFirst }) => (iconFirst ? '0 0 0 8px' : '0 8px 0 0')};
    a {
      color: var(--header-color);
      white-space: nowrap;
    }
  }
  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    svg {
      width: 100%;
      height: auto;
      fill: ${({ theme }) => theme.colors.text};
    }
  }
`
const WAccountContent = styled.div`
  min-width: 130px;
  ul {
    margin: 0;
    display: flex;
    flex-direction: column;
    list-style: none;
    li {
      padding: 12px 0;
      &.dropdown-divider {
        padding: 0;
      }
      a {
        white-space: nowrap;
        padding: 4px 12px;
      }
    }
    .btn-logout {
      padding: 16px 12px;
      button {
        color: var(--white);
        width: 100%;
        text-align: center;
        padding: 6px;
        background: var(--primary);
        border: unset;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
`

const Account = ({ iconFirst, top, onClickMenuItem }) => {
  const { isMobile } = useMatchBreakpoints()

  const { userInfo } = useSelector((state) => state.User)

  const { logout } = useAuth()

  const handleClickMenuItem = () => {
    if (isMobile) {
      onClickMenuItem()
    }
  }

  return (
    <ItemWithDropdown
      top={top}
      position={isMobile ? 'left' : 'right'}
      content={
        userInfo ? (
          <WAccountContent>
            <ul>
              <li onClick={handleClickMenuItem}>
                <NextLink href="/myaccount">My Profile</NextLink>
              </li>

              {userInfo?.role === 'admin' && (
                <>
                  <li className="dropdown-divider"></li>
                  <li onClick={handleClickMenuItem}>
                    <NextLink href="/admin/dashboard">Admin Dashboard</NextLink>
                  </li>
                </>
              )}

              <li className="dropdown-divider"></li>
              <li className="btn-logout" onClick={handleClickMenuItem}>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </WAccountContent>
        ) : null
      }
    >
      <WrapAccount iconFirst={iconFirst}>
        <div className="username" style={{ order: iconFirst ? 1 : 0 }}>
          {userInfo ? <a>{get(userInfo, 'profile.username', 'Unknown')}</a> : <Link href="/login">Sign In</Link>}
        </div>
        <div className="avatar" style={{ order: iconFirst ? 0 : 1 }}>
          {userInfo?.profile?.avatar ? (
            <img src={get(userInfo, 'profile.username', 'Unknown')} alt={get(userInfo, 'profile.username', 'Unknown')} />
          ) : (
            <UserIcon width="24px" height="24px" />
          )}
        </div>
      </WrapAccount>
    </ItemWithDropdown>
  )
}

export default Account
