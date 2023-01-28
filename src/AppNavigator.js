import React, { useEffect, useMemo, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Component/Auth/Login'
import Signup from './Component/Auth/Signup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'
import AdminDashboard from './Component/Admin/AdminDashboard'
import UserDashboard from './Component/User/UserDashboard'
import { useSelector } from 'react-redux'
import { dispatch } from './Redux/store'
import { tokenSuccess } from './Redux/slices/Token'
const Stack = createNativeStackNavigator()

export default function AppNavigator() {
  const [isLogin, setIsLogin] = useState(false)
  const [role, setRole] = useState('')
  const tokenState = useSelector(state => state.getToken)

  useEffect(() => {
    const getValidated = async () => {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        if (!tokenState.data) {
          dispatch(tokenSuccess(token))
        }
        setIsLogin(true)
        const data = await jwtDecode(token)
        setRole(data.role)
      }
      else {
        setIsLogin(false)
        setRole('')
      }
    }
    getValidated();
  }, [tokenState.data])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerShown: false }}>
        {
          isLogin ? <>
            {
              role === 'admin' ? <Stack.Screen name='AdminDashboard' component={AdminDashboard} /> :
                <Stack.Screen name='UserDashboard' component={UserDashboard} />
            }
          </> :
            <>
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Signup' component={Signup} />
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}