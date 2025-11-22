// FILE 9 — ROLE-BASED ROUTE PROTECTION
// -------------------------------------

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase, getCurrentRole } from '../../lib/supabase/api';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: Array<'admin' | 'owner' | 'agent' | 'tenant'>;
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        setLoggedIn(false);
        setRole(null);
        setLoading(false);
        return;
      }

      setLoggedIn(true);
      const userRole = await getCurrentRole();
      setRole(userRole);
      setLoading(false);
    }

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  // -----------------------------
  // 1️⃣ USER NOT LOGGED IN
  // -----------------------------
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  // -----------------------------
  // 2️⃣ USER LOGGED IN BUT WRONG ROLE
  // -----------------------------
  if (role && !allowedRoles.includes(role as any)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // -----------------------------
  // 3️⃣ ACCESS GRANTED
  // -----------------------------
  return children;
}
