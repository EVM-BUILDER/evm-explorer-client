import {
    HomeOutlined,
    SettingOutlined,
    UserOutlined,
    FontColorsOutlined,
    BookOutlined,
    UsergroupAddOutlined,
    DatabaseOutlined,
    ImportOutlined,
} from '@ant-design/icons'
import Link from 'components/Link/Link'

export const adminMenu = () => [
    {
        key: '/admin',
        icon: <HomeOutlined />,
        label: <Link href={`/admin`}>Dashboard</Link>,
    },
    {
        key: '/admin/users',
        icon: <UserOutlined />,
        label: <Link href={`/admin/users`}>Users</Link>,
    },
    {
        key: '/admin/verifyaddress',
        icon: <FontColorsOutlined />,
        label: <Link href={`/admin/verifyaddress`}>Verify Address</Link>,
    },
    {
        key: '/admin/abilibrary',
        icon: <BookOutlined />,
        label: <Link href={`/admin/abilibrary`}>ABI Library</Link>,
    },
    {
        key: '/admin/communication',
        icon: <UsergroupAddOutlined />,
        label: 'Communication',
        children: [
            {
                key: '/admin/communication/sendmail',
                label: <Link href={`/admin/communication/sendmail`}>Send Mail</Link>,
            },
        ],
    },
    {
        key: '/admin/settings',
        icon: <SettingOutlined />,
        label: 'Settings',
        children: [
            {
                key: '/admin/settings/general',
                label: <Link href={`/admin/settings/general`}>General</Link>,
            },
            {
                key: '/admin/settings/statistics',
                label: <Link href={`/admin/settings/statistics`}>Statistics Box</Link>,
            },
            {
                key: '/admin/settings/appearance',
                label: <Link href={`/admin/settings/appearance`}>Appearance</Link>,
            },
            {
                key: '/admin/settings/menu',
                label: <Link href={`/admin/settings/menu`}>Menu</Link>,
            },
            {
                key: '/admin/settings/ads',
                label: <Link href={`/admin/settings/ads`}>Ads</Link>,
            },
            {
                key: '/admin/settings/chain',
                label: <Link href={`/admin/settings/chain`}>Chain</Link>,
            },
            {
                key: '/admin/settings/script',
                label: <Link href={`/admin/settings/script`}>Script</Link>,
            },
            {
                key: '/admin/settings/smtp',
                label: <Link href={`/admin/settings/smtp`}>SMTP</Link>,
            },
            {
                key: '/admin/settings/token-price',
                label: <Link href={`/admin/settings/token-price`}>Token price</Link>,
            },
        ],
    },
    {
        key: '/admin/import-preset',
        icon: <ImportOutlined />,
        label: <Link href={`/admin/import-preset`}>Import Preset</Link>,
    },
]
