import { Routes, Route } from 'react-router-dom';

// Layout
import AuthRedirect from '../components/auth/AuthRedirect';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { MainLayout } from '../components/MainLayout';

// Public pages
import { RoleSelectionPage } from '../components/RoleSelectionPage';
import { AboutPage } from '../pages/AboutPage';
import { AdminDeletedDocumentsPage } from '../pages/AdminDeletedDocumentsPage';
import { AgentDetailPage } from '../pages/AgentDetailPage';
import { AgentsPage } from '../pages/AgentsPage';
import { BlogPage } from '../pages/BlogPage';
import { BlogPostPage } from '../pages/BlogPostPage';
import { FAQPage } from '../pages/FAQPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { PropertiesPage } from '../pages/PropertiesPage';
import { PropertyDetailPage } from '../pages/PropertyDetailPage';
import { ContactPage } from '../pages/ContactPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { ListPropertyPage } from '../pages/ListPropertyPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { TenantPaymentsPage } from '../pages/TenantPaymentsPage';
import { TermsPage } from '../pages/TermsPage';
import { CookiePolicyPage } from '../pages/CookiePolicyPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import { VerifiedBadgePage } from '../pages/VerifiedBadgePage';

// Dashboards (role-based)
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import OwnerDashboard from '../pages/dashboard/OwnerDashboard';
import AgentDashboard from '../pages/dashboard/AgentDashboard';
import TenantDashboard from '../pages/dashboard/TenantDashboard';

// Protected routes
import { OwnerPaymentsPage } from '../pages/OwnerPaymentsPage';

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
          AUTH ROUTES (with MainLayout and redirect)
      ============================= */}
      <Route
        path="/login"
        element={
          <MainLayout>
            <LoginPage />
          </MainLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <MainLayout>
            <SignupPage />
          </MainLayout>
        }
      />

      {/* =============================
          DASHBOARD ROUTES (protected, no MainLayout)
      ============================= */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/deleted-documents"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminDeletedDocumentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/owner"
        element={
          <ProtectedRoute roles={['owner']}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/payments"
        element={
          <ProtectedRoute roles={['owner', 'admin']}>
            <OwnerPaymentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/agent"
        element={
          <ProtectedRoute roles={['agent']}>
            <AgentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/tenant"
        element={
          <ProtectedRoute roles={['tenant']}>
            <TenantDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tenant/payments"
        element={
          <ProtectedRoute roles={['tenant', 'admin']}>
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
