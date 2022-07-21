import React from 'react'
import {
  Container,
  NameHaras,
  DivHaras,
  PhotoHaras,
  Text,
  Header,
  Options,
  DivMenu,
  TextProfile,
  Icon,
  Name,
} from './styles'
import { auth } from '../../../firebase'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { useAuth } from '../../../hooks/useAuth'
export function ProfileEgua({ navigation }: any) {
  const { signOut, user } = useAuth()
  return (
    <Container>
      {/* <Header>
        <Text>Perfil</Text>
      </Header> */}
      <DivHaras>
        <PhotoHaras
          source={{
            uri: 'https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2018%2F03%2F07%2F20%2FLogo-234918_70207_204757969_278263886.jpg',
          }}
        ></PhotoHaras>
        <NameHaras>{user.nameResponsible}</NameHaras>
      </DivHaras>
      <DivMenu>
        {/* <Options>
          <Name>
            <MaterialIcons name='notifications' size={24} color='#474747' />
            <TextProfile> Notificações</TextProfile>
          </Name>
     
        </Options> */}
        <Options onPress={() => navigation.navigate('MyData')}>
          <MaterialIcons name='person-outline' size={24} color='#474747' />
          <TextProfile> Meus Dados</TextProfile>
          {/* <MaterialIcons name="arrow-forward-ios" size={15} color="#474747" /> */}
        </Options>
        <Options>
          <MaterialIcons name='motorcycle' size={24} color='#474747' />
          <TextProfile> Motoboys</TextProfile>
          {/* <MaterialIcons name="arrow-forward-ios" size={15} color="#474747" /> */}
        </Options>
        {/* <Options>
          <MaterialIcons name='credit-card' size={24} color='#474747' />
          <TextProfile> Formas de Recebimento</TextProfile>
       
        </Options> */}
        <Options onPress={() => navigation.navigate('FormsPaymentEgua')}>
          <MaterialIcons name='credit-card' size={24} color='#474747' />

          <TextProfile>Formas de Pagamento</TextProfile>
          {/* <MaterialIcons name="arrow-forward-ios" size={15} color="#474747" /> */}
        </Options>
        <Options onPress={() => navigation.navigate('AnimalsEgua')}>
          <FontAwesome5 name='horse-head' size={24} color='#474747' />
          <TextProfile>Animais</TextProfile>
          {/* <MaterialIcons name="arrow-forward-ios" size={15} color="#474747" /> */}
        </Options>
        <Options onPress={signOut}>
        <MaterialIcons name="logout" size={24} color="#474747" />
          <TextProfile>Sair</TextProfile>
          {/* <MaterialIcons name="arrow-forward-ios" size={15} color="#474747" /> */}
        </Options>
      </DivMenu>
    </Container>
  )
}
