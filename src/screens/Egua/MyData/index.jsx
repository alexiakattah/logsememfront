import React, { useCallback, useEffect, useState } from 'react'
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
  Title,
  Div,
  Crmv,
  TextTitle,
} from './styles'
import _ from 'underscore'
import { MaterialIcons } from '@expo/vector-icons'
import { Button } from '../../../components/Forms/Button'
import card from '../../../assets/images/card.png'

import { useRegister } from '../../../hooks/useRegister'
import { useAuth } from '../../../hooks/useAuth'
import { RefreshControl } from 'react-native'

export function MyData({ navigation }) {
  const { getCreditCards, dataResponseCreditCards } = useRegister()
  const { user } = useAuth()
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    async function loadReserves() {
      user
    }

    loadReserves()

    wait(2000).then(() => setRefreshing(false))
  }, [])
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  useEffect(() => {
    async function loadCreditCards() {
      await getCreditCards()
    }

    loadCreditCards()
  }, [])
  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* <Header>
        <Text>Veterinários</Text>
      </Header> */}
      {/* <Title>Formas de Pagamento</Title> */}

      <DivMenu horizontal={false}>
        <TextTitle>Nome do Responsável</TextTitle>
        <Options>
          <DivHaras>
            <TextProfile>{user.nameResponsible}</TextProfile>
          </DivHaras>
        </Options>
        <TextTitle>CPF</TextTitle>
        <Options>
          <DivHaras>
            <TextProfile>{user.cpf}</TextProfile>
          </DivHaras>
        </Options>

        <TextTitle>Email</TextTitle>
        <Options>
          <DivHaras>
            <TextProfile>{user.email}</TextProfile>
          </DivHaras>
        </Options>
        <TextTitle>CEP</TextTitle>
        <Options>
          <DivHaras>
            <TextProfile>{user.cep}</TextProfile>
          </DivHaras>
        </Options>

        <TextTitle>Endereço</TextTitle>
        <Options>
          <DivHaras>
            <TextProfile>{user.street}</TextProfile>
          </DivHaras>
        </Options>

        <TextTitle>Bairro</TextTitle>
        <Options>
          <DivHaras>
            <TextProfile>{user.neighborhood}</TextProfile>
          </DivHaras>
        </Options>

        <TextTitle>Número</TextTitle>
        <Options>
          <DivHaras>
            <TextProfile>{user.number}</TextProfile>
          </DivHaras>
        </Options>

        <TextTitle>Complemento</TextTitle>
        <Options>
          <DivHaras>
            <TextProfile>{user.complement}</TextProfile>
          </DivHaras>
        </Options>
        <TextTitle>Cidade/Estado</TextTitle>
        <Options>
          <DivHaras>
            <TextProfile>{`${user.city ? user.city : ''} - ${
              user.state ? user.state : ''
            }`}</TextProfile>
          </DivHaras>
        </Options>

        <Button
          onPress={() => navigation.navigate('EditMyData')}
          title='Editar'
        />
      </DivMenu>
    </Container>
  )
}
