import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import PrayerTimeScreen from '../screens/PrayerTimeScreen'
import MusollahScreen from '../screens/MusollahScreen'
import SettingsScreen from '../screens/SettingsScreen'
import QiblaScreen from '../screens/QiblaScreen'
import QuranScreen from '../screens/QuranScreen'

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Prayers' component={PrayerTimeScreen} />
      <Tab.Screen name='Qibla' component={QiblaScreen} />
      <Tab.Screen name='Musollah' component={MusollahScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
      <Tab.Screen name='Quran' component={QuranScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({})