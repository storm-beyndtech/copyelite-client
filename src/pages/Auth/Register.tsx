import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import Alert from '@/components/ui/Alert';
import { bounceAnimation } from '@/lib/utils';
import logo from '../../assets/copyelite-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeSwitcher from '@/components/Layouts/DarkModeSwitcher';
import GTranslateProvider from '@/components/ui/GTranslateProvider';
import { GoogleLogin } from '@react-oauth/google';
import { contextData } from '@/context/AuthContext';

// Placeholder types for form state and errors
interface RegistrationFormState {
  username: string;
  email: string;
  password: string;
  referredBy: string;
  termsAccepted: boolean;
}

interface RegistrationErrors {
  username?: string;
  email?: string;
  password?: string;
  termsAccepted?: string;
}

const Register: React.FC = () => {
  const { login } = contextData();
  const [formData, setFormData] = useState<RegistrationFormState>({
    username: '',
    email: '',
    password: '',
    referredBy: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [showPassword, setShowPassword] = useState(false);
  const isLocalhost =
    typeof window !== 'undefined' && window.location.hostname === 'localhost';
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  // Validation function placeholder
  const validateForm = (): boolean => {
    const newErrors: RegistrationErrors = {};

    // Username validation - matches backend schema (min 3, max 20)
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    } else if (formData.username.length > 20) {
      newErrors.username = 'Username must not exceed 20 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Email validation - matches backend schema (min 5, max 225)
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (formData.email.length < 5) {
      newErrors.email = 'Email must be at least 5 characters long';
    } else if (formData.email.length > 225) {
      newErrors.email = 'Email must not exceed 225 characters';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation - matches backend schema (min 5, max 20)
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters long';
    } else if (formData.password.length > 20) {
      newErrors.password = 'Password must not exceed 20 characters';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    const signupData = {
      email: formData.email,
      username: formData.username,
    };
    const bodyData = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      referredBy: formData.referredBy,
    };
    try {
      // Placeholder for actual API call
      const response = await fetch(`${url}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitStatus('error');

        // Parse error message to determine which field it belongs to
        const errorMessage = data.message || 'Registration failed. Please try again.';
        const newErrors: RegistrationErrors = {};

        if (errorMessage.toLowerCase().includes('username')) {
          newErrors.username = errorMessage;
        } else if (errorMessage.toLowerCase().includes('email')) {
          newErrors.email = errorMessage;
        } else if (errorMessage.toLowerCase().includes('password')) {
          newErrors.password = errorMessage;
        } else {
          // Generic error - show on email field as fallback
          newErrors.email = errorMessage;
        }

        setErrors(newErrors);

        // Reset error state after 7 seconds to allow retry
        setTimeout(() => {
          setErrors({});
          setSubmitStatus('idle');
        }, 7000);

        return;
      }

      // Handle successful registration
      setSubmitStatus('success');

      // Navigate immediately without unnecessary delay
      setTimeout(() => {
        navigate('/verify-otp', {
          state: { ...bodyData, pageType: 'register-verification' },
        });
      }, 500);
    } catch (error: any) {
      // Handle network/unexpected errors
      setSubmitStatus('error');
      setErrors({
        email: error.message || 'Network error. Please check your connection and try again.'
      });

      // Reset error state after 7 seconds to allow retry
      setTimeout(() => {
        setErrors({});
        setSubmitStatus('idle');
      }, 7000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    // Special handling for checkbox
    const finalValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // Real-time validation for better UX
    const newErrors: RegistrationErrors = { ...errors };

    if (name === 'username' && value) {
      if (value.length < 3) {
        newErrors.username = 'Username must be at least 3 characters long';
      } else if (value.length > 20) {
        newErrors.username = 'Username must not exceed 20 characters';
      } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        newErrors.username = 'Username can only contain letters, numbers, and underscores';
      } else {
        delete newErrors.username;
      }
    } else if (name === 'email' && value) {
      if (value.length < 5) {
        newErrors.email = 'Email must be at least 5 characters long';
      } else if (value.length > 225) {
        newErrors.email = 'Email must not exceed 225 characters';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.email = 'Invalid email format';
      } else {
        delete newErrors.email;
      }
    } else if (name === 'password' && value) {
      if (value.length < 5) {
        newErrors.password = 'Password must be at least 5 characters long';
      } else if (value.length > 20) {
        newErrors.password = 'Password must not exceed 20 characters';
      } else {
        delete newErrors.password;
      }
    } else if (name === 'termsAccepted') {
      delete newErrors.termsAccepted;
    }

    setErrors(newErrors);
  };

  //Google login success
  const onSuccessHandler = async ({ credential }: any) => {
    const res = await fetch(`${url}/users/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credential }),
    });

    const data = await res.json();
    if (res.ok) {
      login(data.user, data.token);
      navigate('/dashboard');
    } else {
      setSubmitStatus('error');
      setErrors({
        email: data.message || 'Google login failed. Please try again.'
      });

      // Reset error state after 7 seconds to allow retry
      setTimeout(() => {
        setErrors({});
        setSubmitStatus('idle');
      }, 7000);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-5 overflow-hidden bg-gray-50 dark:bg-bodydark">
      {/* Left Side - Marketing Content */}
      <div className="md:col-span-2 relative bg-bodydark hidden md:flex flex-col justify-center">
        <div className="absolute top-0 left-0 z-[4] w-full h-full bg-gradient-to-b from-brandblue/30 via-brandblue/10 to-bodydark"></div>

        <div className="absolute z-10 top-0 left-0 pt-10 lg:pl-10 pl-5 flex flex-col gap-6">
          {/* Logo Placeholder */}
          <Link to="/" className="">
            <img src={logo} alt="logo" className="w-35" />
          </Link>

          <p className="text-gray-300 text-sm mt-10 leading-6 max-w-80">
            Join Interactive CopyElite today and start earning with expert
            traders in Stocks, ETFs, Options, Fixed Income & Futures
          </p>

          <motion.div className="flex" animate={bounceAnimation}>
            <img
              src="https://res.cloudinary.com/ddb1vjioq/image/upload/v1747727915/Adobe_Express_-_file_6_aore83.png"
              alt="Register"
              className="w-[100%]"
            />
          </motion.div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="md:col-span-3 col-span-5 p-4 sm:p-8 space-y-6">
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <Link to="/login" className="text-xs sm:text-sm font-semibold text-brandblue">
            Login
          </Link>

          <GTranslateProvider />
          <DarkModeSwitcher />
        </div>
        <div className="w-full max-w-100 mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
            Sign Up
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm dark:text-gray-500 mb-6">
            Join the community and unleash endless possibilities
          </p>

          {!isLocalhost ? (
            <GoogleLogin
              onSuccess={onSuccessHandler}
              onError={() => {
                setSubmitStatus('error');
              }}
            />
          ) : (
            <div className="text-xs text-gray-500">
              Google login disabled on localhost
            </div>
          )}

          <div className="flex items-center my-5">
            <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
            <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">
              OR
            </span>
            <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username and Email in the same line */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="inputLabel">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className={`w-full px-4 py-2 rounded-md border text-sm ${
                    errors.username
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
                  } bg-white dark:bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 placeholder:opacity-50`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="inputLabel">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  className={`w-full px-4 py-2 rounded-md border text-sm ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
                  } bg-white dark:bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 placeholder:opacity-50`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="inputLabel">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
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

            {/* Terms & Conditions Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mr-2 rounded text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="termsAccepted"
                className="text-xs tracking-tight font-medium text-gray-500 dark:text-gray-300"
              >
                I've read and accept the{' '}
                <Link to="/terms-and-conditions" className="text-brandblue">
                  Terms & Conditions
                </Link>{' '}
                with{' '}
                <Link to="/privacy-policy" className="text-brandblue">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
            )}

            {/* Alert Messages */}
            {submitStatus === 'success' && (
              <Alert
                type="success"
                message="Registration Successful! Redirecting to verification..."
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="font-semibold w-full hover:bg-blue-600 bg-brandblue text-white py-2 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              {isSubmitting ? <span>Processing...</span> : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
