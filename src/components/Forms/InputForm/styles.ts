import styled from 'styled-components/native'
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize'
export const Container = styled.View`
width: 100%;
`

export const Error = styled.Text`
font-size: ${RFValue(14)}px;
font-family: ${({theme})=> theme.fonts.regular};
color:${({theme})=> theme.colors.reject};
margin-left: ${RFPercentage(4)}px;
  margin-right: ${RFPercentage(4)}px;
  padding: ${RFPercentage(1)}px;
`

