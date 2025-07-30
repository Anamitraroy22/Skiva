import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginSignupModal: React.FC<LoginSignupModalProps> = ({ isOpen, onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true); // true for Login, false for Signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Reset form states when modal opens/closes or view changes
  useEffect(() => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  }, [isOpen, isLoginView]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      if (email === 'test@example.com' && password === 'password123') {
        setSuccess('Login successful!');
        setTimeout(onClose, 1000); // Close modal after success
      } else {
        setError('Invalid email or password. (Simulated)');
      }
    } catch (err: any) {
      console.error("Simulated login error:", err);
      setError('An error occurred during login. (Simulated)');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      setSuccess('Account created successfully! You can now log in. (Simulated)');
      setTimeout(() => setIsLoginView(true), 1500); // Switch to login view after successful signup
    } catch (err: any) {
      console.error("Simulated signup error:", err);
      setError('An error occurred during signup. (Simulated)');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-md glass p-8 md:p-10 rounded-3xl shadow-lg border border-primary // Changed border-glass-border to border-primary
                       bg-site-bg bg-tech-lines bg-repeat bg-[length:400px_400px] overflow-hidden"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 text-foreground hover:bg-white/20 rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>

            <h2 className="text-3xl font-bold text-center mb-6 text-foreground">
              {isLoginView ? 'Login to Skiva' : 'Create Your Account'}
            </h2>
            <p className="text-center text-foreground-muted mb-8">
              {isLoginView ? 'Unlock your personalized travel experiences.' : 'Join Skiva and start your adventure!'}
            </p>

            {isLoginView ? (
              // Login Form
              <form onSubmit={handleEmailLogin} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  <Input
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder-foreground-muted focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  <Input
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder-foreground-muted focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    required
                  />
                </div>

                {error && <p className="text-destructive text-center text-sm">{error}</p>}
                {success && <p className="text-primary text-center text-sm">{success}</p>}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                  {loading ? 'Logging in...' : 'Login'}
                </Button>

                {/* Removed Google Sign-in section */}
                {/* <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-700"></div>
                  <span className="flex-shrink mx-4 text-foreground-muted text-sm">OR</span>
                  <div className="flex-grow border-t border-gray-700"></div>
                </div>

                <Button
                  type="button"
                  size="lg"
                  className="w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  {loading && !error ? <Loader2 className="animate-spin mr-2" /> : <Google className="w-5 h-5 mr-2" />}
                  Sign in with Google
                </Button> */}
              </form>
            ) : (
              // Signup Form
              <form onSubmit={handleEmailSignup} className="space-y-6">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    aria-label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder-foreground-muted focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  <Input
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder-foreground-muted focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  <Input
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder-foreground-muted focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    aria-label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder-foreground-muted focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    required
                  />
                </div>

                {error && <p className="text-destructive text-center text-sm">{error}</p>}
                {success && <p className="text-primary text-center text-sm">{success}</p>}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </Button>

                {/* Removed Google Sign-up section */}
                {/* <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-700"></div>
                  <span className="flex-shrink mx-4 text-foreground-muted text-sm">OR</span>
                  <div className="flex-grow border-t border-gray-700"></div>
                </div>

                <Button
                  type="button"
                  size="lg"
                  className="w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  {loading && !error ? <Loader2 className="animate-spin mr-2" /> : <Google className="w-5 h-5 mr-2" />}
                  Sign up with Google
                </Button> */}
              </form>
            )}

            <p className="text-center text-foreground-muted text-sm mt-6">
              {isLoginView ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLoginView(false)}
                    className="text-primary hover:underline font-semibold"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLoginView(true)}
                    className="text-primary hover:underline font-semibold"
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginSignupModal;
