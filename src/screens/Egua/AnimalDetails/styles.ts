import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.ScrollView`
flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`
export const Margin = styled.View`
  padding-bottom: ${RFPercentage(5)}px;
`

export const Text = styled.Text`
  text-align: center;
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
`
export const TextSmall = styled.Text`
  text-align: center;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.font_light};
`
export const PhotoAnimalDetails = styled.Image`
  margin-top: ${RFPercentage(5)}px;
  margin-left: ${RFPercentage(3)}px;
  margin-right: ${RFPercentage(3)}px;
  width: auto;
  height: ${RFPercentage(30)}px;
  border-radius: 5px;
`
