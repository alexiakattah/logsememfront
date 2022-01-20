import { useContext } from 'react';
import { registerContext } from '../contexts/RegisterContext';

export function useRegister() {
  const value = useContext(registerContext);
  return value;
}
