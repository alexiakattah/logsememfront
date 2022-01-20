import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`
export const Crmv = styled.Text`
  font-size: 14px;
  margin-left: ${RFPercentage(1)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
`
export const ButtonRegister = styled.TouchableHighlight`
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.header};
  width: 70%;
  align-self: center;
  margin: ${RFPercentage(2)}px;
  margin-top: ${RFPercentage(5)}px;
  border-radius: 25px;
`
export const Column = styled.View`
  flex-direction: row;
  align-content: center;
  padding: 5px;
  align-items: center;
`
export const TextSmall = styled.Text`
  text-align: center;
  align-content: center;
  align-items: center;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.black};
  padding-left: 8px;
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
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
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
export const Label = styled.Text`
  font-size: 16px;
  text-align: center;
  align-self: center;
  align-content: space-around;
  margin: ${RFPercentage(1.5)}px;

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
export const Name = styled.View``
export const Options = styled.View`
  flex-direction: row;
  margin-left: ${RFPercentage(4)}px;
  margin-right: ${RFPercentage(4)}px;
  margin-top: ${RFPercentage(2)}px;
  border-color: #cbc9d9;
  border-width: 1px;
  border-radius: 5px;

  padding: ${RFPercentage(1)}px;
`
export const DivMenu = styled.ScrollView``
export const Title = styled.Text`
  margin-left: ${RFPercentage(3)}px;
  margin-top: ${RFPercentage(3)}px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.medium};
`
export const TextProfile = styled.TextInput`
  font-size: 15px;
  width: 100%;
  /* margin-left: ${RFPercentage(1)}px; */
  /* margin-right: ${RFPercentage(29)}px; */
  color: ${({ theme }) => theme.colors.textNormal};
  font-family: ${({ theme }) => theme.fonts.regular};
`
