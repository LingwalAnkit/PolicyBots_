'use client'

import React, { useState, useEffect } from 'react';
import { Bell, User, ChevronRight, ClipboardList, Info, BadgeDollarSign, ArrowLeft, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '../../section/themeToggel';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validationSchemas, initialValues } from './formvalidation';
import useFormPersistence from './useFormPersistence';
import PDFDownloadButton from './PDFDownloadButton';
import axios from 'axios'; 

const ProfilePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Personal Information', 'Nominee details', 'Assets', 'Declaration and Consent'];
  const [persistedValues, setPersistedValues] = useFormPersistence('profileFormData', initialValues);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const nextStep = (values) => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (values, { setSubmitting }) => {
    if (currentStep === steps.length - 1) {
      try {
        console.log('Submitting form data:', values);
        const response = await axios.post('/api/profile', values);
        console.log('Form submitted successfully:', response.data);
        // Handle successful submission (e.g., show success message, redirect)
        alert('Profile updated successfully!');
        // You might want to redirect the user or update the UI here
      } catch (error) {
        console.error('Error submitting form:', error.response ? error.response.data : error.message);
        alert('Error updating profile. Please try again.');
        // Handle error (e.g., show error message)
      }
    } else {
      nextStep(values);
    }
    setSubmitting(false);
  };

  const renderStepContent = (step, errors, touched) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <Field name="fullName" type="text" placeholder="Full Name" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.fullName && touched.fullName ? 'border-red-500' : ''}`} />
            <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />

            <Field name="dateOfBirth" type="date" placeholder="Date of Birth" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.dateOfBirth && touched.dateOfBirth ? 'border-red-500' : ''}`} />
            <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm" />

            <Field name="gender" as="select" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.gender && touched.gender ? 'border-red-500' : ''}`}>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Field>
            <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />

            <Field name="address" as="textarea" placeholder="Full Address" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.address && touched.address ? 'border-red-500' : ''}`} rows="3" />
            <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />

            <div className='p-4 border-2 border-l-blue-500 rounded dark:bg-gray-700 dark:border-gray-600'>
              <Field name="aadhaarNumber" type="text" placeholder="Aadhaar Number" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.aadhaarNumber && touched.aadhaarNumber ? 'border-red-500' : ''}`} />
              <ErrorMessage name="aadhaarNumber" component="div" className="text-red-500 text-sm" />

              <div className="mt-4">
                <input type="file" accept="image/*" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
            </div>

            <div className='p-4 border-2 border-l-blue-500 rounded dark:bg-gray-700 dark:border-gray-600'>
              <Field name="panNumber" type="text" placeholder="PAN Number" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.panNumber && touched.panNumber ? 'border-red-500' : ''}`} />
              <ErrorMessage name="panNumber" component="div" className="text-red-500 text-sm" />

              <div className="mt-4">
                <input type="file" accept="image/*" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
            </div>

            <Field name="mobileNumber" type="tel" placeholder="Mobile Number" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.mobileNumber && touched.mobileNumber ? 'border-red-500' : ''}`} />
            <ErrorMessage name="mobileNumber" component="div" className="text-red-500 text-sm" />

            <Field name="email" type="email" placeholder="Email Address" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.email && touched.email ? 'border-red-500' : ''}`} />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

            <Field name="maritalStatus" as="select" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.maritalStatus && touched.maritalStatus ? 'border-red-500' : ''}`}>
              <option value="">Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </Field>
            <ErrorMessage name="maritalStatus" component="div" className="text-red-500 text-sm" />

            <Field name="occupation" type="text" placeholder="Occupation" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.occupation && touched.occupation ? 'border-red-500' : ''}`} />
            <ErrorMessage name="occupation" component="div" className="text-red-500 text-sm" />

            <Field name="incomeRange" as="select" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.incomeRange && touched.incomeRange ? 'border-red-500' : ''}`}>
              <option value="">Income Range</option>
              <option value="0-5">0 - 5 Lakhs</option>
              <option value="5-10">5 - 10 Lakhs</option>
              <option value="10+">10+ Lakhs</option>
            </Field>
            <ErrorMessage name="incomeRange" component="div" className="text-red-500 text-sm" />

            <div className="w-full p-4 border-2 border-l-blue-500 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <h1 className='text-lg mb-2'>Income certificate</h1>
              <input type="file" accept="image/*" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            <Field name="bankAccountNumber" type="text" placeholder="Bank Account Number (optional)" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <Field name="ifscCode" type="text" placeholder="IFSC Code (optional)" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />

            <Field name="policyPremiumFrequency" as="select" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.policyPremiumFrequency && touched.policyPremiumFrequency ? 'border-red-500' : ''}`}>
              <option value="">Policy Premium Frequency</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </Field>
            <ErrorMessage name="policyPremiumFrequency" component="div" className="text-red-500 text-sm" />

            <div className="flex items-center">
              <Field type="checkbox" id="preExistingConditions" name="preExistingConditions" className="mr-2" />
              <label htmlFor="preExistingConditions" className="dark:text-white">Pre-existing Conditions</label>
            </div>

            <Field name="preExistingConditionsDetails" as="textarea" placeholder="If yes, please provide details" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows="3" />
            <ErrorMessage name="preExistingConditionsDetails" component="div" className="text-red-500 text-sm" />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <Field name="nomineeName" type="text" placeholder="Nominee Full Name" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.nomineeName && touched.nomineeName ? 'border-red-500' : ''}`} />
            <ErrorMessage name="nomineeName" component="div" className="text-red-500 text-sm" />

            <Field name="nomineeRelationship" type="text" placeholder="Relationship with Policyholder" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.nomineeRelationship && touched.nomineeRelationship ? 'border-red-500' : ''}`} />
            <ErrorMessage name="nomineeRelationship" component="div" className="text-red-500 text-sm" />

            <Field name="nomineeDateOfBirth" type="date" placeholder="Nominee Date of Birth" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.nomineeDateOfBirth && touched.nomineeDateOfBirth ? 'border-red-500' : ''}`} />
            <ErrorMessage name="nomineeDateOfBirth" component="div" className="text-red-500 text-sm" />

            <Field name="nomineeIdentification" type="text" placeholder="Nominee Aadhaar or PAN Number (optional)" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold dark:text-white">Vehicle Information</h3>
            <Field name="vehicleRegistrationNumber" type="text" placeholder="Vehicle Registration Number" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.vehicleRegistrationNumber && touched.vehicleRegistrationNumber ? 'border-red-500' : ''}`} />
            <ErrorMessage name="vehicleRegistrationNumber" component="div" className="text-red-500 text-sm" />

            <Field name="vehicleModelMake" type="text" placeholder="Vehicle Model and Make" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.vehicleModelMake && touched.vehicleModelMake ? 'border-red-500' : ''}`} />
            <ErrorMessage name="vehicleModelMake" component="div" className="text-red-500 text-sm" />

            <Field name="vehicleManufactureYear" type="number" placeholder="Year of Manufacture" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.vehicleManufactureYear && touched.vehicleManufactureYear ? 'border-red-500' : ''}`} />
            <ErrorMessage name="vehicleManufactureYear" component="div" className="text-red-500 text-sm" />

            <h3 className="font-semibold dark:text-white">Land Information</h3>
            <Field name="landRegistrationNumber" type="text" placeholder="Land Registration Number" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.landRegistrationNumber && touched.landRegistrationNumber ? 'border-red-500' : ''}`} />
            <ErrorMessage name="landRegistrationNumber" component="div" className="text-red-500 text-sm" />

            <Field name="landLocation" type="text" placeholder="Land Location" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.landLocation && touched.landLocation ? 'border-red-500' : ''}`} />
            <ErrorMessage name="landLocation" component="div" className="text-red-500 text-sm" />

            <Field name="landArea" type="number" placeholder="Land Area (in sq. ft.)" className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.landArea && touched.landArea ? 'border-red-500' : ''}`} />
            <ErrorMessage name="landArea" component="div" className="text-red-500 text-sm" />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center">
              <Field type="checkbox" id="termsConditions" name="termsConditions" className="mr-2" />
              <label htmlFor="termsConditions" className="dark:text-white">I agree to the Terms and Conditions</label>
            </div>
            <ErrorMessage name="termsConditions" component="div" className="text-red-500 text-sm" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
      <header className="bg-white dark:bg-gray-800 pb-4 pt-1 flex justify-between items-center">
      <div className="flex flex-col items-center pt-2 px-16">
          <h1 className=' dark:text-white'>Policy Bots</h1>
          <span className="ml-2 text-xs text-blue-600 font-semibold dark:text-[#A9D6E5]">HAR BOT HOGA INSURED</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="container p-0 pt-8">
        <div className="flex justify-between gap-8 -mx-16">
          {/* Sidebar */}
          <div className='w-1/3'>
            <div className="bg-white dark:bg-gray-600 rounded-lg shadow p-6 mb-6">
              <h1 className="text-2xl font-bold mb-2 dark:text-[#F9FAFB]">Hi, Ankit! 👋</h1>
              <p className="text-gray-600 dark:text-white">How have you been?</p>

              <nav className="mt-6 space-y-2">
                <button className="w-full mb-2 text-left p-2 bg-blue-50 dark:bg-gray-500 text-blue-600  dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                  <Bell className="mr-2" size={20} />
                  Dashboard
                </button>
                <Link href="./AllPolicies" >
                  <button className="w-full mb-2 text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                    <User className="mr-2" size={20} />
                    All Policies
                  </button>
                </Link>
                <Link href="/policies">
                  <button className="w-full mb-2 text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                    <ClipboardList className="mr-2" size={20} />
                    Your policies
                  </button>
                </Link>
                <button className="w-full text-left mb-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                  <Info className="mr-2" size={20} />
                  Get help
                </button>
                <button className="w-full mb-2 text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                  <BadgeDollarSign className="mr-2" size={20} />
                  Your Transactions
                </button>
                <Link href="/profile">
                  <button className="w-full mt-2 text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                    <User className="mr-2" size={20} />
                    Profile
                  </button>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="w-2/3">
            <div className="bg-white dark:bg-gray-600 rounded-lg shadow p-6 mb-6">
              <h1 className="text-2xl font-bold mb-2 dark:text-white">Profile</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Complete your profile information</p>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(currentStep + 1) / steps.length * 100}%` }}></div>
              </div>

              {/* Step title */}
              <h2 className="text-xl font-semibold mb-4 dark:text-white">{steps[currentStep]}</h2>

              {/* Form */}
              <Formik
                initialValues={persistedValues}
                validationSchema={validationSchemas[currentStep]}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="space-y-6">
                    {renderStepContent(currentStep, errors, touched)}

                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={prevStep}
                        className={`px-4 py-2 flex items-center ${currentStep === 0 ? 'invisible' : ''}`}
                      >
                        <ArrowLeft className="mr-2" size={20} /> Previous
                      </button>
                      {currentStep === steps.length - 1 && (
                        <PDFDownloadButton />
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                      >
                        {currentStep === steps.length - 1 ? 'Submit' : 'Next'} {currentStep !== steps.length - 1 && <ArrowRight className="ml-2" size={20} />}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center p-4 text-sm text-gray-600 dark:text-gray-400">
        <a href="#" className="mr-4 hover:text-gray-800 dark:hover:text-gray-200">Disclaimer</a>
        <a href="#" className="hover:text-gray-800 dark:hover:text-gray-200">Privacy policy</a>
      </footer>
    </div>
  );
};

export default ProfilePage;