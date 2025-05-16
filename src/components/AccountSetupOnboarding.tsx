import { useState } from 'react';
import { ChevronLeft, Info, Check, Loader } from 'lucide-react';
import { AnimatedSection } from './ui/animated-section';
import Logo from '../assets/copyelite-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import Alert from './ui/Alert';
import GTranslateProvider from './ui/GTranslateProvider';
import { contextData } from '@/context/AuthContext';

// Types for our form sections
type FormSection = {
  id: string;
  title: string;
  progress: number;
  fields: FormField[];
  isCompleted: boolean;
};

type FormField = {
  id: string;
  label: string;
  type: string;
  required: boolean;
  value: string;
  placeholder?: string;
  options?: string[];
};

const AccountSetupOnboarding = () => {
  // Current active section index
  const [activeSection, setActiveSection] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, user } = contextData();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  // Form data for all sections
  const [formSections, setFormSections] = useState<FormSection[]>([
    {
      id: 'personal-info',
      title: 'Personal Information',
      progress: 0,
      isCompleted: false,
      fields: [
        {
          id: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          value: 'Mr',
        },
        {
          id: 'firstName',
          label: 'First Name',
          type: 'text',
          required: true,
          value: 'Victor',
        },
        {
          id: 'surname',
          label: 'Surname/Lastname',
          type: 'text',
          required: true,
          value: 'Nwachukwu',
        },
        {
          id: 'dob',
          label: 'Date of Birth (dd/mm/yyyy)',
          type: 'text',
          required: true,
          value: '29/07/1990',
        },
      ],
    },
    {
      id: 'contact-address',
      title: 'Contact and Address Information',
      progress: 16,
      isCompleted: false,
      fields: [
        {
          id: 'houseNo',
          label: 'House No.',
          type: 'text',
          required: true,
          value: '40',
        },
        {
          id: 'streetAddress',
          label: 'Street Address',
          type: 'text',
          required: true,
          value: '447 Broadway, 2nd floor',
        },
        {
          id: 'city',
          label: 'City/Town/Village',
          type: 'text',
          required: true,
          value: '',
        },
        {
          id: 'province',
          label: 'Province',
          type: 'text',
          required: true,
          value: '',
        },
        {
          id: 'zipCode',
          label: 'Zip Code / Postal Code',
          type: 'text',
          required: true,
          value: '',
        },
        {
          id: 'phoneNo',
          label: 'Phone No.',
          type: 'text',
          required: true,
          value: '',
        },
      ],
    },
    {
      id: 'trading-experience',
      title: 'Trading Experience',
      progress: 39,
      isCompleted: false,
      fields: [
        {
          id: 'yearsTrading',
          label: 'Years of Trading Experience',
          type: 'select',
          required: true,
          value: '3-5 years',
          options: [
            'Less than 1 year',
            '1-3 years',
            '3-5 years',
            '5-10 years',
            'Over 10 years',
          ],
        },
        {
          id: 'tradingFrequency',
          label: 'Trading Frequency',
          type: 'select',
          required: true,
          value: 'Daily',
          options: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Occasionally'],
        },
        {
          id: 'instruments',
          label: 'Instruments Traded',
          type: 'text',
          required: true,
          value: 'Forex, Stocks, Commodities',
        },
        {
          id: 'knowledgeLevel',
          label: 'Knowledge Level',
          type: 'select',
          required: true,
          value: 'Intermediate',
          options: [
            'Beginner',
            'Intermediate',
            'Advanced',
            'Expert',
            'Professional',
          ],
        },
        {
          id: 'preferredMarkets',
          label: 'Preferred Markets',
          type: 'select',
          required: true,
          value: 'Forex',
          options: [
            'Forex',
            'Stocks',
            'Commodities',
            'Indices',
            'Cryptocurrencies',
          ],
        },
        {
          id: 'tradingPlatforms',
          label: 'Trading Platforms Used',
          type: 'select',
          required: true,
          value: 'MetaTrader 4',
          options: [
            'MetaTrader 4',
            'MetaTrader 5',
            'cTrader',
            'TradingView',
            'Other',
          ],
        },
      ],
    },
    {
      id: 'annual-earnings',
      title: 'Annual Earnings',
      progress: 58,
      isCompleted: false,
      fields: [
        {
          id: 'annualIncome',
          label: 'Annual Income (USD)',
          type: 'select',
          required: true,
          value: '100k - 200k',
          options: [
            'Under 50k',
            '50k - 100k',
            '100k - 200k',
            '200k - 500k',
            'Over 500k',
          ],
        },
        {
          id: 'incomeSource',
          label: 'Primary Source of Income',
          type: 'select',
          required: true,
          value: '',
          options: [
            'Employment',
            'Self-Employment',
            'Investments',
            'Trading Profits',
            'Other',
          ],
        },
        {
          id: 'taxResidency',
          label: 'Country of Tax Residency',
          type: 'text',
          required: true,
          value: 'United States',
        },
      ],
    },
    {
      id: 'client-declaration',
      title: 'Client Declaration',
      progress: 92,
      isCompleted: false,
      fields: [],
    },
  ]);

  // Handle field change
  const handleFieldChange = (
    sectionIndex: number,
    fieldId: string,
    value: string,
  ) => {
    const updatedSections = [...formSections];
    const fieldIndex = updatedSections[sectionIndex].fields.findIndex(
      (field) => field.id === fieldId,
    );
    if (fieldIndex !== -1) {
      updatedSections[sectionIndex].fields[fieldIndex].value = value;
      setFormSections(updatedSections);
    }
  };

  // Check if current section is valid (all required fields filled)
  const isSectionValid = (sectionIndex: number) => {
    const section = formSections[sectionIndex];

    if (section.id === 'client-declaration') {
      return true; // No fields to validate in declaration
    }

    return section.fields.every(
      (field) => !field.required || field.value.trim() !== '',
    );
  };

  // Navigate to next section
  const handleNext = () => {
    if (
      activeSection < formSections.length - 1 &&
      isSectionValid(activeSection)
    ) {
      // Mark current section as completed
      const updatedSections = [...formSections];
      updatedSections[activeSection].isCompleted = true;
      setFormSections(updatedSections);

      // Move to next section
      setActiveSection((prev) => prev + 1);

      // Scroll to top
      window.scrollTo(0, 0);
    }
  };

  // Navigate to previous section
  const handleBack = () => {
    if (activeSection > 0) {
      setActiveSection((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle final submission
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate all sections before submitting
      const isValid = formSections.every((section) => {
        if (section.id === 'client-declaration') return true;
        return section.fields.every(
          (field) => !field.required || field.value.trim() !== '',
        );
      });

      if (!isValid) {
        setError(
          'Please complete all required fields in all sections before submitting.',
        );
        setIsLoading(false);
        return;
      }

      // Format form data for API submission
      const formData = formSections.reduce(
        (data, section) => {
          section.fields.forEach((field) => {
            data[field.id] = field.value;
          });
          return data;
        },
        {} as Record<string, string>,
      );

      console.log(formData);

      // Submit to API
      const response = await fetch(`${url}/users/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, email: user.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Failed to complete account setup',
        );
      }

      // On success
      const data = await response.json();

      // Navigate to dashboard
      login(data.user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderProgressBar = () => {
    const progress = formSections[activeSection].progress;

    return (
      <div className="w-full bg-gray-700 h-1 mt-4 mb-6 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  // Render form fields for the current section
  const renderFields = () => {
    const currentSection = formSections[activeSection];

    if (currentSection.id === 'client-declaration') {
      return (
        <AnimatedSection delay={0.3}>
          <div className="mt-6 text-gray-300">
            <p>
              By pressing the "SUBMIT" button below, I hereby confirm and
              acknowledge that the information provided above is true accurate,
              and I further confirm and acknowledge that Copyelite will
              rely on this information in the opening of my trading account
            </p>
          </div>
        </AnimatedSection>
      );
    }

    return currentSection.fields
      .map((field, index) => (
        <AnimatedSection key={field.id} delay={index * 0.3}>
          <div className="mb-4 md:flex md:flex-row md:gap-4">
            {index % 2 === 0 && index < currentSection.fields.length - 1 ? (
              <>
                <div className="mb-4 md:mb-0 md:w-1/2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'select' ? (
                    <div className="relative">
                      <select
                        className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={field.value}
                        onChange={(e) =>
                          handleFieldChange(
                            activeSection,
                            field.id,
                            e.target.value,
                          )
                        }
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={field.placeholder || `Enter ${field.label}`}
                      value={field.value}
                      onChange={(e) =>
                        handleFieldChange(
                          activeSection,
                          field.id,
                          e.target.value,
                        )
                      }
                      required={field.required}
                    />
                  )}
                </div>
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {currentSection.fields[index + 1].label}
                    {currentSection.fields[index + 1].required && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  {currentSection.fields[index + 1].type === 'select' ? (
                    <div className="relative">
                      <select
                        className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={currentSection.fields[index + 1].value}
                        onChange={(e) =>
                          handleFieldChange(
                            activeSection,
                            currentSection.fields[index + 1].id,
                            e.target.value,
                          )
                        }
                      >
                        <option value="">
                          Select {currentSection.fields[index + 1].label}
                        </option>
                        {currentSection.fields[index + 1].options?.map(
                          (option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                  ) : (
                    <input
                      type={currentSection.fields[index + 1].type}
                      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={
                        currentSection.fields[index + 1].placeholder ||
                        `Enter ${currentSection.fields[index + 1].label}`
                      }
                      value={currentSection.fields[index + 1].value}
                      onChange={(e) =>
                        handleFieldChange(
                          activeSection,
                          currentSection.fields[index + 1].id,
                          e.target.value,
                        )
                      }
                      required={currentSection.fields[index + 1].required}
                    />
                  )}
                </div>
              </>
            ) : (
              index % 2 === 0 && (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'select' ? (
                    <div className="relative">
                      <select
                        className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={field.value}
                        onChange={(e) =>
                          handleFieldChange(
                            activeSection,
                            field.id,
                            e.target.value,
                          )
                        }
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={field.placeholder || `Enter ${field.label}`}
                      value={field.value}
                      onChange={(e) =>
                        handleFieldChange(
                          activeSection,
                          field.id,
                          e.target.value,
                        )
                      }
                      required={field.required}
                    />
                  )}
                </div>
              )
            )}
          </div>
        </AnimatedSection>
      ))
      .filter((_, index) => index % 2 === 0);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Header & Logo */}
      <div className="bg-black py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center mr-2">
            <div className="w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center text-xs font-bold">
              0
            </div>
            <div className="w-6 h-6 rounded-full bg-transparent border border-gray-600 ml-2 flex items-center justify-center">
              <div className="bg-gray-600 w-4 h-4 rounded-full" />
            </div>
          </div>
          <GTranslateProvider />
          <button className="text-white bg-transparent px-2 py-1.5 border border-gray-700 rounded">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row px-4 py-8 gap-8">
        {/* Left Form Panel */}
        <div className="w-full md:w-2/3 bg-gray-800 rounded-lg p-6 shadow-lg">
          <AnimatedSection>
            <h2 className="text-white text-xl font-semibold mb-2">
              {formSections[activeSection].title}
            </h2>
          </AnimatedSection>

          {renderProgressBar()}

          <div className="flex items-center mb-6 text-cyan-400">
            <Info size={20} />
            <span className="ml-2 text-sm text-gray-300">
              In order to start trading, you must first complete your profile.
            </span>
          </div>

          <div className="border-t border-gray-700 py-4">
            {error && (
              <AnimatedSection>
                <Alert type="error" message={error} />
              </AnimatedSection>
            )}
            {renderFields()}
          </div>

          <div className="flex justify-between mt-8">
            {activeSection > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center justify-center px-4 py-2 font-medium text-sm bg-transparent border border-cyan-500 text-cyan-400 rounded w-48 hover:bg-cyan-900 hover:bg-opacity-20 transition-colors"
              >
                <ChevronLeft size={18} />
                <span className="ml-2">Back</span>
              </button>
            )}
            {activeSection < formSections.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!isSectionValid(activeSection)}
                className={`ml-auto px-4 py-2 font-medium text-sm bg-cyan-500 text-white rounded w-48 transition-all 
                  ${
                    isSectionValid(activeSection)
                      ? 'hover:bg-cyan-600'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
              >
                NEXT
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading || !isSectionValid(activeSection)}
                className={`ml-auto px-4 py-2 font-medium text-sm bg-cyan-500 text-white rounded w-48 hover:bg-cyan-600 transition-colors flex items-center justify-center
                  ${
                    isLoading || !isSectionValid(activeSection)
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
              >
                {isLoading ? (
                  <>
                    <Loader size={16} className="animate-spin mr-2" />
                    SUBMITTING...
                  </>
                ) : (
                  'SUBMIT'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right Progress Panel */}
        <div className="w-full md:w-1/3 bg-gray-800 rounded-lg p-6 shadow-lg h-min">
          <h3 className="text-white text-lg font-semibold mb-4">
            Upload Account
          </h3>
          <ul className="space-y-4">
            {formSections.map((section, index) => (
              <li key={section.id} className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center mr-3
                  ${
                    section.isCompleted
                      ? 'bg-green-500'
                      : index === activeSection
                        ? 'bg-cyan-400'
                        : 'border border-gray-600'
                  }`}
                >
                  {section.isCompleted ? (
                    <Check size={14} className="text-white" />
                  ) : index === activeSection ? (
                    <div className="animate-pulse w-3 h-3 bg-white rounded-full" />
                  ) : null}
                </div>
                <span
                  className={`text-sm ${
                    section.isCompleted
                      ? 'text-white'
                      : index === activeSection
                        ? 'text-cyan-400'
                        : 'text-gray-400'
                  }`}
                >
                  {section.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountSetupOnboarding;
