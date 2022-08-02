import React from 'react'
import { Container, Logo, ContainerImage, Welcome, Image } from './styles'
import { Button } from '../../components/Forms/Button'
import { ButtonWhite } from '../../components/Forms/ButtonWhite'
import logo from '../../assets/images/logo.png'
import { Text } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { BackButton } from '../../components/BackButton'
export function Register({ navigation }) {
  return (
    <Container>
      <BackButton onPress={() => navigation.goBack()} />
      <ContainerImage>
        <Logo source={logo} />
      </ContainerImage>
      <Text alignItems={'center'}>Selecione o tipo de cadastro </Text>
      <Text>Você é proprietário de uma égua ou cavalo?</Text>
      <Button
        title='Cavalo'
        onPress={() => navigation.navigate('RegisterCavalo')}
      ></Button>
      <Button
        title='Égua'
        onPress={() => navigation.navigate('RegisterEgua')}
      ></Button>
      {/* <Button title='Cavalo'></Button>
      <Button title='Cavalo'></Button> */}
    </Container>
  )
}
