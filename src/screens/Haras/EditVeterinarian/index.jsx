import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Banks } from '../../../constants/Bank'
import NumberFormat from 'react-number-format'
import _ from 'underscore'

import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  RefreshControl,
} from 'react-native'

import {
  Container,
  DivMenu,
  Title,
  TextProfile,
  Options,
  DivHaras,
  TextTitle,
} from './styles'

import { Input } from '../../../components/Forms/Input'
import { InputForm } from '../../../components/Forms/InputForm'
import { Button } from '../../../components/Forms/Button'
import { useState } from 'react'
import { useRegister } from '../../../hooks/useRegister'
import { useAuth } from '../../../hooks/useAuth'
import { Picker } from '@react-native-picker/picker'
import { Box, Select } from 'native-base'

const schema = Yup.object().shape({
  name: Yup.string().required('O Nome é obrigatório'),
  crmv: Yup.string().required('O CRMV é obrigatório'),

  cpf: Yup.number()
    .typeError('CPF composto por número.')
    .required('O CPF é obrigatório'),
  agency: Yup.number()
    .typeError('Agência só aceita número.')
    .required('A agência é obrigatória'),
  count: Yup.number()
    .typeError('Conta composta por número.')
    .required('A Conta é obrigatória'),
  email: Yup.string().required('O Email é obrigatório'),
  valueBotuflex: Yup.string().required('O Valor com Botuflex é obrigatório'),
  valueNoBotuflex: Yup.string().required('O Valor sem Botuflex é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
  confirmPassword: Yup.string().required('Confirme sua senha'),
})
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
export function EditVeterinarian({ route, navigation }) {
  const [cpf, setCpf] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const {
    editVeterinarian,
    statusRegister,
    getVeterinarian,
    dataResponseVeterinarian,
    setDataResponseVeterinarian,
  } = useRegister()
  useEffect(() => {
    async function loadVeterinarian() {
      await getVeterinarian(route.params.veterinarian.harasId)
    }

    loadVeterinarian()
  }, [])

  const { user } = useAuth()
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    async function loadVeterinarian() {
      getVeterinarian(route.params.veterinarian.uid)
    }

    loadVeterinarian()

    wait(2000).then(() => setRefreshing(false))
  }, [console.log('user', dataResponseVeterinarian)])
  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value)
  async function handleRegister() {
    const result = await editVeterinarian(dataResponseVeterinarian).then(
      (res) => {
        console.log(res)
        if (res.success) {
          Alert.alert(`Sucesso`, `${res.message}`, [
            { text: 'OK', onPress: () => navigation.navigate('Veterinários') },
          ])
        }
      },
    )

    console.log(result)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container
        decelerationRate={0}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Title>Editar Veterinário</Title>

        <DivMenu horizontal={false}>
          <TextTitle>Nome Completo</TextTitle>

          <Options>
            <TextProfile
              value={dataResponseVeterinarian?.name}
              onChangeText={(e) =>
                setDataResponseVeterinarian((prevState) => ({
                  ...prevState,
                  name: e,
                }))
              }
            />
          </Options>
          <TextTitle>CRMV</TextTitle>

          <Options>
            <TextProfile
              value={dataResponseVeterinarian?.crmv}
              onChangeText={(e) =>
                setDataResponseVeterinarian((prevState) => ({
                  ...prevState,
                  crmv: e,
                }))
              }
            />
          </Options>
          <TextTitle>CPF</TextTitle>

          <Options>
            <TextProfile
              value={dataResponseVeterinarian?.cpf}
              keyboardType='number-pad'
              onChangeText={(e) =>
                setDataResponseVeterinarian((prevState) => ({
                  ...prevState,
                  cpf: e,
                }))
              }
            />
          </Options>
          <TextTitle>Email</TextTitle>

          <Options>
            <TextProfile
              value={dataResponseVeterinarian?.email}
              disableFullscreenUI
            />
          </Options>
          <TextTitle>Valor com Botuflex</TextTitle>

          <Options>
            <NumberFormat
              value={dataResponseVeterinarian?.valueBotuflex}
              displayType={'text'}
              thousandSeparator={true}
              allowNegative={false}
              decimalSeparator={'.'}
              prefix={'R$'}
              renderText={(formattedValue) => (
                <TextProfile
                  onChangeText={(e) =>
                    setDataResponseVeterinarian((prevState) => ({
                      ...prevState,
                      valueBotuflex: e,
                    }))
                  }
                >
                  {formattedValue}
                </TextProfile>
              )}
            />
          </Options>
          <TextTitle>Valor sem botuflex</TextTitle>
          <Options>
            <NumberFormat
              value={dataResponseVeterinarian?.valueNoBotuflex}
              displayType={'text'}
              thousandSeparator={true}
              allowNegative={false}
              decimalSeparator={'.'}
              prefix={'R$'}
              renderText={(formattedValue) => (
                <TextProfile
                  onChangeText={(e) =>
                    setDataResponseVeterinarian((prevState) => ({
                      ...prevState,
                      valueNoBotuflex: e,
                    }))
                  }
                >
                  {formattedValue}
                </TextProfile>
              )}
            />
            {/* <TextProfile
              value={dataResponseVeterinarian?.valueNoBotuflex}
              keyboardType='number-pad'
              onChangeText={(e) =>
                setDataResponseVeterinarian((prevState) => ({
                  ...prevState,
                  valueNoBotuflex: e,
                }))
              }
            /> */}
          </Options>
          <TextTitle>Banco</TextTitle>
          <Box w='full' maxW='500' px={8}>
            <Select
              selectedValue={dataResponseVeterinarian?.bank}
              onValueChange={(itemValue, itemIndex) =>
                setDataResponseVeterinarian((prevState) => ({
                  ...prevState,
                  bank: itemValue,
                }))
              }
            >
              {_.map(Banks, (animal, index) => {
                return (
                  <Select.Item
                    key={index}
                    label={`${animal.value} - ${animal.label} `}
                    value={animal.value + ' - ' + animal.label}
                  />
                )
              })}
            </Select>
          </Box>

          <TextTitle>Agência</TextTitle>
          <Options>
            <TextProfile
              value={dataResponseVeterinarian?.agency}
              keyboardType='number-pad'
              onChangeText={(e) =>
                setDataResponseVeterinarian((prevState) => ({
                  ...prevState,
                  agency: e,
                }))
              }
            />
          </Options>
          <TextTitle>Conta com dígito</TextTitle>

          <Options>
            <TextProfile
              value={dataResponseVeterinarian?.count}
              keyboardType='number-pad'
              onChangeText={(e) =>
                setDataResponseVeterinarian((prevState) => ({
                  ...prevState,
                  count: e,
                }))
              }
            />
          </Options>

          <Button title={statusRegister} onPress={() => handleRegister()} />
        </DivMenu>
      </Container>
    </TouchableWithoutFeedback>
  )
}
