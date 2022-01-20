import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${RFValue(10)}px;
  padding-left: ${RFValue(20)}px;
`

export const SchedulesDetails = styled.ScrollView``

export const Title = styled.Text`
  margin-top: ${RFPercentage(3)}px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.medium};
`
export const ReserveDate = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.menu};
  padding-left: ${RFPercentage(2)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`
export const Text = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
`
export const TextTotal = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.medium};
`
export const NameHaras = styled.Text`
  font-size: 13px;
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
export const Flex = styled.View`
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  align-items: center;

  padding: ${RFPercentage(1)}px;
  width: 95%;
`
export const Coleta = styled.Image``
export const Colet = styled.Text`
  color: ${({ theme }) => theme.colors.header};
  font-family: ${({ theme }) => theme.fonts.medium};
`
export const CancelReserv = styled.Text`
  color: ${({ theme }) => theme.colors.reject};
  font-family: ${({ theme }) => theme.fonts.medium};
  align-items: center;
  justify-content: center;
  text-align: center;
`
export const Space = styled.View`
  margin-top: ${RFPercentage(5)}px;
`
export const ContainerApp = styled.View`
  margin-left: ${RFPercentage(2)}px;
  font-size: 13px;
`
export const PhotoHaras = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFPercentage(100)}px;
`
export const Document = styled.Image`
  width: ${RFValue(300)}px;
  height: ${RFValue(300)}px;
  margin-bottom: 15px;
`
export const Div = styled.View`
  justify-content: space-between;
  flex-direction: row;
`
export const Linha = styled.View`
  height: 20px;
  width: 95%;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.font_light};
`
