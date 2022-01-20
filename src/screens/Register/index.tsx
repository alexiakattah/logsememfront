import React from 'react'
import { Container, Logo, ContainerImage, Welcome, Text , Image} from './styles'
import { Button } from '../../components/Forms/Button'
import { ButtonWhite } from '../../components/Forms/ButtonWhite'
import logo from '../../assets/images/logo.png'

import { Ionicons } from '@expo/vector-icons'
export function Register({ navigation }: any) {
  return (
    <Container>
      <Image onPress={() => navigation.navigate('Welcome')}>
       
       <Ionicons name='arrow-back' size={30} color='black' /> 
      </Image>
      <ContainerImage>
        <Logo source={logo} />
      </ContainerImage>
      <Welcome>Selecione o tipo de cadastro </Welcome>
      <Text>Lorem ipsum dolor sit amet</Text>
      <Button
        title='Cavalo'
        onPress={() => navigation.navigate('NewUser')}
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
