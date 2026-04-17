import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import AdminHeader from '../components/admin/AdminHeader';

const titles = {
    '/admin/dashboard':     { t: 'Analytics Overview',    s: 'Platform performance metrics' },
    '/admin/organizations': { t: 'Organizations',         s: 'Verify and manage partners' },
    '/admin/users':         { t: 'User Management',       s: 'System access control' },
    '/admin/emergency':     { t: 'SOS Monitoring',        s: 'Active distress signals' },
    '/admin/incidents':     { t: 'Incident Logs',         s: 'Report history' },
    '/admin/moderation':    { t: 'Moderation',            s: 'Content guidelines compliance' },
    '/admin/community':     { t: 'Responders',            s: 'Active responders and verify status' },
};

const AdminDashboard = () => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentTitle = titles[location.pathname] || titles['/admin/dashboard'];

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            <main className="flex-1 overflow-y-auto min-w-0">
                <AdminHeader
                    title={currentTitle.t}
                    subtitle={currentTitle.s}
                    onMenuOpen={() => setSidebarOpen(true)}
                />
                <div className="p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
