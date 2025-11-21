import { Routes, Route } from "react-router-dom";

// Public pages
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { PropertiesPage } from "../pages/PropertiesPage";
import { PropertyDetailPage } from "../pages/PropertyDetailPage";
import { FAQPage } from "../pages/FAQPage";
import { BlogPage } from "../pages/BlogPage";
import { BlogPostPage } from "../pages/BlogPostPage";
import { ContactPage } from "../pages/ContactPage";

// Dashboards (role-based)
import { AdminDashboard } from "../pages/dashboard/AdminDashboard";
import { OwnerDashboard } from "../pages/dashboard/OwnerDashboard";
import { AgentDashboard } from "../pages/dashboard/AgentDashboard";
import { TenantDashboard } from "../pages/dashboard/TenantDashboard";

// Protected routes
import ProtectedRoute from "./ProtectedRoute";
import AuthRedirect from "./AuthRedirect";

// 404 fallback
const NotFound = () => <div>404 — Page Not Found</div>;

export default function AppRouter() {
  return (
    <Routes>
      {/* =============================
          PUBLIC ROUTES
      ============================= */}
      <Route path="/" element={<HomePage />} />
      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/property/:id" element={<PropertyDetailPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* =============================
          AUTH ROUTES (with redirect)
      ============================= */}
      <Route
        path="/login"
        element={
          <>
            <AuthRedirect />
            <LoginPage />
          </>
        }
      />
      <Route
        path="/signup"
        element={
          <>
            <AuthRedirect />
            <SignupPage />
          </>
        }
      />

      {/* =============================
          DASHBOARD ROUTES (protected)
      ============================= */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/owner"
        element={
          <ProtectedRoute roles={["owner"]}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/agent"
        element={
          <ProtectedRoute roles={["agent"]}>
            <AgentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/tenant"
        element={
          <ProtectedRoute roles={["tenant"]}>
            <TenantDashboard />
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
