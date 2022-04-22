import React from  'react'
import {Container, Image} from './styles'
import { Ionicons } from '@expo/vector-icons'; 
import { RectButtonProps } from 'react-native-gesture-handler'

interface Props extends RectButtonProps {
  title: string
  subTitle: string
}

export function BackButton({  ...rest }: Props){
  return(
    <Container {...rest}>

      <Ionicons name="arrow-back" size={30} color="black" />
 
    </Container>
  )
}