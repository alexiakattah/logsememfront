import React from 'react'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import {useAuth} from '../hooks/useAuth'

export function Routes() {
  const {user} = useAuth()
  console.log('userrrr',user)
  return (
    <>
    {user && user.email? <AppRoutes /> :  <AuthRoutes />}
     
    </>
  )
}
