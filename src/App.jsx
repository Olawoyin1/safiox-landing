import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import DashboardOverview from './components/admin/DashboardOverview';
import OrganizationManagement from './components/admin/OrganizationManagement';
import UserManagement from './components/admin/UserManagement';
import SosMonitoring from './components/admin/SosMonitoring';
import IncidentLogs from './components/admin/IncidentLogs';
import Moderation from './components/admin/Moderation';
import CommunityResponders from './components/admin/CommunityResponders';

function App() {
    return (
        <Router>
            <Toaster position="bottom-right" />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected admin routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/admin" element={<AdminDashboard />}>
                        <Route index element={<Navigate to="/admin/dashboard" replace />} />
                        <Route path="dashboard"     element={<DashboardOverview />} />
                        <Route path="organizations" element={<OrganizationManagement />} />
                        <Route path="users"         element={<UserManagement />} />
                        <Route path="emergency"     element={<SosMonitoring />} />
                        <Route path="incidents"     element={<IncidentLogs />} />
                        <Route path="moderation"    element={<Moderation />} />
                        <Route path="community"     element={<CommunityResponders />} />
                    </Route>
                </Route>

                <Route path="*" element={<LandingPage />} />
            </Routes>
        </Router>
    );
}

export default App;
