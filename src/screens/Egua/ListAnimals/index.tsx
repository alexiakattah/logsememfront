import React, { useState } from 'react'
import { Keyboard, View, TouchableWithoutFeedback, Platform } from 'react-native'
import AppLoading from 'expo-app-loading'
import * as Location from 'expo-location'
import { InputForm } from '../../../components/Forms/InputForm'
import { Feather } from '@expo/vector-icons'
import * as Yup from 'yup'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import * as _ from 'underscore'
import {
  Container,
  SchedulesDetails,
  AnimalsSchedules,
  TitleAnimal,
  AnimalsDetails,
  Details,
  Botuflex,
  Motoboy,
  Veterinarian,
  City,
  PhotoAnimalDetails,
  ViewFlex,
} from './styles'
import { useTheme } from 'styled-components/native'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../../../components/Forms/Button'
import { useForm } from 'react-hook-form'

import { useAuth } from '../../../hooks/useAuth'
import { useRegister } from '../../../hooks/useRegister'
import { useEffect } from 'react'
import { db } from '../../../firebase/firebase'
import { auth } from '../../../firebase'
interface FormData {
  search: string
}

const schema = Yup.object().shape({
  search: Yup.string().required('O Nome do animal é obrigatório'),
})
export function ListAnimals({ navigation }) {
  const [longitude, setLongitude] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [location, setLocation] = useState(null)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  // useEffect(() => {
  //   async function loadfindAnimals() {
  //     await findCurrentLocation()
  //   }

  //   loadfindAnimals()
  // }, [findCurrentLocation])
  const { findAnimals, dataFindAnimals, isLoading, searchRegister } =
    useRegister()

  async function findCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)

    let text = 'Waiting..'
    if (errorMsg) {
      text = errorMsg
    } else if (location) {
      text = JSON.stringify(location)
    }
  }
  async function findAnimal(form: FormData) {
    const result = await findAnimals(form.search)
  }
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
      alert('Must use physical device for Push Notifications')
    }

    if (token) {
    
        const authUser = await auth.getAuthUser()
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

  const theme = useTheme()
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <View>
          <InputForm
            placeholder='Numero do registro ou nome do animal'
            name='search'
            control={control}
            error={errors.search && errors.search.message}
          ></InputForm>
          {/* <Feather name='search' size={24} color={theme.colors.font_light} /> */}
        </View>
        <View>
          <Button title={searchRegister} onPress={handleSubmit(findAnimal)} />
        </View>
        <SchedulesDetails
          showsVerticalScrollIndicator={false}
          horizontal={false}
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
          {isLoading ? (
            <AppLoading />
          ) : (
            _.map(dataFindAnimals, (animal: any, index: any) => {
              return (
                <AnimalsDetails
                  key={index}
                  onPress={() =>
                    navigation.navigate('AnimalDetails', {
                      itemId: `${animal.uid}`,
                      animal: animal,
                    })
                  }
                >
                  <PhotoAnimalDetails
                    source={{
                      uri: animal.urlImage,
                    }}
                  ></PhotoAnimalDetails>
                  <Details>
                    <TitleAnimal>{animal.name}</TitleAnimal>
                    <City>Divinópolis, MG</City>
                    <Veterinarian>Registro: {animal.register}</Veterinarian>
                    <Motoboy></Motoboy>
                    <Botuflex></Botuflex>
                  </Details>
                </AnimalsDetails>
              )
            })
          )}
        </SchedulesDetails>
      </Container>
    </TouchableWithoutFeedback>
  )
}
