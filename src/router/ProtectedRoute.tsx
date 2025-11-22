import { useEffect, useState, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../lib/supabase/api';

interface ProtectedRouteProps {
  children: ReactElement;
  roles?: string[]; // ["admin"], ["owner", "agent"], etc.
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    async function check() {
      const role = await api.auth.getCurrentRole();
      if (!role) return setAllowed(false);

      if (roles && !roles.includes(role)) return setAllowed(false);

      setAllowed(true);
    }
    check();
  }, [roles]);

  if (allowed === null) return <div>Loading...</div>;
  if (allowed === false) return <Navigate to="/login" replace />;

  return children;
}
