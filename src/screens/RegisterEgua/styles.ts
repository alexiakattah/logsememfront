import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import {RectButton} from 'react-native-gesture-handler'
export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  margin: 10px;
`

export const Options = styled(RectButton)`
flex-direction: row;



  margin-left: ${RFPercentage(4)}px;
  margin-right: ${RFPercentage(4)}px;
  margin-top: ${RFPercentage(4)}px;
  border-bottom-color: #CBC9D9;
  border-bottom-width: 1px;
  padding-bottom: ${RFPercentage(3)}px;
`
export const Image = styled(RectButton)`
margin-top: ${RFPercentage(5)}px;
`
export const Welcome = styled.Text`
margin: ${RFPercentage(4)}px  auto ${RFPercentage(8)}px auto;
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.colors.welcome};
  font-family: ${({ theme }) => theme.fonts.bold};
`
export const Text = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.subtitle};
  font-family: ${({ theme }) => theme.fonts.regular};
`
export const TextPurple = styled.Text`
font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.purple};
  font-family: ${({ theme }) => theme.fonts.medium};
`
export const Div = styled.View`
flex-direction: row;
align-items: center;
text-align: center;
margin: auto;
`
export const ButtonLogin = styled(RectButton)`
font-size: 16px;
  text-align: center;

  color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.medium};
`
