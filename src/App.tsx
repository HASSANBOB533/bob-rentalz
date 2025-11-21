import { Routes, Route } from 'react-router-dom';

// Dashboard pages (we will create them next)
import AdminDashboard from './pages/dashboard/AdminDashboard';
import OwnerDashboard from './pages/dashboard/OwnerDashboard';
import TenantDashboard from './pages/dashboard/TenantDashboard';
import AgentDashboard from './pages/dashboard/AgentDashboard';

function App() {
  return (
    <Routes>

      {/* Home Page */}
      <Route path="/" element={<div>Home Page</div>} />

      {/* Dashboards */}
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/owner" element={<OwnerDashboard />} />
      <Route path="/dashboard/tenant" element={<TenantDashboard />} />
      <Route path="/dashboard/agent" element={<AgentDashboard />} />

    </Routes>
  );
}

export default App;
