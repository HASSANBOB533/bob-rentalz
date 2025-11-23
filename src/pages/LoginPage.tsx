import bobLogo from 'figma:asset/c3cbe0198340d6bed05c69174ee79f3b6a4d8624.png';
import { Mail, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { supabase } from '../lib/supabase';

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: LoginFormValues) => {
    console.log('Login form submitted', { email: values.email });
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });

      console.log('Supabase auth response:', { data, error: authError });

      if (authError) {
        console.error('Auth error:', authError);
        setError(authError.message);
        return;
      }

      if (!data.user) {
        console.error('No user returned from auth');
        setError('Login failed - no user data returned');
        return;
      }

      console.log('User authenticated:', data.user.id);

      // Get user profile to determine role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      console.log('Profile fetch result:', { profile, error: profileError });

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        // Still redirect to default dashboard if profile fetch fails
        navigate('/dashboard');
        return;
      }

      // Redirect based on role
      console.log('Redirecting based on role:', profile?.role);
      if (profile?.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (profile?.role === 'owner') {
        navigate('/owner/dashboard');
      } else if (profile?.role === 'agent') {
        navigate('/agent/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Unexpected error during login:', err);
      setError('An unexpected error occurred. Please try again.');
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
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-3">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#2B5273]">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                autoComplete="email"
                disabled={isSubmitting}
                {...register('email', { required: true })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#2B5273]">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-10"
                autoComplete="current-password"
                disabled={isSubmitting}
                {...register('password', { required: true })}
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
              {error}
            </div>
          )}

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
            disabled={isSubmitting}
            onClick={(e) => {
              console.log('Button clicked!');
              // Let form handle submission naturally
            }}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              backgroundColor: '#2B5273',
              color: 'white',
              borderRadius: '0.5rem',
              fontWeight: '600',
              fontSize: '1rem',
              border: 'none',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.6 : 1,
              transition: 'all 0.2s',
              display: 'block',
              visibility: 'visible',
            }}
            onMouseOver={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#1F3D54';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#2B5273';
            }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
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
