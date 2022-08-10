import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 15px;
`
export const ContainerAddress = styled.TouchableOpacity`
  flex: 1;
`
export const ContainerAnimal = styled.TouchableOpacity`
  flex: 1;
`
export const ViewContainer = styled.View`
  flex-direction: row;
  border: 1px;
  align-content: center;
  align-items: center;
  border-color: ${({ theme }) => theme.colors.font_light};
  border-radius: 2px;
  width: 50%;
  padding: 5px;
  margin-right: 5px;
  /* margin: ${RFPercentage(4)}px; */
`
export const ViewContainerAddress = styled.TouchableOpacity`
  flex-direction: row;
  border: 1px;
  border-color: ${({ theme }) => theme.colors.font_light};
  border-radius: 5px;

  padding: 5px;
  margin-right: 5px;
  /* margin: ${RFPercentage(4)}px; */
`
export const ViewContainerAnimal = styled.TouchableOpacity`
  flex-direction: row;
  border: 1px;
  border-color: ${({ theme }) => theme.colors.font_light};
  border-radius: 5px;

  padding: 5px;
  margin-right: 5px;
  /* margin: ${RFPercentage(4)}px; */
`
export const Column = styled.View`
  flex-direction: row;
  align-content: center;
  padding: 5px;
  align-items: center;
`
export const Div = styled.View`
  flex-direction: row;
  align-content: center;
  padding: 5px;
  align-items: center;
  justify-content: space-between;
  
`
export const Margin = styled.View`
  padding-bottom: ${RFPercentage(5)}px;
`
export const ViewSelect = styled.TouchableOpacity`
  flex-direction: row;
  margin: auto;
`

export const Text = styled.Text`
  text-align: center;
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
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
export const TextLeft = styled.Text`
  text-align: left;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.black};
  padding-left: 8px;
`
export const TextTotal = styled.Text`
  text-align: left;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.black};
  padding-left: 8px;
`
export const TextSmallAddress = styled.Text`
  text-align: left;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.black};
  padding-left: 8px;
`
export const ImageUpload = styled.Image`
  margin: auto;
  width: ${RFPercentage(15)}px;
  height: ${RFPercentage(15)}px;
`
export const ImageEndereco = styled.Image`
  margin: auto;
  width: 40px;
  height: 40px;
`
export const ImageSelect = styled.Image`
  margin: auto;
  width: ${RFPercentage(5)}px;
  height: ${RFPercentage(5)}px;
`
