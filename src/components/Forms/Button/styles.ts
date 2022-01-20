import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Container = styled(RectButton)`
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.header};
  width: 70%;
  align-self: center;
  margin: ${RFPercentage(2)}px;
  margin-top: ${RFPercentage(5)}px;
  border-radius: 25px;
`
export const Title = styled.Text`
  font-size: 18px;
  text-align: center;
  align-self: center;
  margin: ${RFPercentage(1.5)}px;
  color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.medium};
`
