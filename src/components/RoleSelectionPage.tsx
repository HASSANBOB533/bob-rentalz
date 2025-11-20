import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Building2, Briefcase, Check } from 'lucide-react';
import { useState } from 'react';
import bobLogo from 'figma:asset/c3cbe0198340d6bed05c69174ee79f3b6a4d8624.png';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

export function RoleSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Get signup data from navigation state
  const { email, password, fullName } = location.state || {};

  // Redirect if no signup data
  if (!email || !password) {
    navigate('/signup');
    return null;
  }

  const roles = [
    {
      id: 'tenant',
      label: 'Tenant',
      subtext: 'I want to rent a property',
      icon: Home,
    },
    {
      id: 'owner',
      label: 'Owner',
      subtext: 'I want to list my property',
      icon: Building2,
    },
    {
      id: 'agent',
      label: 'Agent',
      subtext: 'I manage multiple listings',
      icon: Briefcase,
    },
  ];

  const handleContinue = async () => {
    if (!selectedRole) {
      toast.error('Please select a role');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(email, password, selectedRole, fullName);

      if (error) {
        toast.error(error.message || 'Failed to create account');
        setLoading(false);
        return;
      }

      toast.success('Account created successfully!');

      // Redirect based on role
      setTimeout(() => {
        if (selectedRole === 'admin') {
          navigate('/admin/dashboard');
        } else if (selectedRole === 'owner') {
          navigate('/owner/dashboard');
        } else if (selectedRole === 'agent') {
          navigate('/agent/dashboard');
        } else {
          navigate('/dashboard');
        }
      }, 1000);
    } catch (error: any) {
      toast.error('An error occurred during signup');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img 
              src={bobLogo} 
              alt="Best of Bedz Rentalz" 
              className="h-16 md:h-20 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0E56A4] mb-2 text-center">
            Choose Your Role
          </h1>
          <p className="text-gray-600 text-center">
            Select the type of account you want to create
          </p>
        </div>

        {/* Role Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`
                  relative p-6 rounded-xl border-2 transition-all duration-200
                  ${isSelected 
                    ? 'border-[#0E56A4] bg-[#0E56A4]/5 shadow-lg' 
                    : 'border-gray-200 bg-white hover:border-[#0E56A4]/50 hover:shadow-md'
                  }
                `}
                disabled={loading}
              >
                {/* Checkmark */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-[#0E56A4] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto
                  ${isSelected ? 'bg-[#0E56A4]' : 'bg-gray-100'}
                `}>
                  <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                </div>

                {/* Label */}
                <h3 className={`text-xl font-semibold mb-2 ${isSelected ? 'text-[#0E56A4]' : 'text-gray-900'}`}>
                  {role.label}
                </h3>
                <p className="text-sm text-gray-600">
                  {role.subtext}
                </p>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedRole || loading}
            className="px-8 py-3 bg-[#0E56A4] hover:bg-[#0C4A8D] text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Continue'}
          </Button>
        </div>

        {/* Back to Sign In */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0E56A4] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
