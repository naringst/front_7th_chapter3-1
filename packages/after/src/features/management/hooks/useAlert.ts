import { useState, useCallback } from 'react';

export interface AlertState {
  showSuccess: boolean;
  successMessage: string;
  showError: boolean;
  errorMessage: string;
}

export interface UseAlertReturn {
  alertState: AlertState;
  showSuccessAlert: (message: string) => void;
  showErrorAlert: (message: string) => void;
  hideSuccessAlert: () => void;
  hideErrorAlert: () => void;
  resetAlerts: () => void;
}

/**
 * Alert 상태 관리 훅
 */
export function useAlert(): UseAlertReturn {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showSuccessAlert = useCallback((message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setShowError(false);
  }, []);

  const showErrorAlert = useCallback((message: string) => {
    setErrorMessage(message);
    setShowError(true);
    setShowSuccess(false);
  }, []);

  const hideSuccessAlert = useCallback(() => {
    setShowSuccess(false);
    setSuccessMessage('');
  }, []);

  const hideErrorAlert = useCallback(() => {
    setShowError(false);
    setErrorMessage('');
  }, []);

  const resetAlerts = useCallback(() => {
    setShowSuccess(false);
    setSuccessMessage('');
    setShowError(false);
    setErrorMessage('');
  }, []);

  return {
    alertState: {
      showSuccess,
      successMessage,
      showError,
      errorMessage,
    },
    showSuccessAlert,
    showErrorAlert,
    hideSuccessAlert,
    hideErrorAlert,
    resetAlerts,
  };
}

