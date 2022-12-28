const config = () => [
  {
    label: 'Home',
    href: '/',
    items: [],
  },
  {
    label: 'Blockchain',
    items: [
      {
        label: 'View Txns',
        href: '/txs',
        showBorder: true,
      },
      {
        label: 'View Blocks',
        href: '/blocks',
        showBorder: true,
      },
      {
        label: 'Top Accounts',
        href: '/accounts',
      },
      {
        label: 'Verified Contracts',
        href: '/contractsVerified',
      },
    ],
  },
  {
    label: 'Tokens',
    items: [
      {
        label: 'PN20 Top Tokens',
        href: '/tokens',
      },
      {
        label: 'View PN20 Transfers',
        href: '/tokens-transfers',
        showBorder: true,
      },
      {
        label: 'Top Statistics',
        href: '/top-statistics',
      },
    ],
  },
  {
    label: 'Resources',
    items: [
      {
        label: 'Top Statistics',
        href: '/topstat',
      },
      {
        label: 'View Blocks',
        href: '/blocks',
      },
    ],
  },
  {
    label: 'More',
    items: [
      {
        label: 'Api Documentation',
        href: 'https://docs.com',
      },
      {
        label: 'View Blocks',
        href: '/blocks',
      },
    ],
  },
]

export default config
