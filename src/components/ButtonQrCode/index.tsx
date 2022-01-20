import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { Container, Title, Div, SubTitle } from './styles'
import { Feather } from '@expo/vector-icons'

interface Props extends RectButtonProps {
  title: string
  subTitle: string
}
export function ButtonQrCode({ title, subTitle, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Div>
        <Feather name='camera' size={28} color='white' />
      </Div>
      <Div>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </Div>
    </Container>
  )
}
