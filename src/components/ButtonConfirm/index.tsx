import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { Container, Title, Div, SubTitle } from './styles'

import { FontAwesome } from '@expo/vector-icons'

interface Props extends RectButtonProps {
  title: string
  subTitle: string
}
export function ButtonConfirm({ title, subTitle, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Div>
        <FontAwesome name='check' size={28} color='white' />
      </Div>
      <Div>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </Div>
    </Container>
  )
}
