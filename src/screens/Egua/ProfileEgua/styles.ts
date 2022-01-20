import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const NameHaras = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-top: ${RFPercentage(8)}px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  padding-left: ${RFPercentage(2)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`
export const DivHaras = styled.View`
  flex-direction: row;
  display: flex;
  align-items: center;
  margin: ${RFPercentage(2)}px;
  /* background-color: blueviolet; */
`
export const PhotoHaras = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  border-radius: ${RFPercentage(100)}px;
`

export const Text = styled.Text`
  font-size: 20px;
  text-align: center;
  align-self: center;
  align-content: space-around;
  margin-top: ${RFPercentage(8)}px;

  color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.medium};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(15)}px;
  background-color: ${({ theme }) => theme.colors.header};
`
export const Icon = styled.View`
  flex-direction: row-reverse;
  /* flex-direction: row; */
  justify-content: flex-end;
`
export const Name = styled.View`
  align-self: flex-start;
  flex-direction: row;
`
export const Options = styled(RectButton)`
  flex-direction: row;

  margin-left: ${RFPercentage(4)}px;
  margin-right: ${RFPercentage(4)}px;
  margin-top: ${RFPercentage(4)}px;
  border-bottom-color: #cbc9d9;
  border-bottom-width: 1px;
  padding-bottom: ${RFPercentage(3)}px;
`
export const DivMenu = styled.ScrollView``
export const TextProfile = styled.Text`
  font-size: 17px;

  margin-left: ${RFPercentage(2)}px;
  /* margin-right: ${RFPercentage(29)}px; */
  color: ${({ theme }) => theme.colors.textNormal};
  font-family: ${({ theme }) => theme.fonts.regular};
`
