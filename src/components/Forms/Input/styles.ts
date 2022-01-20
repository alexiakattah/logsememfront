import styled from 'styled-components/native'
import { TextInput } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Container = styled(TextInput)`
  flex-direction: row;
  margin-left: ${RFPercentage(4)}px;
  margin-right: ${RFPercentage(4)}px;
  margin-top: ${RFPercentage(2)}px;
  border-color: #cbc9d9;
  border-width: 1px;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.textNormal};
  font-family: ${({ theme }) => theme.fonts.regular};
  padding: ${RFPercentage(1)}px;
  font-size: 14px;
`
export const DivMenu = styled.ScrollView``

export const TextProfile = styled.TextInput`
  font-size: 14px;
  width: 100%;
  /* margin-left: ${RFPercentage(1)}px; */
  /* margin-right: ${RFPercentage(29)}px; */
  color: ${({ theme }) => theme.colors.textNormal};
  font-family: ${({ theme }) => theme.fonts.regular};
`
