import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dispatch } from '../../Redux/store'
import { getPollsRequest } from '../../Redux/slices/getPolls'
import LinearGradient from 'react-native-linear-gradient'

const UserDashboard = () => {

  const pollListState = useSelector(state => state.getPolls)
  const [polls, setPolls] = useState([])

  useEffect(() => {
    if (pollListState.isSuccess === false) {
      dispatch(getPollsRequest())
    }
    if (pollListState.isSuccess) {
      setPolls(pollListState.data)
    }
  }, [pollListState.isSuccess])

  return (
    <LinearGradient colors={['#2193b0', '#6dd5ed']} style={styles.background}>
      <View>
        <Text>UserDashboard</Text>
      </View>
    </LinearGradient>
  )
}

export default UserDashboard

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center"
  }
})