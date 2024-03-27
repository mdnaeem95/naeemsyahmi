import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PrayerTimeItem = ({ name, time }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  )
}

export default PrayerTimeItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    name: {
        marginRight: 10
    },
    time: {
        fontWeight: 'bold'
    }
})