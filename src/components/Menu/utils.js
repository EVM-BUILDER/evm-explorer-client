import orderBy from 'lodash/orderBy'

export const getActiveMenuItem = ({ pathname, menuConfig }) => {
  if (pathname === '/') {
    return menuConfig.find(
      (menuItem) => pathname.startsWith(menuItem.href) || getActiveSubMenuItem({ menuItem, pathname }),
    )
  }

  return menuConfig
    .slice(1)
    .find((menuItem) => pathname.startsWith(menuItem.href) || getActiveSubMenuItem({ menuItem, pathname }))
}

export const getActiveSubMenuItem = ({ menuItem, pathname }) => {
  const activeSubMenuItems = menuItem?.child?.filter((subMenuItem) => pathname.startsWith(subMenuItem.href)) ?? []

  // Pathname doesn't include any submenu item href - return undefined
  if (!activeSubMenuItems || activeSubMenuItems.length === 0) {
    return undefined
  }

  // Pathname includes one sub menu item href - return it
  if (activeSubMenuItems.length === 1) {
    return activeSubMenuItems[0]
  }

  // Pathname includes multiple sub menu item hrefs - find the most specific match
  const mostSpecificMatch = orderBy(activeSubMenuItems, (subMenuItem) => subMenuItem.href.length, 'desc')[0]

  return mostSpecificMatch
}
