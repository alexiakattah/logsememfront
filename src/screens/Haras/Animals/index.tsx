import React, { useEffect } from 'react'
import _ from 'underscore'

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
  Crmv,
  Div,
} from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import { Button } from '../../../components/Forms/Button'
import { useRegister } from '../../../hooks/useRegister'

export function Animals({ navigation }: any) {
  const { getAnimals, dataResponseAnimals } = useRegister()

  useEffect(() => {
    async function loadAnimals() {
      await getAnimals()
    }
    console.log('eddd', dataResponseAnimals)
    loadAnimals()
  }, [])
  return (
    <Container>
      {/* <Header>
        <Text>Veterinários</Text>
      </Header> */}
      <Title>Meus Animais</Title>

      <DivMenu horizontal={false}>
        {dataResponseAnimals &&
          _.map(dataResponseAnimals, (animal: any, index: any) => {
            return (
              <Options key={index}>
                <DivHaras>
                  <Div>
                    <PhotoHaras
                      source={{
                        uri: animal.urlImage,
                      }}
                    ></PhotoHaras>
                    <Name>
                      <TextProfile> {animal.name}</TextProfile>
                      <Crmv> Registro {animal.register}</Crmv>
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
          onPress={() => navigation.navigate('CreateAnimals')}
          title='Cadastrar'
        />
      </DivMenu>
    </Container>
  )
}
