import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'


export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(15)}px;
  background-color: ${({ theme }) => theme.colors.header};
`