import React from 'react'
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

export function CreateCreditCard() {


  const [typeCart, setTypeCart] = useState('credit')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { createNewCreditCard, statusRegister } = useRegister()

  async function handleRegister(form: FormData) {
    console.log(form, typeCart)
    const result = await createNewCreditCard(
      form.cpfTitular,
      form.number,
      form.validate,
      form.cvv,
      form.nameTitular,
      form.apelido,
      typeCart
    )
    console.log(result)
  }
  function mcc(v){
    var { name, type, text } = v;
    console.log('vvvv', name, type)
    v=v.replace(/\D/g,"");
    v=v.replace(/^(\d{4})(\d)/g,"$1 $2");
    v=v.replace(/^(\d{4})\s(\d{4})(\d)/g,"$1 $2 $3");
    v=v.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g,"$1 $2 $3 $4");
    return v;
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
          <InputForm
            control={control}
            name='number'
            autoCorrect={false}
            // onChange={(e)=>mcc(e)}
            keyboardType='numeric'
            placeholder='Número do cartão'
            error={errors.number && errors.number.message}
          />

          <InputForm
            control={control}
            name='validate'
            autoCorrect={false}
            placeholder='Validade'
            keyboardType='numeric'
            error={errors.validate && errors.validate.message}
          />

          <InputForm
            control={control}
            name='cvv'
            autoCorrect={false}
            placeholder='CVV'
            keyboardType='numeric'
            error={errors.cvv && errors.cvv.message}
          />

          <InputForm
            control={control}
            name='nameTitular'
            autoCorrect={false}
            placeholder='Nome do titular'
            error={errors.nameTitular && errors.nameTitular.message}
          />

          <InputForm
            control={control}
            name='cpfTitular'
            autoCorrect={false}
            keyboardType='numeric'
            placeholder='CPF/CNPJ do titular'
            error={errors.cpfTitular && errors.cpfTitular.message}
          />

          <InputForm
            control={control}
            name='apelido'
            autoCorrect={false}
            placeholder='Apelido do cartão'
            error={errors.apelido && errors.apelido.message}
          />

          <Button
            title={statusRegister}
            onPress={handleSubmit(handleRegister)}
          />
        </DivMenu>
      </Container>
    </TouchableWithoutFeedback>
  )
}
