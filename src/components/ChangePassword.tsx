import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function ChangePassword () {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // @ts-ignore
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Current password validation
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      valid = false;
    }

    // New password validation
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
      valid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
      valid = false;
    }

    // Confirm password validation
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

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form after successful password change
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      alert('Password updated successfully!');
    } catch (error) {
      console.error('Password update failed:', error);
      alert('Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-white mb-6">Change Password</h2>

      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 border ${
              errors.currentPassword ? 'border-red-500' : 'border-gray-700'
            } rounded-md text-white`}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currentPassword}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 border ${
              errors.newPassword ? 'border-red-500' : 'border-gray-700'
            } rounded-md text-white`}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
            } rounded-md text-white`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center"
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="mr-2 animate-spin" />{' '}
                Updating...
              </>
            ) : (
              'Update Password'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};