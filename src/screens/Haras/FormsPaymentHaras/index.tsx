import React, { useEffect } from 'react'
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
} from './styles'
import _ from 'underscore'
import { MaterialIcons } from '@expo/vector-icons'
import { Button } from '../../../components/Forms/Button'
import card from '../../../assets/images/card.png'

import { useRegister } from '../../../hooks/useRegister'

export function FormsPaymentHaras({ navigation }: any) {
  const { getCreditCardsHaras, dataResponseCreditCards } = useRegister()

  useEffect(() => {
    async function loadCreditCards() {
      await getCreditCardsHaras()
    }

    loadCreditCards()
  }, [])
  return (
    <Container>
      {/* <Header>
        <Text>Veterinários</Text>
      </Header> */}
      {/* <Title>Formas de Pagamento</Title> */}

      <DivMenu horizontal={false}>
        {dataResponseCreditCards &&
          _.map(dataResponseCreditCards, (credtidCart: any, index) => {
            return (
              <Options key={index}>
                <DivHaras>
                  <Div>
                    <PhotoHaras source={card}></PhotoHaras>
                    <Name>
                      <TextProfile>
                        {credtidCart.typeCart === 'credit'
                          ? 'Crédito'
                          : credtidCart.typeCart === 'debit'
                          ? 'Débito'
                          : ''}{' '}
                        {credtidCart.apelido ? `- ${credtidCart.apelido}` : ''}
                      </TextProfile>
                      <Crmv> {credtidCart.number}</Crmv>
                    </Name>
                  </Div>
                  <Div>
                    <Icon>
                      <MaterialIcons
                        name='arrow-forward-ios'
                        size={15}
                        color='#474747'
                        style={{
                          justifyContent: 'flex-end',
                        }}
                      />
                    </Icon>
                  </Div>
                </DivHaras>
              </Options>
            )
          })}

        <Button
          onPress={() => navigation.navigate('CreateCreditCard')}
          title='Cadastrar'
        />
      </DivMenu>
    </Container>
  )
}
