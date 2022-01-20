import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import {RectButton} from 'react-native-gesture-handler'


export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  margin: 30px;
`
export const ContainerImage = styled.View`
  margin-bottom: ${RFPercentage(5)}px;

  align-items: center;
`
export const Image = styled(RectButton)`
margin-top: ${RFPercentage(5)}px;
`
export const Logo = styled.Image`
  margin-top: ${RFPercentage(8)}px;
  width: ${RFValue(150)}px;
`
export const Welcome = styled.Text`
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.colors.welcome};
  font-family: ${({ theme }) => theme.fonts.bold};
`
export const Text = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.subtitle};
  font-family: ${({ theme }) => theme.fonts.regular};
`
