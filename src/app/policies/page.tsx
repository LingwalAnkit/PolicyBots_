import React from 'react';
import { Bell, User, ChevronRight, ClipboardList, Info, BadgeDollarSign, PlusIcon } from 'lucide-react';
import { ThemeToggle } from '../../section/themeToggel';
import Link from 'next/link';

const Policies = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
      <header className="bg-white dark:bg-gray-800 pb-4 pt-1 flex justify-between items-center">
        <div className="flex flex-col items-center pt-2 px-16">
          <h1 className="dark:text-white">Policy Bots</h1>
          <span className="ml-2 text-xs text-blue-600 font-semibold">HAR BOT HOGA INSURED</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="container mx-auto p-0 pt-8">
        <div className="flex justify-between gap-8 -mx-16">
          <div className="w-1/3">
            <div className="bg-white dark:bg-gray-600 rounded-lg shadow p-6 mb-6">
              <h1 className="text-2xl font-bold mb-2">Hi, Ankit! 👋</h1>
              <p className="text-gray-600 dark:text-gray-200">How have you been?</p>

              <nav className="mt-6 space-y-2">
                <Link href="/dashboard">
                  <button className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-500 rounded flex items-center">
                    <Bell className="mr-2" size={20} />
                    Dashboard
                  </button>
                </Link>
                <Link href="/all-policies">
                  <button className="w-full text-left mt-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-500 rounded flex items-center">
                    <User className="mr-2" size={20} />
                    All Policies
                  </button>
                </Link>
                <Link href="/policies">
                  <button className="w-full text-left mt-2 p-2 bg-blue-50 dark:bg-gray-500 text-blue-600 dark:text-gray-800 rounded flex items-center">
                    <ClipboardList className="mr-2" size={20} />
                    Your Policies
                  </button>
                </Link>
                <Link href="/help">
                  <button className="w-full text-left mt-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-500 rounded flex items-center">
                    <Info className="mr-2" size={20} />
                    Get Help
                  </button>
                </Link>
                <Link href="/transactions">
                  <button className="w-full text-left mt-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-500 rounded flex items-center">
                    <BadgeDollarSign className="mr-2" size={20} />
                    Your Transactions
                  </button>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="w-2/3">
            <div className="flex flex-col gap-4">
              <div className="bg-blue-400 p-4 rounded-xl">
                <h1 className="text-4xl font-extrabold">Your Policies</h1>
                <h2 className="text-lg">Manage your insurance policies & renewals</h2>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-4">
                    <PlusIcon className="text-gray-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 ">You don't have any policies yet!</h3>
                    <p className="text-sm text-gray-600">Buy an insurance policy to protect your family & assets now</p>
                  </div>
                </div>
                <Link href='/all-policies'>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Explore
                    </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center p-4 text-sm text-gray-600 dark:text-gray-300">
        <a href="#" className="mr-4">Disclaimer</a>
        <a href="#">Privacy policy</a>
      </footer>
    </div>
  );
};

export default Policies;
