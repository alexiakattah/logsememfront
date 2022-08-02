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
import creditCardType from 'credit-card-type'

export const registerContext = createContext({})

export function RegisterContextProvider(props, { navigation }) {
  const { authenticatedUser } = useAuth()

  const [statusRegister, setStatusRegister] = useState('Cadastrar')
  const [searchRegister, setSearchRegister] = useState('Pesquisar')
  const [isLoading, setIsLoading] = useState(false)
  const [dataFindAnimals, setDataFindAnimals] = useState()
  const [dataResponseVeterinarians, setDataResponseVeterinarians] = useState()
  const [dataResponseVeterinarian, setDataResponseVeterinarian] = useState()
  const [dataResponseCreditCards, setDataResponseCreditCards] = useState()
  const [dataResponseAnimals, setDataResponseAnimals] = useState()
  const [datafindAnimalEgua, setDatafindAnimalEgua] = useState()

  async function registerVeterinarian(
    name,
    crmv,
    cpf,
    email,
    valueBotuflex,
    password,
    confirmPassword,
    valueNoBotuflex,
    agency,
    count,
  ) {
    return new Promise(async (resolve, reject) => {
      setStatusRegister('Cadastrando...')
      try {
        let user = {
          name,
          crmv,
          cpf,
          email,
          valueBotuflex,
          password,
          confirmPassword,
          valueNoBotuflex,
          agency,
          count,
        }
        let parameters = {
          user,
          typeUser: 'registerVeterinarian',
          harasId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
        }

        const { data } = await api.post('/createUser', parameters)
        if (data.success) {
          setStatusRegister('Cadastrar')
          Alert.alert(`Sucesso`, `${data.message}`, [{ text: 'OK' }])
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
  async function editVeterinarian(dataVeterinarian) {
    return new Promise(async (resolve, reject) => {
      setStatusRegister('Atualizando...')
      try {
        const authToken = await auth.getAuthUserToken()

        let parameters = {
          data: dataVeterinarian,
          userType: 'registerHaras',
          searchFunctionality: 'updateVeterinarian',
          harasId: authenticatedUser && authenticatedUser.uid,
        }
        const requestConfig = {
          headers: { Authorization: authToken },
        }
        const { data } = await api.post('/update', parameters, requestConfig)
        if (data.success) {
          setStatusRegister('Atualizar')
          // Alert.alert(`Sucesso`, `${data.message}`, [
          //   { text: 'OK', onPress: () => navigation.navigate('Veterinários') },
          // ])
          return resolve(data)
        } else {
          setStatusRegister('Atualizar')
          Alert.alert(`Atenção`, `${data.message}`, [{ text: 'OK' }])
        }
      } catch (error) {
        setStatusRegister('Atualizar')
        reject(error)
      }
    })
  }
  async function editCreditCard(dataCreditCard) {
    return new Promise(async (resolve, reject) => {
      console.log('aquiiiiiii')
      setStatusRegister('Atualizando...')
      try {
        const authToken = await auth.getAuthUserToken()

        let parameters = {
          data: dataCreditCard,
          userType: 'registerEgua',
          searchFunctionality: 'editCreditCard',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
        }
        const requestConfig = {
          headers: { Authorization: authToken },
        }
        const { data } = await api.post('/update', parameters, requestConfig)
        if (data.success) {
          setStatusRegister('Atualizar')
          Alert.alert(`Sucesso`, `${data.message}`, [{ text: 'OK' }])
          resolve(data)
        } else {
          setStatusRegister('Atualizar')
          Alert.alert(`Atenção`, `${data.message}`, [{ text: 'OK' }])
        }
      } catch (error) {
        setStatusRegister('Atualizar')
        reject(error)
      }
    })
  }
  async function updateAnimalEgua(data) {
    return new Promise(async (resolve, reject) => {
      console.log('aquiiiiiii')
      setStatusRegister('Atualizando...')
      try {
        const authToken = await auth.getAuthUserToken()

        let parameters = {
          data: datafindAnimalEgua,
          userType: 'registerEgua',
          searchFunctionality: 'updateAnimalEgua',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
        }
        const requestConfig = {
          headers: { Authorization: authToken },
        }
        const { data } = await api.post('/update', parameters, requestConfig)
        if (data.success) {
          setStatusRegister('Atualizar')
          Alert.alert(`Sucesso`, `${data.message}`, [{ text: 'OK' }])
          resolve(data)
        } else {
          setStatusRegister('Atualizar')
          Alert.alert(`Atenção`, `${data.message}`, [{ text: 'OK' }])
        }
      } catch (error) {
        setStatusRegister('Atualizar')
        reject(error)
      }
    })
  }
  async function registerAnimals(name, register, urlImage, formData) {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      setStatusRegister('Cadastrando...')
      try {
        let animal = {
          name,
          register,
          urlImage,
          formData,
        }
        let parameters = {
          animal,
          searchFunctionality: 'registerAnimals',
          userType: 'haras',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
        }

        const requestConfig = {
          headers: { Authorization: authToken },
        }

        const { data } = await api.post('/create', parameters, requestConfig)

        if (data.success) {
          setStatusRegister('Cadastrar')

          return resolve(data)
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

  async function getVeterinarians() {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      try {
        let parameters = {
          searchFunctionality: 'getVeterinarians',
          userType: 'haras',
          harasId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
        }
        const requestConfig = {
          headers: { Authorization: authToken },
        }
        const { data } = await api.post('/search', parameters, requestConfig)

        if (data.success) {
          if (data) {
            setDataResponseVeterinarians(data.data)
            return
          }
        }
      } catch (error) {}
    })
  }
  async function getVeterinarian(harasId) {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      try {
        let parameters = {
          searchFunctionality: 'getVeterinarian',
          userType: 'egua',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
          harasId,
        }
        const requestConfig = {
          headers: { Authorization: authToken },
        }
        const { data } = await api.post('/search', parameters, requestConfig)

        if (data.success) {
          if (data) {
            setDataResponseVeterinarian(data.data)
            console.log('aaaaaaa', dataResponseVeterinarian)
            return
          }
        }
      } catch (error) {}
    })
  }
  async function getAnimalEgua(animalId) {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      try {
        let parameters = {
          searchFunctionality: 'getAnimalEgua',
          userType: 'registerEgua',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
        }
        const requestConfig = {
          headers: { Authorization: authToken },
        }
        const { data } = await api.post('/search', parameters, requestConfig)

        if (data.success) {
          if (data) {
            setDataResponseVeterinarian(data.data)
            console.log('aaaaaaa', dataResponseVeterinarian)
            return
          }
        }
      } catch (error) {}
    })
  }
  async function getCreditCards() {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      setIsLoading(true)
      try {
        let parameters = {
          searchFunctionality: 'getCreditCards',
          userType: 'egua',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
        }
        const requestConfig = {
          headers: { Authorization: authToken },
        }
        const { data } = await api.post('/search', parameters, requestConfig)

        if (data.success) {
          if (data) {
            setIsLoading(false)
            setDataResponseCreditCards(data.data)
            return resolve({ code: 200, success: true })
          }
        }
      } catch (error) {
        setIsLoading(false)
        return
      }
    })
  }
  async function getCreditCardsHaras() {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      setIsLoading(true)
      try {
        let parameters = {
          searchFunctionality: 'getCreditCards',
          userType: 'haras',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
        }
        const requestConfig = {
          headers: { Authorization: authToken },
        }
        const { data } = await api.post('/search', parameters, requestConfig)

        if (data.success) {
          if (data) {
            setIsLoading(false)
            setDataResponseCreditCards(data.data)
            return resolve({ code: 200, success: true })
          }
        }
      } catch (error) {
        setIsLoading(false)
        return
      }
    })
  }
  async function getAnimals() {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      try {
        let parameters = {
          searchFunctionality: 'getAnimals',
          userType: 'haras',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
        }
        const requestConfig = {
          headers: { Authorization: authToken },
        }
        const { data } = await api.post('/search', parameters, requestConfig)

        if (data.success) {
          if (data) {
            setDataResponseAnimals(data.data)
            return
          }
        }
      } catch (error) {
        Alert.alert(`Atenção`, `Erro ao buscar animais`, [{ text: 'OK' }])
      }
    })
  }
  async function findAnimals(search) {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      setIsLoading(true)
      setSearchRegister('Pesquisando...')
      try {
        let parameters = {
          searchFunctionality: 'findAnimals',
          userType: 'egua',
          search,
        }
        const requestConfig = {
          headers: { Authorization: authToken },
        }
        const { data } = await api.post('/search', parameters, requestConfig)

        if (data.success) {
          setDataFindAnimals(data.data)
          setSearchRegister('Pesquisar')
          setIsLoading(false)
          return
        } else {
          setIsLoading(false)
          setSearchRegister('Pesquisar')
          Alert.alert(`Atenção`, `Nenhum animal encontrado`, [{ text: 'OK' }])
        }
      } catch (error) {
        setIsLoading(false)
        setSearchRegister('Pesquisar')
        Alert.alert(`Atenção`, `Erro ao buscar animais`, [{ text: 'OK' }])
      }
    })
  }

  async function createNewCreditCard(
    cpfTitular,
    number,
    validate,
    cvv,
    nameTitular,
    apelido,
    typeCart,
  ) {
    return new Promise(async (resolve, reject) => {
      const authToken = await auth.getAuthUserToken()
      setIsLoading(true)
      setStatusRegister('Cadastrando...')
      const bandeira = creditCardType('4111')
      console.log('bandeiraaaa', bandeira)
      const typeCard = bandeira && bandeira[0] && bandeira[0].type

      try {
        let form = {
          number,
          cpfTitular,
          typeCart,
          validate,
          cvv,
          nameTitular,
          apelido,
          typeCard,
        }
        let parameters = {
          form,
          searchFunctionality: 'createCreditCard',
          userType: 'egua',
          userId:
            authenticatedUser && authenticatedUser.uid
              ? authenticatedUser.uid
              : '',
        }

        const requestConfig = {
          headers: { Authorization: authToken },
        }

        const { data } = await api.post('/create', parameters, requestConfig)

        if (data.success) {
          setStatusRegister('Cadastrar')
          Alert.alert(`Sucesso`, `${data.message}`, [{ text: 'OK' }])
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
    <registerContext.Provider
      value={{
        registerVeterinarian,
        statusRegister,
        editVeterinarian,
        getVeterinarians,
        getVeterinarian,
        getCreditCards,
        getCreditCardsHaras,
        getAnimals,
        findAnimals,
        registerAnimals,
        createNewCreditCard,
        dataFindAnimals,
        isLoading,
        dataResponseVeterinarians,
        dataResponseVeterinarian,
        editCreditCard,
        getAnimalEgua,
        updateAnimalEgua,
        dataResponseAnimals,
        dataResponseCreditCards,
        setDataResponseVeterinarian,
        searchRegister,
      }}
    >
      {props.children}
    </registerContext.Provider>
  )
}
