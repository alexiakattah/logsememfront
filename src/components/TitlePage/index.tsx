import React from 'react'

import { Container} from './styles'
import { TextProps } from 'react-native'

interface Props extends TextProps {
  title: string
}

export function TitlePage({ ...rest }: Props){
  return <Container {...rest} />
}