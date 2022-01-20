import 'react-native-gesture-handler'

import React from 'react'
import AppLoading from 'expo-app-loading'
import { ThemeProvider } from 'styled-components'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import { NavigationContainer } from '@react-navigation/native'
import { AuthContextProvider } from './contexts/AuthContext'
import { Routes } from './routes'
import theme from './global/styles/theme'
import { LogBox } from 'react-native'
import { RegisterContextProvider } from './contexts/RegisterContext'
import { PaymentContextProvider } from './contexts/PaymentContext'
import { ReserveContextProvider } from './contexts/ReserveContext'

// LogBox.ignoreLogs(['Remote debugger'])

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <RegisterContextProvider>
          <PaymentContextProvider>
            <ReserveContextProvider>
              <NavigationContainer>
                <Routes />
              </NavigationContainer>
            </ReserveContextProvider>
          </PaymentContextProvider>
        </RegisterContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  )
}
