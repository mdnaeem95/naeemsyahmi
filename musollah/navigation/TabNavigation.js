import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import PrayerTimeScreen from '../screens/PrayerTimeScreen'
import MusollahScreen from '../screens/MusollahScreen'
import SettingsScreen from '../screens/SettingsScreen'

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={PrayerTimeScreen} />
      <Tab.Screen name='Musollah' component={MusollahScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({})