import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { Container, Title, Div } from './styles'
import { Feather } from '@expo/vector-icons'; 

interface Props extends RectButtonProps {
  title: string
}
export function ButtonUpload({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Div>

     <Feather name="upload" size={24} color="white" />
      </Div>
      <Title>{title}</Title>
    </Container>
  )
}
