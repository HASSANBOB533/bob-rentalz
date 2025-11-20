import { Link } from 'react-router-dom';
import { Home, Building2, Briefcase, Check } from 'lucide-react';
import { useState } from 'react';
import bobLogo from 'figma:asset/c3cbe0198340d6bed05c69174ee79f3b6a4d8624.png';

export function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

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
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`
                  relative border rounded-xl p-6 bg-white shadow-sm
                  cursor-pointer transition-all duration-200
                  ${isSelected 
                    ? 'border-[#0E56A4] bg-[#0E56A4]/10 shadow-md' 
                    : 'border-gray-200 hover:border-[#0E56A4] hover:shadow-md hover:bg-[#0E56A4]/5'
                  }
                `}
              >
                {/* Selection Checkmark */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-[#0E56A4] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center mb-4
                  ${isSelected ? 'bg-[#0E56A4]' : 'bg-gray-100'}
                  transition-colors duration-200
                `}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-[#0E56A4]'}`} />
                </div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-[#0E56A4] mb-2">
                  {role.label}
                </h3>

                {/* Subtext */}
                <p className="text-gray-600 text-sm">
                  {role.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="flex flex-col items-center">
          <Link 
            to={selectedRole ? "/signup" : "#"}
            className="w-full max-w-md"
          >
            <button
              disabled={!selectedRole}
              className={`
                w-full py-3 rounded-xl font-medium
                transition-all duration-200
                ${selectedRole
                  ? 'bg-[#0E56A4] text-white hover:bg-[#0A3F79] shadow-sm hover:shadow-lg cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Continue
            </button>
          </Link>

          {/* Back Link */}
          <Link 
            to="/" 
            className="text-[#0E56A4] font-medium hover:text-[#0A3F79] mt-4 transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}