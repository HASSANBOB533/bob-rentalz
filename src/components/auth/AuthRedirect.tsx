// FILE 10 — AuthRedirect.tsx
// Redirects user to the correct dashboard after login/signup

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase, getCurrentRole } from '../../lib/supabase/api';

export default function AuthRedirect() {
  const [checking, setChecking] = useState(true);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        setRedirectTo('/login');
        setChecking(false);
        return;
      }

      const role = await getCurrentRole();

      switch (role) {
        case 'admin':
          setRedirectTo('/dashboard/admin');
          break;
        case 'owner':
          setRedirectTo('/dashboard/owner');
          break;
        case 'agent':
          setRedirectTo('/dashboard/agent');
          break;
        case 'tenant':
          setRedirectTo('/dashboard/tenant');
          break;
        default:
          setRedirectTo('/login');
      }

      setChecking(false);
    }

    checkUser();
  }, []);

  if (checking) return <div>Checking session...</div>;

  return <Navigate to={redirectTo!} replace />;
}
