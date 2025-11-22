import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { motion } from 'motion/react';
import { Mail, Lock } from 'lucide-react';
import bobLogo from 'figma:asset/c3cbe0198340d6bed05c69174ee79f3b6a4d8624.png';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        toast.error(error.message || 'Invalid email or password');
        setLoading(false);
        return;
      }

      // Get user profile to determine role
      const { user, profile } = useAuth();
      
      toast.success('Login successful!');
      
      // Redirect based on role
      setTimeout(() => {
        if (profile?.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (profile?.role === 'owner') {
          navigate('/owner/dashboard');
        } else if (profile?.role === 'agent') {
          navigate('/agent/dashboard');
        } else {
          navigate('/dashboard');
        }
      }, 500);
    } catch (error: any) {
      toast.error('An error occurred during login');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] to-[#E8DCC8] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2B5273] to-[#3A6B8F] p-4 text-center">
          <img src={bobLogo} alt="BOB Rentalz" className="h-12 mx-auto mb-2" />
          <h1 className="text-xl font-bold text-white">Welcome Back</h1>
          <p className="text-[#F5F1E8]/80 mt-1 text-sm">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#2B5273]">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="pl-10"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#2B5273]">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-[#2B5273] hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2B5273] hover:bg-[#1F3D54] text-white rounded-md px-4 py-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-[#2B5273] font-medium hover:underline">
              Sign up
            </a>
          </div>
        </form>

        {/* Demo Info */}
        <div className="bg-[#F5F1E8] p-2 border-t">
          <p className="text-xs text-center text-gray-600">
            <strong>Demo:</strong> Create an account or use test credentials
          </p>
        </div>
      </motion.div>
    </div>
  );
}
