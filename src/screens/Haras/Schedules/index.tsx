import React, { useEffect, useState, useCallback } from 'react'
import {
  Container,
  Text,
  Header,
  Title,
  AnimalsSchedules,
  Animal,
  TitleAnimal,
  PhotoAnimal,
  SchedulesDay,
  SchedulesDetails,
  AnimalsDetails,
  Details,
  Botuflex,
  Motoboy,
  Veterinarian,
  City,
  PhotoAnimalDetails,
  ViewFlex,
} from './styles'
import { db } from '../../../firebase/firebase'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import moment from 'moment'
import 'moment/src/locale/pt'
import 'moment/min/moment-with-locales'
import _ from 'underscore'
import { Platform, RefreshControl } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'
import { useReserve } from '../../../hooks/useReserve'
import { useRegister } from '../../../hooks/useRegister'
import { auth } from '../../../firebase'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export function Schedules({ navigation }: any) {
  const { getAnimalsDay, dataGetAnimalsDay } = useReserve()
  const { getVeterinarians, dataResponseVeterinarians } = useRegister()
  moment.locale('pt-br')

  const [refreshing, setRefreshing] = useState(false)
  useEffect(() => {
    async function loadReserves() {
      getAnimalsDay()
      getVeterinarians()
      dataGetAnimalsDay
    }

    loadReserves()
  }, [])
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    async function loadReserves() {
      getVeterinarians()
      getAnimalsDay()
      await dataGetAnimalsDay
    }

    loadReserves()

    wait(2000).then(() => setRefreshing(false))
  }, [])
  useEffect(() => {
    ;(() => registerForPushNotificationsAsync())()
  }, [])
  async function registerForPushNotificationsAsync() {
    let token
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      token = (await Notifications.getExpoPushTokenAsync()).data
      console.log(token)
    } else {
      alert('Utilize o dispositivo físico para receber notificações.')
    }

    if (token) {
    
        const authUser = await auth .getAuthUser()
        console.log('entrou aqui', token)
        if (authUser) {
          await db.ref(`Users/${authUser.uid}`).update({fcmToken:token})
              .then((res) => console.log('res', res))
              .catch((e) => console.log(e))
        }
  
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    return token
  }

  return (
    <Container>
      {/* <Header>
        <Text>Agendamentos</Text>
      </Header> */}
      <AnimalsSchedules
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Title>Agenda do dia</Title>
        <SchedulesDay>
          <AnimalsSchedules
            horizontal={true}
            pagingEnabled={true}
            snapToAlignment={'center'}
            // contentInset={{
            //   top: 0,
            //   left: 30,
            //   bottom: 0,
            //   right: 30,
            // }}
            decelerationRate={0}
          >
            {_.map(dataGetAnimalsDay, (reserve, index) => {
              return (
                <Animal
                  onPress={() =>
                    navigation.navigate('ReserveDetails', {
                      itemId: `${reserve.reserve.uid}`,
                      reserveDetails: reserve.reserve,
                    })
                  }
                >
                  <TitleAnimal>{reserve.reserve.animal.name}</TitleAnimal>
                  <PhotoAnimal
                    source={{
                      uri: reserve.reserve.animal.urlImage,
                    }}
                  ></PhotoAnimal>
                </Animal>
              )
            })}
            {dataGetAnimalsDay.length <= 0 && (
              <Container>
                <Title>Nenhum agendamento para hoje...</Title>
              </Container>
            )}
          </AnimalsSchedules>
        </SchedulesDay>
        <ViewFlex>
          {/* <MaterialIcons name="keyboard-arrow-down" size={24} color="black" /> */}
          <Title>Hoje, {moment().format('DD MMM')}</Title>
        </ViewFlex>
        <SchedulesDetails
          horizontal={false}
          // pagingEnabled={true}
          snapToAlignment={'center'}
          // contentInset={{
          //   top: 0,
          //   left: 30,
          //   bottom: 0,
          //   right: 30,
          // }}
          decelerationRate={0}
        >
          {_.map(dataGetAnimalsDay, (reserve, index) => {
            return (
              <AnimalsDetails key={index}>
                <PhotoAnimalDetails
                  source={{
                    uri: reserve.reserve.egua && reserve.reserve.egua.urlImage,
                  }}
                ></PhotoAnimalDetails>
                <Details>
                  <TitleAnimal>
                    {reserve.reserve.egua && reserve.reserve.egua.name}
                  </TitleAnimal>
                  <City>Animal: {reserve.reserve.animal.name}</City>
                  <Veterinarian>
                    Veterinário:{' '}
                    {dataResponseVeterinarians &&
                      dataResponseVeterinarians[0].name}
                  </Veterinarian>
                  <Motoboy>Motoboy: Fernando</Motoboy>
                  <Botuflex>
                    {reserve.reserve.botuflex === 'botuflex'
                      ? 'Com Botuflex'
                      : 'Sem Botuflex'}
                  </Botuflex>
                </Details>
              </AnimalsDetails>
            )
          })}
          {dataGetAnimalsDay.length <= 0 && (
              <Container>
                <Title>Nenhum agendamento para hoje...</Title>
              </Container>
            )}
        </SchedulesDetails>
      </AnimalsSchedules>
    </Container>
  )
}
