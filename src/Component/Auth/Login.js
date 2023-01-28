import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { dispatch } from '../../Redux/store'
import { loginRequest, loginReset } from '../../Redux/slices/login'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as yup from "yup";
import { tokenSuccess } from '../../Redux/slices/Token'

const Login = ({ navigation }) => {

  const loginState = useSelector(state => state.login)

  const validationSchema = yup.object({
    username: yup
      .string("Enter your username")
      .required("Username is required"),
    password: yup
      .string("Enter your password")
      .min(5, "Password should be of minimum 5 characters length")
      .required("Password is required")
  });

  const formHandler = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginRequest(values));
    },
  });

  useEffect(() => {
    if (loginState.isSuccess) {
      AsyncStorage.setItem('token', loginState.data.token)
      dispatch(tokenSuccess(loginState.data.token))
      formHandler.resetForm()
      dispatch(loginReset())
    }
  }, [loginState.isSuccess])

  return (
    <LinearGradient colors={['#2193b0', '#6dd5ed']} style={styles.background}>
      <View style={styles.loginContainer}>
        <Text style={styles.login_Text}>Login</Text>
        <TextInput
          placeholder='Enter your username'
          style={styles.input_Box}
          value={formHandler.values.username}
          onChangeText={formHandler.handleChange('username')}
        />
        {
          formHandler.touched && formHandler.errors.username && <Text style={styles.errorText}>{formHandler.errors.username}</Text>
        }
        <TextInput
          placeholder='Enter your password'
          style={styles.input_Box}
          secureTextEntry={true}
          value={formHandler.values.password}
          onChangeText={formHandler.handleChange('password')}
        />
        {
          formHandler.touched && formHandler.errors.password && <Text style={styles.errorText}>{formHandler.errors.password}</Text>
        }
        <TouchableOpacity style={styles.button} onPress={formHandler.handleSubmit}>
          <Text style={styles.button_text}>{loginState.isLoading ? <ActivityIndicator size='small' color='#ef3f49' /> : 'Login'}</Text>
        </TouchableOpacity>
        {loginState.isError && <Text style={styles.errorText}>{loginState.data.data ? loginState.data.data : 'Internal server error'}</Text>}
        <TouchableOpacity style={styles.already_button} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.already_text}>Not Registered? Register Now</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

export default Login

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center"
  },
  loginContainer: {
    marginTop: 180,
    minHeight: 370,
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: 'center'
  },
  login_Text: {
    color: '#121212',
    fontSize: 30,
    marginTop: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: 'Yatra-One',
    marginBottom: 20
  },
  input_Box: {
    borderWidth: 1,
    marginTop: 15,
    width: "75%",
    borderColor: '#82817f',
    borderRadius: 8,
    padding: 12,
    fontSize: 15
  },
  button: {
    backgroundColor: '#2435c9',
    width: '76%',
    marginTop: 17,
    padding: 12,
    borderRadius: 10
  },
  button_text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  already_button: {
    marginTop: 18,
    width: '70%',
  },
  already_text: {
    fontWeight: '600',
    fontSize: 15,
    color: '#121212',
    marginBottom: 15
  },
  errorText: {
    width: "72%",
    marginTop: 10,
    fontSize: 15,
    color: "red"
  }
})