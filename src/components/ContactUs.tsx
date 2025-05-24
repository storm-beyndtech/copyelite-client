import React, { useState } from 'react';
import Alert from './ui/Alert';
import { Loader } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
      const res = await fetch(`${url}/utils/contact-us`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Handle non-OK responses
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An error occurred');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  return (
    <section className="py-10 relative z-10">
      <div className="max-w-3xl mx-auto bg-gray-900/40 rounded-xl shadow-lg border border-gray-800 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-500 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border bg-gray-900/70 ${
                  errors.name
                    ? 'border-red-300'
                    : 'border-blue-700/40 placeholder:opacity-20'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="Your name"
              />
              {errors.name && (
                <div className="mt-2">
                  <Alert type="error" message={errors.name} />
                </div>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-500 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border bg-gray-900/70 ${
                  errors.email
                    ? 'border-red-300'
                    : 'border-blue-700/40 placeholder:opacity-20'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <div className="mt-2">
                  <Alert type="error" message={errors.email} />
                </div>
              )}
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-500 mb-1"
            >
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border bg-gray-900/70 ${
                errors.subject
                  ? 'border-red-300'
                  : 'border-blue-700/40 placeholder:opacity-20'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors `}
            >
              <option value="">Select a subject</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Billing Question">Billing Question</option>
              <option value="Partnership">Partnership Opportunity</option>
              <option value="Feedback">Feedback</option>
            </select>
            {errors.subject && (
              <div className="mt-2">
                <Alert type="error" message={errors.subject} />
              </div>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-500 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border  bg-gray-900/70 ${
                errors.message
                  ? 'border-red-300'
                  : 'border-blue-700/40 placeholder:opacity-20'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none`}
              placeholder="How can we help you?"
            ></textarea>
            {errors.message && (
              <div className="mt-2">
                <Alert type="error" message={errors.message} />
              </div>
            )}
          </div>

          {/* Alert Messages */}
          {submitStatus === 'success' && (
            <Alert
              type="success"
              message="Message Sent Successfully! We'll get back to you ASAP."
            />
          )}
          {submitStatus === 'error' && (
            <Alert
              type="error"
              message="There was an error sending your message. Please try again."
            />
          )}
          {/* Submit Button */}
          <div className="mt-8 flex">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full max-w-80 sm:mx-auto bg-brandblue text-white font-semibold p-4 py-2 rounded-lg ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader className="mr-4" />
                  Processing...
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
