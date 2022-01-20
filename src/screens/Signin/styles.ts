import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
margin: 30px;
flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`
export const Text = styled.Text`

font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.colors.welcome};
  font-family: ${({ theme }) => theme.fonts.bold};
`
export const ContainerImage = styled.View`
  margin-bottom: ${RFPercentage(10)}px;
  margin-top: ${RFPercentage(10)}px;
  align-items: center;
`
export const DivMenu = styled.ScrollView``
export const BackButton = styled.View`

flex-direction: row;
`
export const TextBack = styled.Button``