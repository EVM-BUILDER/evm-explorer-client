import React from 'react'
import AdminLayout from 'layouts/AdminLayout'
import Breadcrumb from 'components/Breadcrumb'

const Dashboard = () => {

    const breadcrumb = [
        {
            link: "/admin",
            title: "Dashboard"
        },
    ]

    return (
        <div>
            <Breadcrumb listItems={breadcrumb} />
            <h2>Dashboard</h2>
        </div>
    )
}

Dashboard.Layout = AdminLayout

export default Dashboard
