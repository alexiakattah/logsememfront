import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'

import { Container, DivMenu, Title } from './styles'

import { Input } from '../../../components/Forms/Input'
import { InputForm } from '../../../components/Forms/InputForm'
import { Button } from '../../../components/Forms/Button'
import { useState } from 'react'
import { useRegister } from '../../../hooks/useRegister'

interface FormData {
  name: string
  crmv: string
  cpf: number
  email: string
  password: string
  confirmPassword: string
  valueBotuflex: number
  valueNoBotuflex: number
  agency: number
  count: number
}

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

export function CreateVeterinarian() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { registerVeterinarian, statusRegister } = useRegister()

  async function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      crmv: form.crmv,
      cpf: form.cpf,
      email: form.email,
      valueBotuflex: form.valueBotuflex,
      password: form.password,
      confirmPassword: form.confirmPassword,
      valueNoBotuflex: form.valueNoBotuflex,
      agency: form.agency,
      count: form.count,
    }
    const result = await registerVeterinarian(
      form.name,
      form.crmv,
      form.cpf,
      form.email,
      form.valueBotuflex,
      form.password,
      form.confirmPassword,
      form.valueNoBotuflex,
      form.agency,
      form.count,
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Title>Cadastro Veterinário</Title>

        <DivMenu horizontal={false}>
          <InputForm
            control={control}
            name='name'
            autoCorrect={false}
            placeholder='Nome completo'
            error={errors.name && errors.name.message}
          />

          <InputForm
            control={control}
            name='crmv'
            autoCorrect={false}
            placeholder='CRMV'
            error={errors.crmv && errors.crmv.message}
          />

          <InputForm
            control={control}
            name='cpf'
            autoCorrect={false}
            placeholder='CPF'
            keyboardType='numeric'
            error={errors.cpf && errors.cpf.message}
          />

          <InputForm
            control={control}
            name='email'
            autoCorrect={false}
            placeholder='Email'
            keyboardType='email-address'
            error={errors.email && errors.email.message}
          />

          <InputForm
            control={control}
            name='password'
            autoCorrect={false}
            placeholder='Senha'
            error={errors.password && errors.password.message}
          />

          <InputForm
            control={control}
            name='confirmPassword'
            autoCorrect={false}
            placeholder='Confirmar senha'
            error={errors.confirmPassword && errors.confirmPassword.message}
          />

          <InputForm
            control={control}
            name='valueBotuflex'
            autoCorrect={false}
            placeholder='Valor com botuflex'
            keyboardType='numeric'
            error={errors.valueBotuflex && errors.valueBotuflex.message}
          />

          <InputForm
            control={control}
            name='valueNoBotuflex'
            autoCorrect={false}
            placeholder='Valor sem botuflex'
            keyboardType='numeric'
            error={errors.valueNoBotuflex && errors.valueNoBotuflex.message}
          />

          <InputForm
            control={control}
            name='agency'
            autoCorrect={false}
            placeholder='Agência'
            keyboardType='numeric'
            error={errors.agency && errors.agency.message}
          />

          <InputForm
            control={control}
            name='count'
            autoCorrect={false}
            placeholder='Conta com dígito'
            keyboardType='numeric'
            error={errors.count && errors.count.message}
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
