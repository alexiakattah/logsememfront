import React, { useState, Dispatch, SetStateAction } from 'react'
import CalendarPicker from 'react-native-calendar-picker'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { Moment } from 'moment'
import {
  Container,
  PhotoAnimalDetails,
  Text,
  TextSmall,
  Margin,
} from './styles'
import { Button } from '../../../components/Forms/Button'

interface CalendarViewProps {
  startDate: Date
  setStartDate: Dispatch<SetStateAction<Date | null>>
  endDate: Date
  setEndDate: Dispatch<SetStateAction<Date | null>>
  scroll?: boolean
}

export function AnimalDetails({ route }: any) {
  const { itemId, animal } = route.params
  console.log('animal1', animal)
  const navigation = useNavigation()
  // const startDate = selectedStartDate ? selectedStartDate.toString() : ''
  const [startDate, setStartDate] = useState<Date>(null)
  const [endDate, setEndDate] = useState<Date>(null)

  function onDateChange(date: Moment, type: 'START_DATE' | 'END_DATE') {
    if (type === 'END_DATE') {
      if (date) {
        setEndDate(date.toDate())
        return
      }
      setEndDate(null)
    } else {
      setEndDate(date.toDate())
      setStartDate(date.toDate())
    }
  }

  const theme = useTheme()

  return (
    <Container>
      <PhotoAnimalDetails
        source={{
          uri: animal.urlImage,
        }}
      ></PhotoAnimalDetails>
      <Text>{animal.name}</Text>
      <Text>{animal.nameHaras}</Text>
      <TextSmall>Divinópolis MG</TextSmall>
      <Margin></Margin>
      <TextSmall>Dias disponíveis de coleta</TextSmall>
      <CalendarPicker
        startFromMonday
        allowRangeSelection={false}
        minDate={new Date()}
        onDateChange={onDateChange}
        selectedDayTextColor='#000000'
        textStyle={{
          fontFamily: theme.fonts.regular,
          color: theme.colors.textNormal,
        }}
        enableDateChange={true}
        selectedEndDate={startDate}
        selectedStartDate={startDate}
        selectedDayColor={theme.colors.secondary}
        weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
        months={[
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ]}
        previousTitle='<'
        nextTitle='>'
        dayLabelsWrapper={{
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
      />
      <Button
        title='Fazer reserva'
        onPress={() =>
          navigation.navigate('ConfirmReserv', {
            itemId: `${animal.uid}`,
            animal: animal,
            date: startDate,
          })
        }
      />
    </Container>
  )
}
