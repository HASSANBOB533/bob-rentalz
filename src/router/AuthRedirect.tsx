import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase, getCurrentRole } from '../lib/supabase/api';

interface AuthRedirectProps {
  children: React.ReactNode;
}

/**
 * AuthRedirect component prevents logged-in users from accessing auth pages
 * If user is logged in, redirects to their dashboard based on role
 * If user is not logged in, shows the auth page (login/signup)
 */
export default function AuthRedirect({ children }: AuthRedirectProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        // User is logged in, determine redirect path based on role
        const role = await getCurrentRole();
        const dashboardPath = role ? `/dashboard/${role}` : '/';
        setRedirectPath(dashboardPath);
        setIsAuthenticated(true);
      } else {
        // User is not logged in, show auth page
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  // If authenticated, redirect to dashboard
  if (isAuthenticated && redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  // Not authenticated, show the auth page
  return <>{children}</>;
}
