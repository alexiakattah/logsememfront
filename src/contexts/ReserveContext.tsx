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

interface ReserveContextProps {
  getReserves: () => Promise<unknown>
  getReservesEgua: () => Promise<unknown>
  getAnimalsDay: () => Promise<unknown>
  cancelReserve: (reserve: object) => Promise<unknown>
  confirmReserve: (reserve: object) => Promise<unknown>
  confirmColeta: (reserve: object) => Promise<unknown>
  getUserWhoRequestedReserve: (reserveDetails: object) => Promise<unknown>
  dataReserves: DataResponseReserves | undefined
  dataUserRequestReserve: {} | undefined
  dataGetAnimalsDay: {} | undefined
}

interface DataResponseReserves {
  imageUrl: string
  name: string
}
export const reserveContext = createContext({} as ReserveContextProps)
interface ReserveContextProviderProps {
  children: ReactNode
}
export function ReserveContextProvider(
  props: ReserveContextProviderProps,
  { navigation }: any,
) {
  const { authenticatedUser } = useAuth()

  const [statusRegister, setStatusRegister] = useState('Cadastrar')
  const [dataReserves, setDataReserves] = useState()
  const [dataUserRequestReserve, setDataUserRequestReserve] = useState({})
  const [dataGetAnimalsDay, setDatagetAnimalsDay] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  async function getReserves() {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      setStatusRegister('Cadastrando...')
      try {
        let parameters = {
          searchFunctionality: 'getReserves',
          userType: 'haras',
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
          setStatusRegister('Cadastrar')
          // Alert.alert(`Sucesso`, `${data.message}`, [{ text: 'OK' }])
          setDataReserves(data.data)
          resolve(data)
        } else {
          setStatusRegister('Cadastrar')
          Alert.alert(`Atenção`, `${data.message}`, [{ text: 'OK' }])
        }
      } catch (error) {
        setStatusRegister('Cadastrar')
        reject(error)
      }
    })
  }
  async function getReservesEgua() {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      setStatusRegister('Cadastrando...')
      try {
        let parameters = {
          searchFunctionality: 'getReservesEgua',
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
          // Alert.alert(`Sucesso`, `${data.message}`, [{ text: 'OK' }])
          setDataReserves(data.data)
          resolve(data)
        } else {
          setStatusRegister('Cadastrar')
          Alert.alert(`Atenção`, `${data.message}`, [{ text: 'OK' }])
        }
      } catch (error) {
        setStatusRegister('Cadastrar')
        reject(error)
      }
    })
  }
  async function cancelReserve(reserve: object) {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      setStatusRegister('Cadastrando...')
      try {
        let parameters = {
          searchFunctionality: 'cancelReserve',
          userType: 'haras',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
          reserve,
        }

        const requestConfig = {
          headers: { Authorization: authToken },
        }

        const { data } = await api.post('/reserves', parameters, requestConfig)

        if (data.success) {
          setStatusRegister('Cadastrar')
          Alert.alert(`Sucesso`, `${data.message}`, [{ text: 'OK' }])
          // setDataUserRequestReserve(data.data)
          resolve(data)
        } else {
          setStatusRegister('Cadastrar')
          Alert.alert(`Atenção`, `${data.message}`, [{ text: 'OK' }])
        }
      } catch (error) {
        setStatusRegister('Cadastrar')
        reject(error)
      }
    })
  }
  async function confirmReserve(reserve: object) {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      setStatusRegister('Aguarde...')
      try {
        let parameters = {
          searchFunctionality: 'confirmReserve',
          userType: 'haras',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
          reserve,
        }

        const requestConfig = {
          headers: { Authorization: authToken },
        }

        const { data } = await api.post('/reserves', parameters, requestConfig)

        if (data.success) {
          setStatusRegister('Cadastrar')
          Alert.alert(`Sucesso`, `${data.message}`, [
            { text: 'OK', onPress: () => console.log('Cancel Pressed!') },
          ])
          // setDataUserRequestReserve(data.data)
          resolve(data)
        } else {
          setStatusRegister('Cadastrar')
          Alert.alert(`Atenção`, `${data.message}`, [{ text: 'OK' }])
        }
      } catch (error) {
        setStatusRegister('Cadastrar')
        reject(error)
      }
    })
  }
  async function confirmColeta(reserve: string) {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      setStatusRegister('Aguarde...')
      try {
        let parameters = {
          searchFunctionality: 'confirmColeta',
          userType: 'haras',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
          reserve,
        }

        const requestConfig = {
          headers: { Authorization: authToken },
        }

        const { data } = await api.post('/reserves', parameters, requestConfig)

        if (data.success) {
          setStatusRegister('Cadastrar')
          Alert.alert(`Coleta realizada com sucesso!`)
          //Alert.alert(`Sucesso`, `${data.message}`, [{ text: 'OK' }])
          // setDataUserRequestReserve(data.data)
          resolve(data)
        } else {
          setStatusRegister('Cadastrar')
          Alert.alert(`Atenção`, `${data.message}`, [{ text: 'OK' }])
        }
      } catch (error) {
        setStatusRegister('Cadastrar')
        reject(error)
      }
    })
  }
  async function getUserWhoRequestedReserve(reserveDetails: object) {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      setStatusRegister('Cadastrando...')
      try {
        let parameters = {
          searchFunctionality: 'getUserWhoRequestedReserve',
          userType: 'haras',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
          reserveDetails,
        }

        const requestConfig = {
          headers: { Authorization: authToken },
        }

        const { data } = await api.post('/reserves', parameters, requestConfig)

        if (data.success) {
          setStatusRegister('Cadastrar')
          // Alert.alert(`Sucesso`, `${data.message}`, [{ text: 'OK' }])
          setDataUserRequestReserve(data.data)
          resolve(data)
        } else {
          setStatusRegister('Cadastrar')
          Alert.alert(`Atenção`, `${data.message}`, [{ text: 'OK' }])
        }
      } catch (error) {
        setStatusRegister('Cadastrar')
        reject(error)
      }
    })
  }
  async function getAnimalsDay() {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      setStatusRegister('Cadastrando...')
      try {
        let parameters = {
          searchFunctionality: 'getAnimalsDay',
          userType: 'haras',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
        }

        const requestConfig = {
          headers: { Authorization: authToken },
        }

        const { data } = await api.post('/reserves', parameters, requestConfig)
        // console.log('dataaaaaaaaaaaaaa', data)
        if (data.success) {
          setStatusRegister('Cadastrar')
          // Alert.alert(`Sucesso`, `${data.message}`, [{ text: 'OK' }])
          setDatagetAnimalsDay(data.data)
          resolve(data)
        } else {
          setStatusRegister('Cadastrar')
          Alert.alert(`Atenção`, `${data.message}`, [{ text: 'OK' }])
        }
      } catch (error) {
        setStatusRegister('Cadastrar')
        reject(error)
      }
    })
  }

  return (
    <reserveContext.Provider
      value={{
        getReserves,
        getReservesEgua,
        dataReserves,
        getUserWhoRequestedReserve,
        dataUserRequestReserve,
        cancelReserve,
        getAnimalsDay,
        confirmReserve,
        dataGetAnimalsDay,
        confirmColeta,
      }}
    >
      {props.children}
    </reserveContext.Provider>
  )
}
