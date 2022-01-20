import React, { useState } from 'react'
import { Keyboard, View, TouchableWithoutFeedback } from 'react-native'
import AppLoading from 'expo-app-loading'
import * as Location from 'expo-location'
import { InputForm } from '../../../components/Forms/InputForm'
import { Feather } from '@expo/vector-icons'
import * as Yup from 'yup'
import check from '../../../assets/images/check.gif'
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

interface FormData {
  search: string
}

const schema = Yup.object().shape({
  search: Yup.string().required('O Nome do animal é obrigatório'),
})
export function ReserveConfirmed() {
  // useEffect(() => {
  //   async function loadfindAnimals() {
  //     await findCurrentLocation()
  //   }

  //   loadfindAnimals()
  // }, [findCurrentLocation])
  const { findAnimals, dataFindAnimals, isLoading, searchRegister } =
    useRegister()

  const theme = useTheme()
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <PhotoAnimalDetails
          source={require('../../../assets/images/check.gif')}
        />
        <TitleAnimal>testeeee</TitleAnimal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
