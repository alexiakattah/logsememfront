import styled from 'styled-components/native'
import {Text} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'


export const Container = styled(Text)`
  /* margin-left: ${RFPercentage(3)}px;
  margin-top: ${RFPercentage(3)}px; */

  background-color: blue;
  font-size: 50px;
  color: ${({ theme }) => theme.colors.textNormal};
  font-family: ${({ theme }) => theme.fonts.medium};
`