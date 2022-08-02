import React from 'react'
import { Container, Logo, ContainerImage, WelcomeText, Text } from './styles'
import { Button } from '../../components/Forms/Button'
import { ButtonWhite } from '../../components/Forms/ButtonWhite'
import logo from '../../assets/images/logo.png'
export function Welcome({ navigation }) {
  return (
    <Container>
      <ContainerImage>
        <Logo source={logo} />
      </ContainerImage>
      <WelcomeText>Bem vindo</WelcomeText>
      <Text>Faça login ou cadastre-se no nosso app.</Text>
      <ButtonWhite
        title='Entrar'
        onPress={() => navigation.navigate('Signin')}
      ></ButtonWhite>
      <Button
        title='Cadastre-se'
        onPress={() => navigation.navigate('Register')}
      ></Button>
    </Container>
  )
}
