import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TouchableWithoutFeedback, Keyboard, Alert, RefreshControl } from 'react-native'
import { RadioButton } from 'react-native-paper'
import {
  Container,
  NameHaras,
  DivHaras,
  PhotoHaras,
  Text,
  Header,
  Options,
  DivMenu,
  TextProfile,
  Icon,
  Name,
  Title,
  Div,
  Crmv,
  TextTitle,
  DivHarasCep,
} from './styles'
import axios from 'axios'

import { Input } from '../../../components/Forms/Input'
import { InputForm } from '../../../components/Forms/InputForm'
import { Button } from '../../../components/Forms/Button'
import { useState } from 'react'
import { useRegister } from '../../../hooks/useRegister'
import { useAuth } from '../../../hooks/useAuth'
import { FontAwesome } from '@expo/vector-icons'

interface FormData {
  cpfTitular: number
  number: number
  validate: number
  cvv: number
  nameTitular: string
  typeCart: string
  apelido?: string
}

const schema = Yup.object().shape({
  cpfTitular: Yup.number().required('O CRMV é obrigatório'),

  number: Yup.number()
    .typeError('CPF composto por número.')
    .required('O CPF é obrigatório'),
  validate: Yup.number()
    .typeError('Agência só aceita número.')
    .required('A agência é obrigatória'),
  cvv: Yup.number()
    .typeError('Conta composta por número.')
    .required('A Conta é obrigatória'),
  nameTitular: Yup.string().required('O Email é obrigatório'),
  apelido: Yup.string().required('O Valor com Botuflex é obrigatório'),
  // typeCart: Yup.string().required('O Valor com Botuflex é obrigatório'),
})

export function EditMyData({ navigation }: any) {
  const [cep, setCep] = useState('')
  const [typeCart, setTypeCart] = useState('credit')
  const [nameResponsable, setNameResponsable] = useState('')
  const [loadingCep, setLoadingCep] = useState(false)
  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const { user, getDataUser, dataUser, setDataUser, updateUser } = useAuth()

  useEffect(() => {
    async function loadData() {
      getDataUser()
    }

    loadData()
  }, [console.log(' cep, setDataUser', dataUser, loadingCep)])

  async function handleRegister() {
    const result = await updateUser(dataUser)
    console.log('result', result)
  }
  function maskCEP(v) {
    if (!v) {
      return ''
    }
    v = v.replace(/\D/g, '')
    v = v.replace(/^(\d{5})(\d)/, '$1-$2')
    return v
  }
  function getAddress(e) {
    e.preventDefault()

    const value = dataUser.cep && dataUser.cep.replace('-', '')
    console.log('value', value)
    setLoadingCep(true)
    setIsLoadingCep(false)
    axios
      .get(`https://viacep.com.br/ws/${value}/json`)
      .then((res) => {
        if (res.data.erro) {
          Alert.alert('Atenção', 'CEP Inválido.')
          return
        }

        if (res.status === 200) {
          setLoadingCep(false)
          setIsLoadingCep(true)
          setDataUser((prevState) => ({
            ...prevState,
            street: res.data.logradouro,
            neighborhood: res.data.bairro,
            city: res.data.localidade,
            state: res.data.uf,
          }))
        }
      })
      .catch((e) => {
        setLoadingCep(false)
        Alert.alert('Atenção', 'Erro ao buscar o CEP.')
      })
  }
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    async function loadReserves() {
      user
    }

    loadReserves()

    wait(2000).then(() => setRefreshing(false))
  }, [])

  function maskCPF(mask) {
    return mask
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <Container refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
        <Title>Atualizar Informações</Title>

        <DivMenu horizontal={false}>
          <TextTitle>Nome do Responsável</TextTitle>
          <Options>
            <DivHaras>
              <TextProfile
                value={dataUser?.nameResponsible}
                onChangeText={(e) =>
                  setDataUser((prevState) => ({
                    ...prevState,
                    nameResponsible: e,
                  }))
                }
              />
            </DivHaras>
          </Options>
          <TextTitle>Nome do Estabelecimento</TextTitle>
          <Options>
            <DivHaras>
              <TextProfile
                value={dataUser?.nameEstabelecimento}
                onChangeText={(e) =>
                  setDataUser((prevState) => ({
                    ...prevState,
                    nameEstabelecimento: e,
                  }))
                }
              />
            </DivHaras>
          </Options>

          <TextTitle>CPF</TextTitle>
          <Options>
            <DivHaras>
              <TextProfile
                keyboardType='numeric'
                value={dataUser?.cpf}
                onChangeText={(e) =>
                  setDataUser((prevState) => ({
                    ...prevState,
                    cpf: maskCPF(e),
                  }))
                }
              ></TextProfile>
            </DivHaras>
          </Options>
          <TextTitle>Email</TextTitle>
          <Options>
            <DivHaras>
              <TextProfile
                editable={false}
                control={control}
                keyboardType='email-address'
              >
                {user?.email}
              </TextProfile>
            </DivHaras>
          </Options>
          <TextTitle>CEP</TextTitle>
          <Options>
            <DivHarasCep>
              <TextProfile
                keyboardType='numeric'
                value={dataUser?.cep}
                onChangeText={(e) =>
                  setDataUser((prevState) => ({
                    ...prevState,
                    cep: maskCEP(e),
                  }))
                }
              />
              <Icon>
                <FontAwesome
                  name='search'
                  size={24}
                  color='white'
                  onPress={(e) => getAddress(e)}
                />
              </Icon>
            </DivHarasCep>
          </Options>

          {loadingCep && <Text>Pesquisando...</Text>}

          <TextTitle>Endereço</TextTitle>
          <Options>
            <DivHaras>
              <TextProfile
                value={dataUser?.street}
                onChangeText={(e) =>
                  setDataUser((prevState) => ({
                    ...prevState,
                    street: e,
                  }))
                }
              />
            </DivHaras>
          </Options>

          <TextTitle>Bairro</TextTitle>
          <Options>
            <DivHaras>
              <TextProfile
                value={dataUser?.neighborhood}
                onChangeText={(e) =>
                  setDataUser((prevState) => ({
                    ...prevState,
                    neighborhood: e,
                  }))
                }
              />
            </DivHaras>
          </Options>

          <TextTitle>Número</TextTitle>
          <Options>
            <DivHaras>
              <TextProfile
                value={dataUser?.number}
                onChangeText={(e) =>
                  setDataUser((prevState) => ({
                    ...prevState,
                    number: e,
                  }))
                }
              />
            </DivHaras>
          </Options>

          <TextTitle>Complemento</TextTitle>
          <Options>
            <DivHaras>
              <TextProfile
                value={dataUser?.complement}
                onChangeText={(e) =>
                  setDataUser((prevState) => ({
                    ...prevState,
                    complement: e,
                  }))
                }
              />
            </DivHaras>
          </Options>
          <TextTitle>Cidade</TextTitle>
          <Options>
            <DivHaras>
              <TextProfile
                value={dataUser?.city}
                onChangeText={(e) =>
                  setDataUser((prevState) => ({
                    ...prevState,
                    city: e,
                  }))
                }
              />
            </DivHaras>
          </Options>
          <TextTitle>Estado</TextTitle>
          <Options>
            <DivHaras>
              <TextProfile
                value={dataUser?.state}
                onChangeText={(e) =>
                  setDataUser((prevState) => ({
                    ...prevState,
                    state: e,
                  }))
                }
              />
            </DivHaras>
          </Options>

          <Button onPress={() => handleRegister()} title='Salvar' />
        </DivMenu>
      </Container>
    </TouchableWithoutFeedback>
  )
}
