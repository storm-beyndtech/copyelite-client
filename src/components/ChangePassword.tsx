import { contextData } from '@/context/AuthContext';
import { RefreshCw, Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';

const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [checkingPassword, setCheckingPassword] = useState(true);
  const [hasPassword, setHasPassword] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const { user } = contextData();

  // Check if user has a password on component mount
  useEffect(() => {
    const checkUserPassword = async () => {
      try {
        const response = await fetch(`${url}/users/check-password/${user._id}`);
        const data = await response.json();

        if (response.ok) {
          setHasPassword(data.hasPassword);
        }
      } catch (error) {
        console.error('Error checking password status:', error);
      } finally {
        setCheckingPassword(false);
      }
    };

    if (user?._id) {
      checkUserPassword();
    }
  }, [user?._id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    setSuccessMessage('');
    setServerError('');
  };

  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    // Only validate current password if user already has a password
    if (hasPassword && !formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      valid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
      valid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
      valid = false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setSuccessMessage('');
    setServerError('');

    try {
      const payload: any = {
        newPassword: formData.newPassword,
        id: user._id,
      };

      // Only include current password if user already has a password
      if (hasPassword) {
        payload.currentPassword = formData.currentPassword;
      }

      const response = await fetch(`${url}/users/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || 'Something went wrong');

      setSuccessMessage(result.message || 'Password updated successfully!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      // Update hasPassword state if it was a password creation
      if (!hasPassword) {
        setHasPassword(true);
      }
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (checkingPassword) {
    return (
      <div className="min-w-100 w-fit mx-auto bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 p-4">
        <div className="flex items-center justify-center py-8">
          <RefreshCw size={24} className="animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-100 w-fit mx-auto bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 p-4">
      <h2 className="text-xl font-semibold dark:text-white text-gray-800 mb-6">
        {hasPassword ? 'Change Password' : 'Create New Password'}
      </h2>

      {!hasPassword && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          You signed up via Google. Create a password to enable password login.
        </p>
      )}

      <div className="max-w-md">
        {serverError && (
          <p className="text-red-500 text-sm mb-4">{serverError}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}

        {hasPassword && (
          <InputField
            label="Current Password"
            name="currentPassword"
            value={formData.currentPassword}
            error={errors.currentPassword}
            onChange={handleChange}
            type={passwordVisibility.currentPassword ? 'text' : 'password'}
            onToggleVisibility={() => togglePasswordVisibility('currentPassword')}
            showPassword={passwordVisibility.currentPassword}
          />
        )}
        <InputField
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          error={errors.newPassword}
          onChange={handleChange}
          type={passwordVisibility.newPassword ? 'text' : 'password'}
          onToggleVisibility={() => togglePasswordVisibility('newPassword')}
          showPassword={passwordVisibility.newPassword}
        />
        <InputField
          label="Confirm New Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
          type={passwordVisibility.confirmPassword ? 'text' : 'password'}
          onToggleVisibility={() => togglePasswordVisibility('confirmPassword')}
          showPassword={passwordVisibility.confirmPassword}
        />

        <div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center"
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="mr-2 animate-spin" />{' '}
                {hasPassword ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              hasPassword ? 'Update Password' : 'Create Password'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Updated input field component with password toggle
function InputField({
  label,
  name,
  value,
  error,
  onChange,
  type,
  onToggleVisibility,
  showPassword,
}: {
  label: string;
  name: string;
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  onToggleVisibility: () => void;
  showPassword: boolean;
}) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-400 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-md text-white pr-10`}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          onClick={onToggleVisibility}
        >
          {showPassword ? (
            <EyeOff size={18} className="text-gray-400" />
          ) : (
            <Eye size={18} className="text-gray-400" />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
