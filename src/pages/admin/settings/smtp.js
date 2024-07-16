import React from 'react'
import AdminLayout from 'layouts/AdminLayout'
import AdminSystemSettingsView from 'views/Admin/Settings/smtp'

export default function AdminSystemSettings() {
    return <AdminSystemSettingsView />
}

AdminSystemSettings.Layout = AdminLayout
