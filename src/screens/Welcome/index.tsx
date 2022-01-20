import React from 'react'
import { Container, Logo, ContainerImage, WelcomeText, Text } from './styles'
import {Button} from '../../components/Forms/Button'
import {ButtonWhite} from '../../components/Forms/ButtonWhite'
import logo from '../../assets/images/logo.png'
export function Welcome({navigation}: any) {
  return (
    <Container>
      <ContainerImage>
        <Logo source={logo} />
      </ContainerImage>
      <WelcomeText>
        
      Bem vindo
      </WelcomeText>
      <Text>Lorem ipsum dolor sit amet</Text>
      <ButtonWhite title='Entrar' onPress={()=> navigation.navigate('Signin')}></ButtonWhite>
      <Button title='Cadastre-se'onPress={()=> navigation.navigate('Register')}></Button>

    </Container>
  )
}
