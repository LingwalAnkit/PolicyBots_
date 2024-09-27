// formValidation.js
import * as Yup from 'yup';

export const validationSchemas = [
    Yup.object().shape({
      fullName: Yup.string().required('Full name is required'),
      dateOfBirth: Yup.date().required('Date of birth is required').max(new Date(), 'Date of birth cannot be in the future'),
      gender: Yup.string().required('Gender is required'),
      address: Yup.string().required('Address is required'),
      aadhaarNumber: Yup.string().length(12, 'Aadhaar number must be 12 digits').required('Aadhaar number is required'),
      panNumber: Yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number').required('PAN number is required'),
      mobileNumber: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      maritalStatus: Yup.string().required('Marital status is required'),
      occupation: Yup.string().required('Occupation is required'),
      incomeRange: Yup.string().required('Income range is required'),
      bankAccountNumber: Yup.string(),
      ifscCode: Yup.string(),
      policyPremiumFrequency: Yup.string().required('Policy premium frequency is required'),
      preExistingConditions: Yup.boolean(),
      preExistingConditionsDetails: Yup.string().when('preExistingConditions', {
        is: true,
        then: Yup.string().required('Please provide details of pre-existing conditions'),
      }),
    }),
  Yup.object().shape({
    nomineeName: Yup.string().required('Nominee name is required'),
    nomineeRelationship: Yup.string().required('Nominee relationship is required'),
    nomineeDateOfBirth: Yup.date().required('Nominee date of birth is required').max(new Date(), 'Date of birth cannot be in the future'),
    nomineeIdentification: Yup.string(),
  }),
  Yup.object().shape({
    vehicleRegistrationNumber: Yup.string().required('Vehicle registration number is required'),
    vehicleModelMake: Yup.string().required('Vehicle model and make is required'),
    vehicleManufactureYear: Yup.number().required('Year of manufacture is required').min(1900, 'Invalid year').max(new Date().getFullYear(), 'Year cannot be in the future'),
    landRegistrationNumber: Yup.string().required('Land registration number is required'),
    landLocation: Yup.string().required('Land location is required'),
    landArea: Yup.number().required('Land area is required').positive('Land area must be positive'),
  }),
  Yup.object().shape({
    kycConsent: Yup.boolean().oneOf([true], 'You must consent to KYC verification'),
    termsConditions: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
    digitalSignature: Yup.mixed(),
  }),
];

export const initialValues = {
  fullName: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  aadhaarNumber: '',
  panNumber: '',
  mobileNumber: '',
  email: '',
  maritalStatus: '',
  occupation: '',
  incomeRange: '',
  bankAccountNumber: '',
  ifscCode: '',
  policyPremiumFrequency: '',
  preExistingConditions: false,
  preExistingConditionsDetails: '',
  nomineeName: '',
  nomineeRelationship: '',
  nomineeDateOfBirth: '',
  nomineeIdentification: '',

  vehicleRegistrationNumber: '',
  vehicleModelMake: '',
  vehicleManufactureYear: '',
  landRegistrationNumber: '',
  landLocation: '',
  landArea: '',

  kycConsent: false,
  termsConditions: false,
  digitalSignature: null,
};