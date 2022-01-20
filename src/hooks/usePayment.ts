import { useContext } from 'react';
import { paymentContext } from '../contexts/PaymentContext';

export function usePayment() {
  const value = useContext(paymentContext);
  return value;
}
