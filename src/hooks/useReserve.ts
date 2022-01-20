import { useContext } from 'react'
import { reserveContext } from '../contexts/ReserveContext'

export function useReserve() {
  const value = useContext(reserveContext)
  return value
}
