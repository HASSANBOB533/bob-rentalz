import { Routes, Route } from 'react-router-dom';

// Layout
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { AuthLayout } from '../components/AuthLayout';
import { MainLayout } from '../components/MainLayout';

// Public pages
import { RoleSelectionPage } from '../components/RoleSelectionPage';
import { AboutPage } from '../pages/AboutPage';
import { AdminDeletedDocumentsPage } from '../pages/AdminDeletedDocumentsPage';
import { AgentDetailPage } from '../pages/AgentDetailPage';
import { AgentsPage } from '../pages/AgentsPage';
import { BlogPage } from '../pages/BlogPage';
import { BlogPostPage } from '../pages/BlogPostPage';
import { ContactPage } from '../pages/ContactPage';
import { CookiePolicyPage } from '../pages/CookiePolicyPage';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import AgentDashboard from '../pages/dashboard/AgentDashboard';
import OwnerDashboard from '../pages/dashboard/OwnerDashboard';
import TenantDashboard from '../pages/dashboard/TenantDashboard';
import { FAQPage } from '../pages/FAQPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { HomePage } from '../pages/HomePage';
import { ListPropertyPage } from '../pages/ListPropertyPage';
import { LoginPage } from '../pages/LoginPage';
import { OwnerPaymentsPage } from '../pages/OwnerPaymentsPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { PropertiesPage } from '../pages/PropertiesPage';
import { PropertyDetailPage } from '../pages/PropertyDetailPage';
import { SignupPage } from '../pages/SignupPage';
import { TenantPaymentsPage } from '../pages/TenantPaymentsPage';
import { TermsPage } from '../pages/TermsPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import { VerifiedBadgePage } from '../pages/VerifiedBadgePage';

// Dashboards (role-based)

// Protected routes

// 404 fallback
const NotFound = () => (
  <MainLayout>
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#0E56A4] mb-4">404</h1>
        <p className="text-xl text-gray-600">Page Not Found</p>
      </div>
    </div>
  </MainLayout>
);

export default function AppRouter() {
  return (
    <Routes>
      {/* =============================
          PUBLIC ROUTES (with MainLayout)
      ============================= */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/properties"
        element={
          <MainLayout>
            <PropertiesPage />
          </MainLayout>
        }
      />
      <Route
        path="/property/:id"
        element={
          <MainLayout>
            <PropertyDetailPage />
          </MainLayout>
        }
      />
      <Route
        path="/agents"
        element={
          <MainLayout>
            <AgentsPage />
          </MainLayout>
        }
      />
      <Route
        path="/agent/:id"
        element={
          <MainLayout>
            <AgentDetailPage />
          </MainLayout>
        }
      />
      <Route
        path="/faq"
        element={
          <MainLayout>
            <FAQPage />
          </MainLayout>
        }
      />
      <Route
        path="/blog"
        element={
          <MainLayout>
            <BlogPage />
          </MainLayout>
        }
      />
      <Route
        path="/blog/:slug"
        element={
          <MainLayout>
            <BlogPostPage />
          </MainLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MainLayout>
            <ContactPage />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <AboutPage />
          </MainLayout>
        }
      />
      <Route
        path="/favorites"
        element={
          <MainLayout>
            <FavoritesPage />
          </MainLayout>
        }
      />
      <Route
        path="/list-property"
        element={
          <MainLayout>
            <ListPropertyPage />
          </MainLayout>
        }
      />
      <Route
        path="/privacy"
        element={
          <MainLayout>
            <PrivacyPage />
          </MainLayout>
        }
      />
      <Route
        path="/terms"
        element={
          <MainLayout>
            <TermsPage />
          </MainLayout>
        }
      />
      <Route
        path="/cookie-policy"
        element={
          <MainLayout>
            <CookiePolicyPage />
          </MainLayout>
        }
      />
      <Route
        path="/verified-badge"
        element={
          <MainLayout>
            <VerifiedBadgePage />
          </MainLayout>
        }
      />
      <Route
        path="/role-selection"
        element={
          <MainLayout>
            <RoleSelectionPage />
          </MainLayout>
        }
      />
      <Route
        path="/unauthorized"
        element={
          <MainLayout>
            <UnauthorizedPage />
          </MainLayout>
        }
      />

      {/* =============================
          AUTH ROUTES (with AuthLayout for proper header spacing)
      ============================= */}
      <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout>
            <SignupPage />
          </AuthLayout>
        }
      />

      {/* =============================
          DASHBOARD ROUTES (protected, no MainLayout)
      ============================= */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/deleted-documents"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDeletedDocumentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/owner"
        element={
          <ProtectedRoute allowedRoles={['owner']}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/payments"
        element={
          <ProtectedRoute allowedRoles={['owner', 'admin']}>
            <OwnerPaymentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/agent"
        element={
          <ProtectedRoute allowedRoles={['agent']}>
            <AgentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/tenant"
        element={
          <ProtectedRoute allowedRoles={['tenant']}>
            <TenantDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tenant/payments"
        element={
          <ProtectedRoute allowedRoles={['tenant', 'admin']}>
            <TenantPaymentsPage />
          </ProtectedRoute>
        }
      />

      {/* =============================
          404 fallback
      ============================= */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
