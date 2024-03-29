import React from 'react'
import { Container, Image } from './styles'
import { Ionicons } from '@expo/vector-icons'
import { RectButtonProps } from 'react-native-gesture-handler'

export function BackButton({ ...rest }) {
  return (
    <Container {...rest}>
      <Ionicons name='arrow-back' size={30} color='black' />
    </Container>
  )
}
