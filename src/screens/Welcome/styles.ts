import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  margin: 30px;
`
export const ContainerImage = styled.View`
  margin-bottom: ${RFPercentage(10)}px;

  align-items: center;
`

export const Logo = styled.Image`
  margin-top: ${RFPercentage(15)}px;
  width: ${RFValue(150)}px;
`
export const WelcomeText = styled.Text`
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.colors.welcome};
  font-family: ${({ theme }) => theme.fonts.bold};
`
export const Text = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.subtitle};
  font-family: ${({ theme }) => theme.fonts.regular};
`
