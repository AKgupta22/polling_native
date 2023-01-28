import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import SelectDropdown from 'react-native-select-dropdown'
import { useFormik } from 'formik'
import * as yup from "yup";
import { dispatch } from '../../Redux/store'
import { registrationRequest, registrationReset } from '../../Redux/slices/register'
import { useSelector } from 'react-redux'

const Signup = ({ navigation }) => {
  const [role, setRole] = useState('Guest')
  const registrationState = useSelector(state => state.registration)
  const validationSchema = yup.object({
    username: yup
      .string("Enter your username")
      .required("username is required"),
    password: yup
      .string("Enter your password")
      .min(5, "Password should be of minimum 5 characters length")
      .required("Password is required"),
    cpassword: yup.string("Enter your confirm password")
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Confirm password should be same to password')
  });

  const formHandler = useFormik({
    initialValues: {
      username: "",
      role: role,
      password: "",
      cpassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(registrationRequest(values))
    },
  });

  useEffect(() => {
    if (registrationState.isSuccess) {
      formHandler.resetForm()
      navigation.navigate('Login')
      registrationReset()
    }
  }, [registrationState.isSuccess])

  return (
    <LinearGradient colors={['#2193b0', '#6dd5ed']} style={styles.background}>
      <View style={styles.loginContainer}>
        <Text style={styles.login_Text}>Signup</Text>
        <TextInput
          placeholder='Enter your username'
          style={styles.input_Box}
          value={formHandler.values.username}
          onChangeText={formHandler.handleChange('username')}
        />
        {
          formHandler.touched && formHandler.errors.username && <Text style={styles.errorText}>{formHandler.errors.username}</Text>
        }
        <SelectDropdown
          data={['admin', 'Guest']}
          onSelect={selectedItem =>
            setRole(selectedItem)
          }
          defaultButtonText='Select Role'
          buttonStyle={styles.input_Box}
        />
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
        <TextInput
          placeholder='Confirm your password'
          style={styles.input_Box}
          secureTextEntry={true}
          value={formHandler.values.cpassword}
          onChangeText={formHandler.handleChange('cpassword')}
        />
        {
          formHandler.touched && formHandler.errors.cpassword && <Text style={styles.errorText}>{formHandler.errors.cpassword}</Text>
        }

        <TouchableOpacity style={styles.button} onPress={formHandler.handleSubmit}>
          <Text style={styles.button_text}>{registrationState.isLoading ? <ActivityIndicator size='small' color='#ef3f49' /> : 'Sign-Up'}</Text>
        </TouchableOpacity>

        {registrationState.isError && <Text style={styles.errorText}>{registrationState.data.message ? registrationState.data.message : 'Internal server error'}</Text>}

        <TouchableOpacity style={styles.already_button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.already_text}>Already Registered? Login Now</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>

  )
}

export default Signup

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center"
  },
  loginContainer: {
    marginTop: 150,
    minHeight: 490,
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
    fontSize: 15,
    backgroundColor: '#fff'
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
    marginBottom: 15
  },
  already_text: {
    fontWeight: '600',
    fontSize: 15,
    color: '#121212'
  },
  errorText: {
    width: "72%",
    marginTop: 10,
    fontSize: 15,
    color: "red"
  }
})