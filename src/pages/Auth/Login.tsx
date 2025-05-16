import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import Alert from '@/components/ui/Alert';
import { bounceAnimation, logoAnimation } from '@/lib/utils';
import logo from '../../assets/copyelite-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeSwitcher from '@/components/Layouts/DarkModeSwitcher';
import GTranslateProvider from '@/components/ui/GTranslateProvider';

// Placeholder types for form state and errors
interface LoginFormState {
  emailOrUsername: string;
  password: string;
  rememberMe: boolean;
}

interface LoginErrors {
  emailOrUsername?: string;
  password?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormState>({
    emailOrUsername: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [showPassword, setShowPassword] = useState(false);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Email or username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Placeholder for actual API call
      const response = await fetch(`${url}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Handle successful login
      setSubmitStatus('success');

      // Redirect or handle successful login
      setTimeout(() => {
        navigate('/verify-otp', {
          state: { ...formData, pageType: 'login-verification' },
        });
      }, 2000);
    } catch (error) {
      // Handle login error
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);

      // Reset error status after 5 seconds
      if (submitStatus === 'error') {
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // Clear corresponding error when user starts typing
    if (errors[name as keyof LoginErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-5 overflow-hidden bg-gray-50 dark:bg-bodydark">
      {/* Left Side - Marketing Content */}
      <div className="md:col-span-2 relative bg-bodydark hidden md:flex flex-col justify-center">
        <div className="absolute top-0 left-0 z-[4] w-full h-full bg-gradient-to-b from-brandblue/30 via-brandblue/10 to-bodydark"></div>

        {/* Spinning ProTrader logo in top-left */}
        <div className="absolute top-[650px] -left-20 overflow-hidden w-[560px] h-[560px] -translate-x-1/2 -translate-y-1/2 opacity-60">
          <motion.img
            src="https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/market-transaction-animation.webp"
            alt="ProTrader Logo"
            className="w-full h-full"
            animate={logoAnimation}
          />
        </div>

        <div className="absolute z-10 top-0 left-0 pt-10 lg:px-20 px-5 flex flex-col gap-6">
          {/* Logo Placeholder */}
          <Link to="/" className="">
            <img src={logo} alt="logo" className="w-35" />
          </Link>

          <p className="text-gray-300 text-sm mt-5 leading-6 max-w-60">
            Welcome back to Interactive CopyElite. Login and embrace endless
            possibilities
          </p>

          <motion.div className="flex" animate={bounceAnimation}>
            <img
              src="https://protradercopy.com/static/images/about/startingright.png"
              alt="Login"
              className="w-[80%]"
            />
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="md:col-span-3 col-span-5 p-8 space-y-6">
        <div className="flex items-center justify-end gap-3">
          <Link to="/register" className="text-sm font-semibold text-brandblue">
            Register
          </Link>

          <GTranslateProvider />
          <DarkModeSwitcher />
        </div>
        <div className="w-full max-w-100 mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Login
          </h2>
          <p className="text-gray-500 text-sm dark:text-gray-500 mb-6">
            Access your CopyElite account
          </p>

          {/* Google Login Button */}
          <button className="w-full font-medium flex items-center justify-center bg-white dark:bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white rounded-md py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <FcGoogle className="mr-3 text-2xl" />
            Login with Google
          </button>

          <div className="flex items-center my-5">
            <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
            <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">
              OR
            </span>
            <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email/Username Field */}
            <div>
              <label htmlFor="emailOrUsername" className="inputLabel">
                Email or Username
              </label>
              <input
                type="text"
                id="emailOrUsername"
                name="emailOrUsername"
                value={formData.emailOrUsername}
                onChange={handleChange}
                placeholder="Enter your email or username"
                className={`w-full px-4 py-2 rounded-md border text-sm ${
                  errors.emailOrUsername
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
                } bg-white dark:bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 placeholder:opacity-50`}
              />
              {errors.emailOrUsername && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailOrUsername}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="inputLabel">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-brandblue hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-2 rounded-md border text-sm ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
                  } bg-white dark:bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 placeholder:opacity-50 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center flex-wrap">
              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <p className="text-sm font-medium pb-[3px] text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="text-brandblue hover:underline">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Alert Messages */}
            {submitStatus === 'success' && (
              <Alert
                type="success"
                message="Login successful! Redirecting to dashboard..."
              />
            )}
            {submitStatus === 'error' && (
              <Alert
                type="error"
                message="Invalid email/username or password. Please try again."
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="font-semibold w-full hover:bg-blue-600 bg-brandblue text-white py-2 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              {isSubmitting ? <span>Processing...</span> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
