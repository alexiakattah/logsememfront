import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  FormEvent,
} from 'react'
import { api } from '../services/api'
import { Alert } from 'react-native'
import { useAuth } from '../hooks/useAuth'
import { auth } from '../firebase'
import { reject } from 'underscore'
interface PaymentContextProps {
  confirmReserv: (
    botuflex: string,
    date: string,
    animal: object,
    dataResponseCreditCards: object,
    value: string,
    image: string,
    selectedLanguage: object,
    validationCode: string
  ) => Promise<unknown>
  confirmedReserve: boolean
  statusRegister: string
}

export const paymentContext = createContext({} as PaymentContextProps)
interface PaymentContextProviderProps {
  children: ReactNode
}
export function PaymentContextProvider(props: PaymentContextProviderProps) {
  const { authenticatedUser } = useAuth()
  const [statusRegister, setStatusRegister] = useState('Confirmar Reserva')
  const [isLoading, setIsLoading] = useState(false)
  const [confirmedReserve, setConfirmedReserve] = useState(false)

  async function confirmReserv(
    botuflex: string,
    date: string,
    animal: object,
    dataResponseCreditCards: object,
    value: string,
    image: string,
    selectedLanguage: object,
    validationCode: string
  ) {
    return new Promise(async (resolve, reject) => {
      setStatusRegister('Aguarde...')
      const authToken = await auth.getAuthUserToken()
      try {
        let params = {
          botuflex,
          date,
          animal,
          dataResponseCreditCards,
          value,
          image,
          selectedLanguage,
          validationCode
        }

        let parameters = {
          params,
          searchFunctionality: 'registerReserve',
          userType: 'egua',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
        }

        const requestConfig = {
          headers: { Authorization: authToken },
        }

        const { data } = await api.post('/reserves', parameters, requestConfig)

        if (data.success) {
          setConfirmedReserve(true)
          setStatusRegister('Cadastrar')
          Alert.alert(`Sucesso`, `${data.message}`, [{ text: 'OK' }])
          // navigation.navigate('ReserveConfirmed')
          resolve(data)
        } else {
          setStatusRegister('Cadastrar')
          Alert.alert(`Atenção`, `${data.message}`, [{ text: 'OK' }])
        }
      } catch (error) {
        setConfirmedReserve(false)
        setStatusRegister('Cadastrar')
        Alert.alert(`Atenção`, `Erro`, [{ text: 'OK' }])
        reject(error)
      }
    })
  }

  return (
    <paymentContext.Provider
      value={{
        confirmReserv,
        confirmedReserve,
        statusRegister,
      }}
    >
      {props.children}
    </paymentContext.Provider>
  )
}
