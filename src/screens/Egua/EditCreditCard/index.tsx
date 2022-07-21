import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { Container, DivMenu, Title, Column, TextSmall } from './styles'

import { Input } from '../../../components/Forms/Input'
import { InputForm } from '../../../components/Forms/InputForm'
import { Button } from '../../../components/Forms/Button'
import { useState } from 'react'
import { useRegister } from '../../../hooks/useRegister'
import moment from 'moment'

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
  validate: Yup.date()
    .typeError('Agência só aceita número.')
    .required('A agência é obrigatória'),
  cvv: Yup.number()
    .typeError('Conta composta por número.')
    .required('A Conta é obrigatória'),
  nameTitular: Yup.string().required('O Email é obrigatório'),
  apelido: Yup.string().required('O Valor com Botuflex é obrigatório'),
  // typeCart: Yup.string().required('O Valor com Botuflex é obrigatório'),
})

export function EditCreditCard({ route }: any) {
  console.log(route)

  const [typeCart, setTypeCart] = useState('credit')
  const [dataCard, setDataCard] = useState({})

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { editCreditCard, statusRegister } = useRegister()

  async function handleRegister() {
   
    const result = await editCreditCard(dataCard)
    console.log(result)
  }
  useEffect(() => {
    async function getAnimal() {
      console.log('uid aqui', route)
      setDataCard(route.params.credtidCart)
      setTypeCart(route.params.credtidCart.typeCart)
      console.log(dataCard);
      
    }
    getAnimal()
  }, [])
  function mcc(v) {
    var { name, type, text } = v
    console.log('vvvv', name, type)
    v = v.replace(/\D/g, '')
    v = v.replace(/^(\d{4})(\d)/g, '$1 $2')
    v = v.replace(/^(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3')
    v = v.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3 $4')
    return v
  }

  function handleOnChange(value: any, name: any) {
    setDataCard((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Title>Novo Cartão</Title>

        <DivMenu horizontal={false}>
          <Column>
            <RadioButton
              value='credit'
              status={typeCart === 'credit' ? 'checked' : 'unchecked'}
              onPress={() => setTypeCart('credit')}
            />
            <TextSmall>Crédito</TextSmall>

            <RadioButton
              value='debit'
              status={typeCart === 'debit' ? 'checked' : 'unchecked'}
              onPress={() => setTypeCart('debit')}
            />
            <TextSmall>Débito</TextSmall>
          </Column>
          <Input
            value={String(dataCard.number)}
            placeholder='Numero'
            onChangeText={(e) => handleOnChange(e, 'number')}
          />
          <Input
            value={moment(dataCard.validate).format('MM/YY')}
            placeholder='Validade'
            onChangeText={(e) => handleOnChange(e, 'validate')}
          />
          <Input
            value={dataCard && String(dataCard.cvv)}
            placeholder='CVV'
            onChangeText={(e) => handleOnChange(e, 'cvv')}
            keyboardType='numeric'
            autoCorrect={false}
          />
          <Input
            value={dataCard && dataCard.nameTitular}
            placeholder='Nome do Titular'
            onChangeText={(e) => handleOnChange(e, 'nameTitular')}
            keyboardType='numeric'
            autoCorrect={false}
          />
          <Input
            value={String(dataCard.cpfTitular)}
            placeholder='CPF/CNPJ do titular'
            onChangeText={(e) => handleOnChange(e, 'cpfTitular')}
            keyboardType='numeric'
            autoCorrect={false}
          />
          <Input
            value={String(dataCard.apelido)}
            placeholder='CPF/CNPJ do titular'
            onChangeText={(e) => handleOnChange(e, 'apelido')}
        
            autoCorrect={false}
          />


         

        
          <Button
            title={statusRegister}
            onPress={handleRegister}
          />
        </DivMenu>
      </Container>
    </TouchableWithoutFeedback>
  )
}
