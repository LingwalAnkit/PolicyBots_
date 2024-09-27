'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { ThemeToggle } from "../section/themeToggel";
import { useTheme } from '../app/context/themeContext';
import { validateEmail, validatePassword } from '../lib/validation';
import clsx from 'clsx';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
  mobileNo: string;
}

export const Header = () => {
  const { darkMode } = useTheme();
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);
  const openLoginModal = () => {
    closeSignUpModal();
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <header className={`sticky top-0 z-20 shadow-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-col items-center">
            <h1>Policy Bots</h1>
            <span className="ml-2 text-xs text-blue-600 font-semibold">HAR BOT HOGA INSURED</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <NavItem label="Insurance Products" items={['Car Insurance', 'Health Insurance', 'Life Insurance']} />
            <NavItem label="Renew Your Policy" items={['Car Policy', 'Health Policy', 'Life Policy']} />
            <NavItem label="Claim" items={['File a Claim', 'Track Claim', 'Claim FAQs']} />
            <NavItem label="FAQs" items={['Contact Us', 'FAQs', 'Help Center']} />
            <Link href="#">
              <button className={`border border-blue-500 text-blue-500 px-4 py-2 rounded font-medium transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white ${darkMode ? 'dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white' : ''}`}>
                Chat Bot
              </button>
            </Link>
            <button onClick={openSignUpModal} className={`border border-blue-500 text-blue-500 px-4 py-2 rounded font-medium transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white ${darkMode ? 'dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white' : ''}`}>
              Sign-Up
            </button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
      {isSignUpModalOpen && <SignUpModal onClose={closeSignUpModal} openLoginModal={openLoginModal} />}
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
    </header>
  );
};

interface NavItemProps {
  label: string;
  items: string[];
}

const NavItem = ({ label, items }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const { darkMode } = useTheme();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 80);
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownWidth(Math.max(rect.width, 256));
    }
  }, [label]);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button ref={buttonRef} className={`flex items-center hover:text-blue-600 ${darkMode ? 'dark:hover:text-blue-400' : ''}`}>
        {label}
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div
          className={`absolute top-full left-1/2 shadow-md rounded-md py-4 mt-6 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          style={{
            width: `${dropdownWidth}px`,
            transform: 'translateX(-50%)',
            right: '0px',
            maxWidth: 'calc(100vw - 100%)',
          }}
        >
          {items.map((item, index) => (
            <Link
              key={index}
              href="#"
              className={`block px-4 py-2 text-center whitespace-nowrap ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

interface SignUpModalProps {
  onClose: () => void;
  openLoginModal: () => void;
}

const SignUpModal = ({ onClose, openLoginModal }: SignUpModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    mobileNo: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const { darkMode } = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors: Partial<FormData> = {};
    if (!formData.firstName) errors.firstName = 'First Name is required';
    if (!formData.lastName) errors.lastName = 'Last Name is required';
    if (!validateEmail(formData.email)) errors.email = 'Invalid email';
    if (!validatePassword(formData.password)) errors.password = 'Password must be at least 6 characters';
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 0) errors.age = 'Valid age is required';
    if (!formData.mobileNo || isNaN(Number(formData.mobileNo))) errors.mobileNo = 'Valid mobile number is required';

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (result.success) {
          alert('User registered successfully');
          onClose();
          window.location.href = '/dashboard';
        } else {
          alert('Error registering user');
        }
      } catch (error) {
        alert('An error occurred during registration');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-lg shadow-lg w-1/3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <div className='flex justify-between gap-6'>
          <h2 className="text-xl font-bold mt-2 mb-2">Sign-Up</h2>
          <button onClick={openLoginModal} className={`text-xl mb-2 border px-4 py-2 rounded font-medium transition duration-300 ease-in-out ${darkMode ? 'border-gray-400 text-gray-400 hover:bg-gray-600 hover:text-gray-100' : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'}`}>
            Already Signed
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {['firstName', 'lastName', 'email', 'password', 'age', 'mobileNo'].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field as keyof FormData]}
                onChange={handleInputChange}
                className={`w-full border px-4 py-2 rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100'}`}
              />
              {formErrors[field as keyof FormData] && <p className="text-red-500 text-sm mt-1">{formErrors[field as keyof FormData]}</p>}
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="submit"
              className={`text-xl mb-2 border px-4 py-2 rounded font-medium transition duration-300 ease-in-out ${darkMode ? 'border-gray-400 text-gray-400 hover:bg-gray-600 hover:text-gray-100' : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'}`}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign-Up'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-red-500 text-red-500 px-4 py-2 rounded font-medium transition duration-300 ease-in-out hover:bg-red-500 hover:text-white dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-400 dark:hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
        <button onClick={onClose} className="absolute top-2 right-2">
          X
        </button>
      </div>
    </div>
  );
};

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const { darkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful');
        onClose();
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-lg shadow-lg w-1/3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <h2 className="text-xl font-bold mt-2 mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border px-4 py-2 rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100'}`}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border px-4 py-2 rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100'}`}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-between gap-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full border px-4 py-2 rounded font-medium transition duration-300 ease-in-out ${
                darkMode
                  ? 'border-gray-400 text-gray-400 hover:bg-gray-600 hover:text-gray-100'
                  : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-red-500 text-red-500 px-4 py-2 rounded font-medium transition duration-300 ease-in-out hover:bg-red-500 hover:text-white dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-400 dark:hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
        <button onClick={onClose} className="absolute top-2 right-2">
          X
        </button>
      </div>
    </div>
  );
};

export default LoginModal;