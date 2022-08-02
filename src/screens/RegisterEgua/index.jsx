import React, { useEffect } from 'react'
import {
  Container,
  Welcome,
  Text,
  Div,
  TextPurple,
  ButtonLogin,
  Image,
  Options,
} from './styles'
import { Button } from '../../components/Forms/Button'
import { InputForm } from '../../components/Forms/InputForm'

import { Ionicons } from '@expo/vector-icons'
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../../hooks/useAuth'
import { BackButton } from '../../components/BackButton'

const schema = Yup.object().shape({
  nameAnimal: Yup.string().required('O Nome do animal é obrigatório'),
  nameResponsible: Yup.string().required('O Nome do responsável é obrigatório'),

  numberRegister: Yup.number()
    .typeError('Registro composto por número.')
    .required('O Registro é obrigatório'),
  email: Yup.string().required('O Email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
})

export function RegisterEgua({ navigation }) {
  const { registerUserEgua, statusRegister } = useAuth()
  const { loginUser, authenticatedUser, statusLogin } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  async function handleFormRegister(form) {
    console.log('entrou aqui')
    const result = await registerUserEgua(
      form.nameAnimal,
      form.nameResponsible,
      form.numberRegister,
      form.email,
      form.password,
    ).then(async (res) => {
      console.log(res)
      await loginUser(form.email, form.password).then((res) => {
        Alert.alert(`Sucesso`, `Cadastro Realizado com sucesso!`, [
          { text: 'OK', onPress: () => navigation.navigate('ProfileEgua') },
        ])
      })
    })
    console.log('result-->', result)
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <BackButton onPress={() => navigation.goBack()} />

        <Welcome>Cadastro </Welcome>
        <InputForm
          name='nameAnimal'
          error={errors.nameAnimal && errors.nameAnimal.message}
          control={control}
          autoCorrect={false}
          placeholder='Nome do animal'
        />
        <InputForm
          name='nameResponsible'
          error={errors.nameResponsible && errors.nameResponsible.message}
          control={control}
          autoCorrect={false}
          placeholder='Nome do responsável'
        />
        <InputForm
          name='numberRegister'
          error={errors.numberRegister && errors.numberRegister.message}
          control={control}
          autoCorrect={false}
          placeholder='Número do registro'
        />
        <InputForm
          name='email'
          error={errors.email && errors.email.message}
          control={control}
          autoCorrect={false}
          placeholder='Email'
        />
        <InputForm
          name='password'
          error={errors.password && errors.password.message}
          control={control}
          secureTextEntry={true}
          autoCorrect={false}
          placeholder='Senha'
        />

        <Button
          title={statusRegister}
          onPress={handleSubmit(handleFormRegister)}
        ></Button>
        <Div>
          <Text>Já tem uma conta? </Text>
          <ButtonLogin>
            <TextPurple>Faça login</TextPurple>
          </ButtonLogin>
        </Div>
        {/* <Button title='Cavalo'></Button> */}
      </Container>
    </TouchableWithoutFeedback>
  )
}
