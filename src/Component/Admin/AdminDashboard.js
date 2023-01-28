import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dispatch } from '../../Redux/store'
import { getPollsRequest, getPollsReset } from '../../Redux/slices/getPolls'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useToken from '../CustomHooks/useToken'
import { tokenReset } from '../../Redux/slices/Token'

const AdminDashboard = ({ navigation }) => {

  const pollListState = useSelector(state => state.getPolls)
  const [polls, setPolls] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (pollListState.isSuccess === false) {
      dispatch(getPollsRequest())
    }
    if (pollListState.isSuccess) {
      setPolls(pollListState.data)
      if (refreshing) {
        setRefreshing(false)
      }
    }
  }, [pollListState.isSuccess])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getPollsReset())
  }, []);

  const logout = async () => {
    await AsyncStorage.clear()
    dispatch(tokenReset())
  }

  return (
    <LinearGradient colors={['#2193b0', '#6dd5ed']} style={styles.background}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center'
        }}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.dash_header}>
          <Text style={styles.header_Text}>Admin Dashboard</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.button_text}>Add Poll</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} style={[styles.button, styles.logout_btn]}>
            <Text style={styles.button_text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default AdminDashboard

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center"
  },
  scrollView: {
    flex: 1,
    width: '100%'
  },
  dash_header: {
    minHeight: 200,
    width: '90%',
    alignItems: 'center'
  },
  header_Text: {
    marginTop: 25,
    textAlign: 'center',
    color: '#121212',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 1
  },
  button: {
    backgroundColor: '#2435c9',
    width: '35%',
    marginTop: 17,
    padding: 12,
    borderRadius: 10
  },
  button_text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15
  },
  logout_btn: {
    width: '25%',
    backgroundColor: '#ef3f49',
    borderRadius: 12
  }
})