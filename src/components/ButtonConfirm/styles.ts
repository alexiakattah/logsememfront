import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Container = styled(RectButton)`
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.header};
  /* padding: 5px 0px; */
  width: 90%;
  justify-content: center;
  align-self: center;
  /* margin: ${RFPercentage(2)}px; */
  margin-top: ${RFPercentage(5)}px;
  border-radius: 100px;
  flex-direction: row;
  display: flex;
  align-items: center;
`
export const Title = styled.Text`
  font-size: 16px;
  text-align: center;
  align-self: center;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.medium};
`
export const SubTitle = styled.Text`
  font-size: 12px;
  text-align: center;
  align-self: center;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.medium};
`
export const Div = styled.View`
  margin: ${RFPercentage(1)}px ${RFPercentage(1)}px ${RFPercentage(1)}px 0px;
`
