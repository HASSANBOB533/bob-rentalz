import bobLogo from 'figma:asset/c3cbe0198340d6bed05c69174ee79f3b6a4d8624.png';
import { Mail, Lock, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../contexts/AuthContext';

export function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Navigate to role selection with signup data
      navigate('/role-selection', {
        state: { email, password, fullName },
      });
    } catch (error: any) {
      toast.error('An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img
              src={bobLogo}
              alt="Best of Bedz Rentalz"
              className="h-16 md:h-20 w-auto mx-auto object-contain"
            />
          </Link>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
          {/* Title & Subtitle */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0E56A4] mb-2">
              Create an Account
            </h1>
            <p className="text-gray-600 text-[15px] sm:text-[16px]">
              Enter your details to get started
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div>
              <label
                htmlFor="fullname"
                className="block text-[14px] sm:text-[15px] font-medium text-gray-700 mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="pl-11 border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#0E56A4] focus:border-[#0E56A4] transition-all duration-200 w-full"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-[14px] sm:text-[15px] font-medium text-gray-700 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-11 border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#0E56A4] focus:border-[#0E56A4] transition-all duration-200 w-full"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-[14px] sm:text-[15px] font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-11 border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#0E56A4] focus:border-[#0E56A4] transition-all duration-200 w-full"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-[14px] sm:text-[15px] font-medium text-gray-700 mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-11 border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#0E56A4] focus:border-[#0E56A4] transition-all duration-200 w-full"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-[#0E56A4] focus:ring-[#0E56A4] border-gray-300 rounded mt-0.5"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-[#0E56A4] hover:underline">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-[#0E56A4] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#0E56A4] hover:bg-[#0C4A8D] text-white py-3 rounded-lg font-medium transition-all duration-200"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Continue to Role Selection'}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#0E56A4] font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
