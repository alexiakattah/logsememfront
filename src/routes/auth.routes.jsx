import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Signin } from '../screens/Signin'
import { Welcome } from '../screens/Welcome'
import { Register } from '../screens/Register'
import { RegisterEgua } from '../screens/RegisterEgua'
import { RegisterCavalo } from '../screens/RegisterCavalo'

const Stack = createStackNavigator()

export function AuthRoutes({ navigation, route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{
          cardStyle: {
            backgroundColor: '#ffff',
          },
        }}
      />
      <Stack.Screen
        name='Signin'
        component={Signin}
        options={{
          cardStyle: {
            backgroundColor: '#ffff',
          },
        }}
      />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{
          cardStyle: {
            backgroundColor: '#ffff',
          },
        }}
      />
      <Stack.Screen
        name='RegisterEgua'
        component={RegisterEgua}
        options={{
          cardStyle: {
            backgroundColor: '#ffff',
          },
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name='RegisterCavalo'
        component={RegisterCavalo}
        options={{
          cardStyle: {
            backgroundColor: '#ffff',
          },
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  )
}
