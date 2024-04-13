import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import PrayerTimeScreen from '../screens/PrayerTimeScreen'
import MusollahScreen from '../screens/MusollahScreen'
import SettingsScreen from '../screens/SettingsScreen'
import QiblaScreen from '../screens/QiblaScreen'
import QuranScreen from '../screens/QuranScreen'

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name='Prayers' 
        component={PrayerTimeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name={'person-praying'} size={20} />
          )
        }} />
      <Tab.Screen 
        name='Qibla' 
        component={QiblaScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name={'compass'} size={20} />
          )
        }} />
      <Tab.Screen 
        name='Musollah' 
        component={MusollahScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name={'mosque'} size={20} />
          )
        }}
        />
      <Tab.Screen 
        name='Quran' 
        component={QuranScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name={'book-quran'} size={20} />
          )
        }} />
      <Tab.Screen 
        name='Settings' 
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name={'gear'} size={20} />
          )
        }} />
    </Tab.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({})