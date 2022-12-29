import React from 'react'
import { Select } from 'antd'
import styled from 'styled-components'
import { useRouter } from 'next/dist/client/router'
import { isAddress, isTxhash } from 'utils'
import { isNumber } from 'library/helpers/Number'

const { Option } = Select

const WrapSearchInput = styled.div`
  color: var(--header-search-color);
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: flex-end;
  background-color: var(--header-search-bg-color);
  border: 1px solid var(--header-search-border-color);
  border-radius: 8px;

  ${({ theme }) => theme.mediaQueries.md} {
    border: 1px solid var(--header-search-border-color);
  }

  .ant-select {
    height: 100% !important;
    display: none;
    outline: none;
    color: #787a91;
    ${({ theme }) => theme.mediaQueries.md} {
      display: block;
      width: 122px;
      height: 40px;
      background: transparent;
      border-right: 1px solid ${({ theme }) => theme.colors.tertiary};
      outline: none;
    }
    .ant-select-selection-item,
    .ant-select-arrow {
      color: var(--header-search-color);
    }
    .ant-select-selector {
      color: #787a91;
      height: 100% !important;
      align-items: center;
      border: none;
      outline: none;
      font-weight: 600 !important;
      font-size: 16px;
      line-height: 19px;
    }
  }

  > input {
    color: var(--header-search-color);
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    width: 100%;
    height: 100%;
    padding: 12px 16px;
    background: transparent;
    outline: none;
    border: unset;
  }

  > .form-button {
    min-width: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    cursor: pointer;
    &.form-button-icon {
      width: 14px;
      height: 14px;
      margin: auto;
    }
  }
  .rc-virtual-list {
    .ant-select-item-option-selected {
      color: ${({ theme }) => theme.colors.secondaryColor};
      font-weight: 500;
      background-color: ${({ theme }) => theme.colors.primaryColor};
    }
    .ant-select-item-option-active {
      background-color: ${({ theme }) => theme.colors.primaryColor};
      color: ${({ theme }) => theme.colors.secondaryColor};
    }
  }
`

function SearchInput({ isContrast, ...props }) {
  const router = useRouter()

  const [searchValue, setSearchValue] = React.useState('')

  const handleSearch = () => {
    if (isAddress(searchValue)) {
      router.push(`/address/${searchValue}`)
    } else if (isTxhash(searchValue)) {
      router.push(`/tx/${searchValue}`)
    } else if (isNumber(+searchValue)) {
      router.push(`/block/${searchValue}`)
    }
    setSearchValue('')
  }
  return (
    <WrapSearchInput isContrast={isContrast}>
      <Select labelInValue defaultValue={{ value: 'All Filters' }} bordered={false} style={{ width: 120 }}>
        <Option>All Filters</Option>
        <Option value="1">Address</Option>
        <Option value="2">Txn</Option>
        <Option value="3">Tokens</Option>
        {/* <Option value="3">Name Tags</Option> */}
        {/* <Option value="4">Labels</Option> */}
        {/* <Option value="5">Websites</Option> */}
      </Select>
      <input
        type="text"
        placeholder="Search by Address / Txn Hash / Block / Token"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.keyCode === 13) {
            handleSearch()
          }
        }}
        {...props}
      />
      <div className="form-button" onClick={handleSearch}>
        <img className="form-button-icon" src="/images/icon/search.svg" alt="" />
      </div>
    </WrapSearchInput>
  )
}

export default SearchInput
