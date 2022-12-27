export const TAB_ACCOUNT_LINK = {
  overview: '#overview',
  settings: '#settings',
  pulsescan: '#pulsescan',
  watchlist: '#watchlist',
  privatenametags: '#privatenametags',
  privatenotes: '#privatenotes',
  apikey: '#apikey',
  verifiedaddresses: '#verifiedaddresses',
  customabist: '#customabist',
  tokenignore: '#tokenignore',
}

export const tabAccount = () => [
  {
    label: 'ACCOUNT',
    items: [
      {
        label: 'Account Overview',
        href: TAB_ACCOUNT_LINK.overview,
        image: '/images/account/overview.png',
      },
      {
        label: 'Account Settings',
        href: TAB_ACCOUNT_LINK.settings,
        image: '/images/account/accountsetting.png',
      },
      {
        label: 'PULSESCAN Connect',
        href: TAB_ACCOUNT_LINK.pulsescan,
        image: '/images/account/pulsescanconnect.png',
      },
    ],
  },
  // {
  //   label: 'WATCH LIST & NOTES',
  //   items: [
  //     {
  //       label: 'Watch List',
  //       href: '#watchlist',
  //       image: '/images/account/watchlist.png',
  //     },
  //     {
  //       label: 'Private Name Tags',
  //       href: '#privatenametags',
  //       image: '/images/account/privatenametags.png',
  //     },
  //     {
  //       label: 'Txn Private Notes',
  //       href: '#privatenotes',
  //       image: '/images/account/privatenotes.png',
  //     },
  //   ],
  // },
  {
    label: 'OTHERS',
    items: [
      // {
      //   label: 'API Keys',
      //   href: '#apikey',
      //   image: '/images/account/api.png',
      // },
      {
        label: 'Verified Addresses',
        href: TAB_ACCOUNT_LINK.verifiedaddresses,
        image: '/images/account/verifiedaddresses.png',
      },
      // {
      //   label: 'Custom ABIst',
      //   href: '#customabist',
      //   image: '/images/account/ABIs.png',
      // },
      // {
      //   label: 'Token Ignore List',
      //   href: '#tokenignore',
      //   image: '/images/account/ignorelist.png',
      // },
    ],
  },
]
