import React, { useEffect, useState, useCallback } from 'react'

import { TitlePage } from '../../../components/TitlePage'
import {
  Container,
  Title,
  Date,
  TitleAnimal,
  ConfirmReserv,
  Reserv,
  SchedulesDetails,
  AnimalsDetails,
  Details,
  Botuflex,
  Motoboy,
  Veterinarian,
  City,
  PhotoAnimalDetails,
  ReservCancel,
  ReservWaiting,
} from './styles'
import { RefreshControl } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

import _ from 'underscore'
import { useReserve } from '../../../hooks/useReserve'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export function MyReserves({ navigation }: any) {
  const { getReserves, dataReserves } = useReserve()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    async function loadReserves() {
      await getReserves()
    }

    loadReserves()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    async function loadReserves() {
      getReserves()
    }

    loadReserves()

    wait(2000).then(() => setRefreshing(false))
  }, [])

  return (
    <Container>
      <SchedulesDetails
        horizontal={false}
        snapToAlignment={'center'}
        // contentInset={{
        //   top: 0,
        //   left: 30,
        //   bottom: 0,
        //   right: 30,
        // }}
        decelerationRate={0}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Title>Minhas Reservas</Title>

        {dataReserves &&
          _.map(dataReserves, (reserve, index) => {
            return (
              <AnimalsDetails
                onPress={() =>
                  navigation.navigate('ReserveDetails', {
                    itemId: `${reserve.reserve.uid}`,
                    reserveDetails: reserve.reserve,
                  })
                }
                key={index}
              >
                <PhotoAnimalDetails
                  source={{
                    uri: reserve.reserve.egua && reserve.reserve.egua.urlImage,
                  }}
                ></PhotoAnimalDetails>
                <Details>
                  <TitleAnimal>
                    {reserve.reserve.egua && reserve.reserve.egua.name}
                  </TitleAnimal>
                  <City>
                    {reserve.user.street} {reserve.user.number}{' '}
                  </City>
                  <City>
                    {reserve.user.city} {reserve.user.state}
                  </City>

                  <Botuflex>
                    Cavalo:{' '}
                    {reserve.reserve.animal && reserve.reserve.animal.name}
                  </Botuflex>
                  <Date>{reserve.reserve.date}</Date>
                  <ConfirmReserv>
                    {reserve.reserve.delivered === true && (
                      <>
                        <FontAwesome
                          name='check-circle'
                          size={20}
                          color='#42D6A4'
                        />
                        <Reserv>
                          {reserve.reserve.delivered === false
                            ? 'Reserva Agendada'
                            : reserve.reserve.delivered === true
                            ? 'Reserva Confirmada'
                            : reserve.reserve.delivered === 'canceled'
                            ? 'Recusada'
                            : ''}
                        </Reserv>
                      </>
                    )}
                    {reserve.reserve.delivered === 'coleted' && (
                      <>
                        <FontAwesome
                          name='check-circle'
                          size={20}
                          color='#42D6A4'
                        />
                        <Reserv>Coleta realizada</Reserv>
                      </>
                    )}
                    {reserve.reserve.delivered === 'canceled' && (
                      <>
                        <Ionicons
                          name='ios-close-circle-sharp'
                          size={20}
                          color='#fd2a2a'
                        />
                        <ReservCancel>
                          {reserve.reserve.delivered === false
                            ? 'Reserva Agendada'
                            : reserve.reserve.delivered === true
                            ? 'Reserva Confirmada'
                            : reserve.reserve.delivered === 'canceled'
                            ? 'Recusada'
                            : ''}
                        </ReservCancel>
                      </>
                    )}
                    {reserve.reserve.delivered === false && (
                      <>
                        <AntDesign
                          name='minuscircle'
                          size={20}
                          color='#474747'
                        />
                        <ReservWaiting>
                          {reserve.reserve.delivered === false
                            ? 'Reserva Agendada'
                            : reserve.reserve.delivered === true
                            ? 'Reserva Confirmada'
                            : reserve.reserve.delivered === 'canceled'
                            ? 'Reserva recusada'
                            : ''}
                        </ReservWaiting>
                      </>
                    )}
                  </ConfirmReserv>
                </Details>
              </AnimalsDetails>
            )
          })}
      </SchedulesDetails>
    </Container>
  )
}
