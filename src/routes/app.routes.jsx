import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'

import { useAuth } from '../hooks/useAuth'

import { useTheme } from 'styled-components'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { Profile } from '../screens/Haras/Profile'
import { ProfileEgua } from '../screens/Egua/ProfileEgua'
import { Schedules } from '../screens/Haras/Schedules'

import { Veterinarians } from '../screens/Haras/Veterinarians'
import { Animals } from '../screens/Haras/Animals'
import { AnimalsEgua } from '../screens/Egua/AnimalsEgua'
import { CreateAnimal } from '../screens/Haras/CreateAnimal'
import { CreateVeterinarian } from '../screens/Haras/CreateVeterinarian'
import { MyReserves } from '../screens/Haras/MyReserves'
import { ReserveDetails } from '../screens/Haras/ReserveDetails'
import { View } from 'react-native'
import { ListAnimals } from '../screens/Egua/ListAnimals'
import { AnimalDetails } from '../screens/Egua/AnimalDetails'
import { ConfirmReserv } from '../screens/Egua/ConfirmReserv'
import { CameraOpen } from '../components/CameraOpen'
import { FormsPaymentEgua } from '../screens/Egua/FormsPaymentEgua'
import { CreateCreditCard } from '../screens/Egua/CreateCreditCard'
import { MyData } from '../screens/Egua/MyData'
import { EditMyData } from '../screens/Egua/EditMyData'
import { ReserveConfirmed } from '../screens/Egua/ReserveConfirmed'
import { MyReservesEgua } from '../screens/Egua/MyReservesEgua'
import { ReserveDetailsEgua } from '../screens/Egua/ReserveDetailsEgua'
import { CameraQrCode } from '../components/CameraQrCode'
import { FormsPaymentHaras } from '../screens/Haras/FormsPaymentHaras'
import { EditVeterinarian } from '../screens/Haras/EditVeterinarian'
import { EditAnimalEgua } from '../screens/Egua/EditAnimalEgua'
import { EditCreditCard } from '../screens/Egua/EditCreditCard'
const { Navigator, Screen } = createBottomTabNavigator()

function HomeTabs({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) })
  }, [navigation, route])

  const theme = useTheme()
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.header,
        inactiveTintColor: theme.colors.menu,
        labelStyle: { fontSize: 13 },
      }}
    >
      <Screen
        name='Início'
        component={Schedules}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),

          tabBarIcon: ({ size, color }) => (
            <Ionicons name='home-sharp' size={size} color={color} />
          ),
        })}
      />
      <Screen
        name='Reservas'
        component={MyReserves}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name='calendar-day' size={size} color={color} />
          ),
        }}
      />
      {/* <Screen
        name='Notificações'
        component={Schedules}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='notifications-sharp' size={size} color={color} />
          ),
        }}
      /> */}
      <Screen
        name='Perfil'
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='person' size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  )
}
function HomeTabsEgua({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) })
  }, [navigation, route])

  const theme = useTheme()
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.header,
        inactiveTintColor: theme.colors.menu,
        labelStyle: { fontSize: 13 },
      }}
    >
      <Screen
        name='Início'
        component={ListAnimals}
        options={({ route }) => ({
          headerTitle: getHeaderTitleEgua(route),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='home-sharp' size={size} color={color} />
          ),
        })}
      />
      <Screen
        name='Reservas'
        component={MyReservesEgua}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name='calendar-day' size={size} color={color} />
          ),
        }}
      />
      {/* <Screen
        name='Notificações'
        component={Schedules}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='notifications-sharp' size={size} color={color} />
          ),
        }}
      /> */}
      <Screen
        name='Perfil'
        component={ProfileEgua}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='person' size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  )
}

const Stack = createStackNavigator()

function Pages({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) })
  }, [navigation, route])

  const theme = useTheme()

  return (
    <>
      <Stack.Screen name='Veterinários' component={Veterinarians} />
      <Stack.Screen name='CreateVeterinarian' component={CreateVeterinarian} />
      <Stack.Screen name='ReserveDetails' component={ReserveDetails} />
    </>
  )
}

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Início'

  switch (routeName) {
    case 'Início':
      return 'Agendamentos'
    case 'Reservas':
      return 'Reservas'
    case 'Notificações':
      return 'Notificações'
    case 'Perfil':
      return 'Perfil'
    case 'Veterinários':
      return 'Veterinários'
  }
}
function getHeaderTitleEgua(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Início'

  switch (routeName) {
    case 'Início':
      return 'Buscar animais'
    case 'Favoritos':
      return 'Favoritos'
    case 'Notificações':
      return 'Notificações'
    case 'Perfil':
      return 'Perfil'
  }
}

export function AppRoutes() {
  const theme = useTheme()
  const { user } = useAuth()
  if (user && user.typeUser === 'registerHaras') {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Início'
          component={HomeTabs}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
              alignItems: 'center',
              alignSelf: 'center',
            },
          }}
        />
        <Stack.Screen
          name='CameraQrCode'
          component={CameraQrCode}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Camera',
          }}
        />
        <Stack.Screen
          name='MyData'
          component={MyData}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Perfil',
          }}
        />
        <Stack.Screen
          name='EditMyData'
          component={EditMyData}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Perfil',
          }}
        />

        <Stack.Screen
          name='Veterinários'
          component={Veterinarians}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
          }}
        />
        <Stack.Screen
          name='CreateVeterinarian'
          component={CreateVeterinarian}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Veterinário',
          }}
        />
        <Stack.Screen
          name='ReserveDetails'
          component={ReserveDetails}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Reservas',
          }}
        />
        <Stack.Screen
          name='Animals'
          component={Animals}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Animais',
          }}
        />
        <Stack.Screen
          name='CreateAnimals'
          component={CreateAnimal}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Animais',
          }}
        />
        <Stack.Screen
          name='FormsPaymentHaras'
          component={FormsPaymentHaras}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Formas de recebimento',
          }}
        />
        <Stack.Screen
          name='EditVeterinarian'
          component={EditVeterinarian}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Editar Veterinário',
          }}
        />
      </Stack.Navigator>
    )
  } else if (user && user.typeUser === 'registerEgua') {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Início'
          component={HomeTabsEgua}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
              alignItems: 'center',
              alignSelf: 'center',
            },
          }}
        />

        <Stack.Screen
          name='AnimalDetails'
          component={AnimalDetails}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Informações',
          }}
        />
        <Stack.Screen
          name='ReserveDetailsEgua'
          component={ReserveDetailsEgua}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Detalhes da Reserva',
          }}
        />

        <Stack.Screen
          name='CreateCreditCard'
          component={CreateCreditCard}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Informações',
          }}
        />
        <Stack.Screen
          name='AnimalsEgua'
          component={AnimalsEgua}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Animais',
          }}
        />
        <Stack.Screen
          name='EditCreditCard'
          component={EditCreditCard}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Formas de Pagamento',
          }}
        />
        <Stack.Screen
          name='EditAnimalEgua'
          component={EditAnimalEgua}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Editar Animal',
          }}
        />
        <Stack.Screen
          name='MyData'
          component={MyData}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Informações',
          }}
        />
        <Stack.Screen
          name='EditMyData'
          component={EditMyData}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Informações',
          }}
        />
        <Stack.Screen
          name='ConfirmReserv'
          component={ConfirmReserv}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Informações',
          }}
        />
        <Stack.Screen
          name='ReserveConfirmed'
          component={ReserveConfirmed}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Informações',
          }}
        />
        <Stack.Screen
          name='FormsPaymentEgua'
          component={FormsPaymentEgua}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Meus cartões',
          }}
        />
        <Stack.Screen
          name='CameraOpen'
          component={CameraOpen}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Informações',
          }}
        />

        <Stack.Screen
          name='CreateVeterinarian'
          component={CreateVeterinarian}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Veterinário',
          }}
        />
        <Stack.Screen
          name='ReserveDetails'
          component={ReserveDetails}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Reservas',
          }}
        />
        <Stack.Screen
          name='Animals'
          component={Animals}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Animais',
          }}
        />
        <Stack.Screen
          name='CreateAnimals'
          component={CreateAnimal}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.header,
              height: RFPercentage(15),
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.fonts.medium,
              fontSize: RFPercentage(3),
            },
            title: 'Animais',
          }}
        />
      </Stack.Navigator>
    )
  }
}
