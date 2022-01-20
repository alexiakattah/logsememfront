import React, { useEffect, FormEvent, useState } from 'react'

import { Container, Text, ContainerImage, DivMenu, TextBack } from './styles'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useAuth } from '../../hooks/useAuth'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputForm } from '../../components/Forms/InputForm'
import { BackButton } from '../../components/BackButton'
import { MaterialIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { Button } from '../../components/Forms/Button'
interface FormData {
  email: string
  password: string
}
const schema = Yup.object().shape({
  email: Yup.string().required('O Email é obrigatório'),
  password: Yup.string().required('A Senha é obrigatória'),
})

export function Signin({ navigation }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { loginUser, authenticatedUser, statusLogin } = useAuth()

  const handleRegister = async (form: FormData) => {
    const data = {
      email: form.email,
      senha: form.password,
    }

    const responseLoginUser = await loginUser(form.email, form.password)
    if (responseLoginUser) {
      console.log('logadooooo')
    }
  }

  useEffect(() => {
    if (authenticatedUser) {
      console.log('tudo certoooo')
    }
  }, [authenticatedUser])

  return (
    <Container>
      <DivMenu horizontal={false}>
        <BackButton onPress={() => navigation.navigate('Welcome')}></BackButton>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ContainerImage>
              <Text>Entrar</Text>
            </ContainerImage>
            <InputForm
              control={control}
              name='email'
              autoCorrect={false}
              placeholder='email'
              error={errors.email && errors.email.message}
              // onChangeText={(event) => setEmail(event)}
            />

            <InputForm
              control={control}
              name='password'
              textContentType='password'
              secureTextEntry={true}
              autoCorrect={false}
              placeholder='Senha'
              error={errors.password && errors.password.message}
            />

            <Button
              title={statusLogin}
              onPress={handleSubmit(handleRegister)}
            />
          </>
        </TouchableWithoutFeedback>
      </DivMenu>
    </Container>
  )
}
