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
  Div,
  Name,
  Title,
  Crmv,
} from './styles'
import _ from 'underscore'
import { MaterialIcons } from '@expo/vector-icons'
import { Button } from '../../../components/Forms/Button'
import { useRegister } from '../../../hooks/useRegister'

export function Veterinarians({ navigation }: any) {
  const { getVeterinarians, dataResponseVeterinarians } = useRegister()

  useEffect(() => {
    async function loadVeterinarians() {
      await getVeterinarians()
    }

    loadVeterinarians()
  }, [])
  return (
    <Container>
      {/* <Header>
        <Text>Veterinários</Text>
      </Header> */}
      <Title>Meus Veterinários</Title>

      <DivMenu horizontal={false}>
        {dataResponseVeterinarians &&
          _.map(dataResponseVeterinarians, (veterinarians: any, index) => {
            return (
              <Options key={index}>
                <DivHaras>
                  <Div>
                    <PhotoHaras
                      source={{
                        uri: 'https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2018%2F03%2F07%2F20%2FLogo-234918_70207_204757969_278263886.jpg',
                      }}
                    ></PhotoHaras>
                    <Name>
                      <TextProfile> {veterinarians.name}</TextProfile>
                      <Crmv> CRMV {veterinarians.crmv}</Crmv>
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
          onPress={() => navigation.navigate('CreateVeterinarian')}
          title='Cadastrar'
        />
      </DivMenu>
    </Container>
  )
}
