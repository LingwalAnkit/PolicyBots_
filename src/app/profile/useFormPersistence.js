"use client"
// useFormPersistence.js
import { useState, useEffect } from 'react';
import { encrypt, decrypt } from './encryption'; // You'll need to implement these functions

const useFormPersistence = (key, initialValue, userId) => {
  const [state, setState] = useState(() => {
    if (typeof window !== 'undefined' && userId) {
      try {
        const userKey = `${key}_${userId}`;
        const storedValue = localStorage.getItem(userKey);
        if (storedValue) {
          const decryptedValue = decrypt(storedValue);
          return JSON.parse(decryptedValue);
        }
      } catch (error) {
        console.error('Error retrieving stored form data:', error);
      }
    }
    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && userId) {
      try {
        const userKey = `${key}_${userId}`;
        const encryptedValue = encrypt(JSON.stringify(state));
        localStorage.setItem(userKey, encryptedValue);
      } catch (error) {
        console.error('Error storing form data:', error);
      }
    }
  }, [key, state, userId]);

  const clearPersistedData = () => {
    if (typeof window !== 'undefined' && userId) {
      try {
        const userKey = `${key}_${userId}`;
        localStorage.removeItem(userKey);
        setState(initialValue);
      } catch (error) {
        console.error('Error clearing persisted data:', error);
      }
    }
  };

  return [state, setState, clearPersistedData];
};

export default useFormPersistence;