import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const SchedulesDetails = styled.ScrollView``

export const ViewFlex = styled.View`
  /* flex-direction: row;
text-align: center;
align-items: center;
justify-content: center; */
`
export const AnimalsDetails = styled.TouchableOpacity`

flex-direction: row;

  margin: ${RFPercentage(1)}px auto ${RFPercentage(1)}px auto;
  border-radius: 15px;
    width:90%;
    background-color:white;
    border-radius:15px;
    elevation:9;
    shadow-color: #000;
    shadow-offset: {width: 1, height: 0};
  shadow-opacity: 0.2;
  shadow-radius: 2;

`
export const Details = styled.View`
  margin: ${RFPercentage(2)}px;
  border-radius: 5px;
`
export const Botuflex = styled.Text`
  color: ${({ theme }) => theme.colors.font_light};
`
export const Motoboy = styled.Text`
  color: ${({ theme }) => theme.colors.font_light};
`
export const Veterinarian = styled.Text`
  color: ${({ theme }) => theme.colors.font_light};
`
export const City = styled.Text`
  color: ${({ theme }) => theme.colors.font_light};
`
export const PhotoAnimalDetails = styled.Image`
  margin-top: ${RFPercentage(5)}px;
  margin-left: ${RFPercentage(3)}px;
  width: ${RFValue(120)}px;
  height: ${RFValue(80)}px;
  border-radius: 5px;
`

export const Text = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-top: ${RFPercentage(8)}px;
  color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.medium};
`
export const Title = styled.Text`
  margin-left: ${RFPercentage(3)}px;
  margin-top: ${RFPercentage(3)}px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.medium};
`
export const AnimalsSchedules = styled.ScrollView`
  /* background-color: blue; */
  height: ${RFPercentage(5)}px;
`
export const Animal = styled.View`
width: ${RFPercentage(17)}px;
height: ${RFPercentage(19)}px;
background-color: ${({ theme }) => theme.colors.background};
text-align: center;
align-items: center;
margin: ${RFPercentage(2)}px;
border-radius: 8px;
shadow-color: #000;
shadow-offset: {width: 0, height: 1};
  shadow-opacity: 0.8;
  shadow-radius: 2.2;
  elevation: 9;
`
export const TitleAnimal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 14px;
  margin-top: ${RFPercentage(1)}px;
  margin-bottom: ${RFPercentage(1)}px;
`
export const PhotoAnimal = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  border-radius: 5px;
`
