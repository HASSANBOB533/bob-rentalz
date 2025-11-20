import TenantPropertyDetailsPage from './pages/TenantPropertyDetailsPage';
import TenantRentalDetailsPage from './pages/TenantRentalDetailsPage';
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import OwnerAddPropertyPage from './pages/OwnerAddPropertyPage';
import OwnerAllPropertiesPage from './pages/OwnerAllPropertiesPage';
import OwnerEditPropertyPage from './pages/OwnerEditPropertyPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { AgentsPage } from './pages/AgentsPage';
import { AgentDetailPage } from './pages/AgentDetailPage';
import { ListPropertyPage } from './pages/ListPropertyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { FAQPage } from './pages/FAQPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { VerifiedBadgePage } from './pages/VerifiedBadgePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { RoleSelectionPage } from './components/RoleSelectionPage';
import TenantDashboardPage from './pages/TenantDashboardPage';
import TenantSavedPropertiesPage from './pages/TenantSavedPropertiesPage';
import TenantInquiriesPage from './pages/TenantInquiriesPage';
import TenantProfilePage from './pages/TenantProfilePage';
import TenantSettingsPage from './pages/TenantSettingsPage';
import TenantRentedPropertiesPage from './pages/TenantRentedPropertiesPage';
import TenantRentedDashboardPage from './pages/TenantRentedDashboardPage';
import TenantRentedMyRentalsPage from './pages/TenantRentedMyRentalsPage';
import TenantRentedRentalDetailsPage from './pages/TenantRentedRentalDetailsPage';
import TenantRentedServiceRequestsPage from './pages/TenantRentedServiceRequestsPage';
import TenantRentedNewRequestPage from './pages/TenantRentedNewRequestPage';
import TenantRentedTrackRequestPage from './pages/TenantRentedTrackRequestPage';
import TenantRentedDocumentsPage from './pages/TenantRentedDocumentsPage';
import TenantRentedMessagesPage from './pages/TenantRentedMessagesPage';
import TenantRentedProfilePage from './pages/TenantRentedProfilePage';
import TenantRentedSettingsPage from './pages/TenantRentedSettingsPage';
import TenantServiceRequestsPage from './pages/TenantServiceRequestsPage';
import TenantCreateServiceRequestPage from './pages/TenantCreateServiceRequestPage';
import TenantDocumentsPage from './pages/TenantDocumentsPage';
import TenantRequestTrackingPage from './pages/TenantRequestTrackingPage';
import TenantConversationPage from './pages/TenantConversationPage';
import OwnerLeadsCenterPage from './pages/OwnerLeadsCenterPage';
import OwnerConversationPage from './pages/OwnerConversationPage';
import OwnerLeadDetailsPage from './pages/OwnerLeadDetailsPage';
import OwnerPastTenantsPage from './pages/OwnerPastTenantsPage';
import OwnerPastTenantDetailPage from './pages/OwnerPastTenantDetailPage';
import OwnerMessagesPage from './pages/OwnerMessagesPage';
import OwnerTenantChatPage from './pages/OwnerTenantChatPage';
import OwnerFinancialReportsPage from './pages/OwnerFinancialReportsPage';
import OwnerProfilePage from './pages/OwnerProfilePage';
import OwnerSettingsPage from './pages/OwnerSettingsPage';
import AgentDashboardPage from './pages/AgentDashboardPage';
import AgentLeadsPage from './pages/AgentLeadsPage';
import AgentMessagesPage from './pages/AgentMessagesPage';
import AgentConversationPage from './pages/AgentConversationPage';
import AgentViewingsPage from './pages/AgentViewingsPage';
import AgentPropertiesPage from './pages/AgentPropertiesPage';
import AgentProfilePage from './pages/AgentProfilePage';
import AgentSettingsPage from './pages/AgentSettingsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminPropertiesPage from './pages/AdminPropertiesPage';
import AdminPropertyDetailPage from './pages/AdminPropertyDetailPage';
import AdminEditPropertyPage from './pages/AdminEditPropertyPage';
import AdminTenantsPage from './pages/AdminTenantsPage';
import AdminTenantDetailPage from './pages/AdminTenantDetailPage';
import AdminAssignmentsPage from './pages/AdminAssignmentsPage';
import AdminServiceRequestsPage from './pages/AdminServiceRequestsPage';
import AdminReportsPage from './pages/AdminReportsPage';
import AdminOwnersPage from './pages/AdminOwnersPage';
import AdminOwnerDetailPage from './pages/AdminOwnerDetailPage';
import AdminAgentsPage from './pages/AdminAgentsPage';
import AdminAgentDetailPage from './pages/AdminAgentDetailPage';
import AdminAgentPropertiesPage from './pages/AdminAgentPropertiesPage';
import AdminAgentLeadsPage from './pages/AdminAgentLeadsPage';
import AdminProfilePage from './pages/AdminProfilePage';
import AdminSettingsPage from './pages/AdminSettingsPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Dashboard Routes (No Navbar/Footer) */}
          <Route path="/dashboard" element={<TenantDashboardPage />} />
          <Route path="/tenant/saved" element={
            <DashboardLayout userRole="tenant">
              <TenantSavedPropertiesPage />
            </DashboardLayout>
          } />
          <Route path="/tenant/inquiries" element={
            <DashboardLayout userRole="tenant">
              <TenantInquiriesPage />
            </DashboardLayout>
          } />
          <Route path="/tenant/profile" element={<TenantProfilePage />} />
          <Route path="/tenant/settings" element={
            <DashboardLayout userRole="tenant">
              <TenantSettingsPage />
            </DashboardLayout>
          } />

          {/* Tenant Rented (Active Renters) Routes */}
          <Route path="/tenant/rented/dashboard" element={<TenantRentedDashboardPage />} />
          <Route path="/tenant/rented/my-rentals" element={<TenantRentedMyRentalsPage />} />
          <Route path="/tenant/rented/rental-details/:id" element={<TenantRentedRentalDetailsPage />} />
          <Route path="/tenant/rented/service-requests" element={<TenantRentedServiceRequestsPage />} />
          <Route path="/tenant/rented/new-request" element={<TenantRentedNewRequestPage />} />
          <Route path="/tenant/rented/track-request/:id" element={<TenantRentedTrackRequestPage />} />
          <Route path="/tenant/rented/documents" element={<TenantRentedDocumentsPage />} />
          <Route path="/tenant/rented/messages" element={<TenantRentedMessagesPage />} />
          <Route path="/tenant/rented/profile" element={<TenantRentedProfilePage />} />
          <Route path="/tenant/rented/settings" element={<TenantRentedSettingsPage />} />
          
          <Route path="/tenant/rented" element={
            <DashboardLayout userRole="tenant">
              <TenantRentedPropertiesPage />
            </DashboardLayout>
          } />
          <Route path="/tenant/service-requests" element={
            <DashboardLayout userRole="tenant">
              <TenantServiceRequestsPage />
            </DashboardLayout>
          } />
          <Route path="/tenant/create-service-request" element={
            <DashboardLayout userRole="tenant">
              <TenantCreateServiceRequestPage />
            </DashboardLayout>
          } />
          <Route path="/tenant/documents" element={<TenantDocumentsPage />} />
          <Route path="/tenant/request-tracking" element={<TenantRequestTrackingPage />} />
          <Route path="/tenant/conversation/:id" element={
            <DashboardLayout userRole="tenant">
              <TenantConversationPage />
            </DashboardLayout>
          } />
          <Route path="/tenant/property-details/:id" element={
            <DashboardLayout userRole="tenant">
              <TenantPropertyDetailsPage />
            </DashboardLayout>
          } />
          <Route path="/tenant/rental-details/:id" element={
            <DashboardLayout userRole="tenant">
              <TenantRentalDetailsPage />
            </DashboardLayout>
          } />
          <Route path="/owner/dashboard" element={<OwnerDashboardPage />} />
          <Route path="/owner/add-property" element={
            <DashboardLayout userRole="owner">
              <OwnerAddPropertyPage />
            </DashboardLayout>
          } />
          <Route path="/owner/properties" element={<OwnerAllPropertiesPage />} />
          <Route path="/owner/properties/:propertyId/edit" element={<OwnerEditPropertyPage />} />
          <Route path="/owner/leads" element={<OwnerLeadsCenterPage />} />
          <Route path="/owner/conversation/:leadId" element={<OwnerConversationPage />} />
          <Route path="/owner/lead-details/:leadId" element={<OwnerLeadDetailsPage />} />
          <Route path="/owner/past-tenants" element={<OwnerPastTenantsPage />} />
          <Route path="/owner/past-tenants/:tenantId" element={<OwnerPastTenantDetailPage />} />
          <Route path="/owner/messages" element={<OwnerMessagesPage />} />
          <Route path="/owner/tenant-chat/:propertyId" element={<OwnerTenantChatPage />} />
          <Route path="/owner/reports" element={<OwnerFinancialReportsPage />} />
          <Route path="/owner/profile" element={<OwnerProfilePage />} />
          <Route path="/owner/settings" element={<OwnerSettingsPage />} />
          
          {/* Agent Routes */}
          <Route path="/agent/dashboard" element={
            <DashboardLayout pageTitle="Agent Dashboard" userRole="agent">
              <AgentDashboardPage />
            </DashboardLayout>
          } />
          <Route path="/agent/properties" element={
            <DashboardLayout pageTitle="Assigned Properties" userRole="agent">
              <AgentPropertiesPage />
            </DashboardLayout>
          } />
          <Route path="/agent/leads" element={
            <DashboardLayout userRole="agent">
              <AgentLeadsPage />
            </DashboardLayout>
          } />
          <Route path="/agent/messages" element={
            <DashboardLayout userRole="agent">
              <AgentMessagesPage />
            </DashboardLayout>
          } />
          <Route path="/agent/conversation/:leadId" element={
            <DashboardLayout userRole="agent">
              <AgentConversationPage />
            </DashboardLayout>
          } />
          <Route path="/agent/viewings" element={
            <DashboardLayout userRole="agent">
              <AgentViewingsPage />
            </DashboardLayout>
          } />
          <Route path="/agent/profile" element={
            <DashboardLayout userRole="agent">
              <AgentProfilePage />
            </DashboardLayout>
          } />
          <Route path="/agent/settings" element={
            <DashboardLayout userRole="agent">
              <AgentSettingsPage />
            </DashboardLayout>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/login" replace />} />
          <Route path="/admin/login" element={<Navigate to="/login" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/properties" element={<AdminPropertiesPage />} />
          <Route path="/admin/properties/:propertyId" element={<AdminPropertyDetailPage />} />
          <Route path="/admin/properties/:propertyId/edit" element={<AdminEditPropertyPage />} />
          <Route path="/admin/owners" element={<AdminOwnersPage />} />
          <Route path="/admin/owners/:ownerId" element={<AdminOwnerDetailPage />} />
          <Route path="/admin/agents" element={<AdminAgentsPage />} />
          <Route path="/admin/agents/:agentId" element={<AdminAgentDetailPage />} />
          <Route path="/admin/agents/:agentId/properties" element={<AdminAgentPropertiesPage />} />
          <Route path="/admin/agents/:agentId/leads" element={<AdminAgentLeadsPage />} />
          <Route path="/admin/tenants" element={<AdminTenantsPage />} />
          <Route path="/admin/tenants/:tenantId" element={<AdminTenantDetailPage />} />
          <Route path="/admin/assignments" element={<AdminAssignmentsPage />} />
          <Route path="/admin/service-requests" element={<AdminServiceRequestsPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />

          {/* Regular Routes (With Navbar/Footer) */}
          <Route path="/" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <HomePage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/properties" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <PropertiesPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/property/:id" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <PropertyDetailPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/agents" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <AgentsPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/agent/:id" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <AgentDetailPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/list-property" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <ListPropertyPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <AboutPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <ContactPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/favorites" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <FavoritesPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/blog" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <BlogPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/blog/:slug" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <BlogPostPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/faq" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <FAQPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/terms" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <TermsPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/privacy" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <PrivacyPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/cookie-policy" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <CookiePolicyPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/verified-badge" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <VerifiedBadgePage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/login" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <LoginPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/signup" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <SignupPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          <Route path="/role-selection" element={
            <>
              <Navbar />
              <main className="flex-1 pt-20">
                <RoleSelectionPage />
              </main>
              <Footer />
              <WhatsAppFloat />
            </>
          } />
          {/* Catch-all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}