import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { fetchPrayerTimes } from '../api/services/fetchPrayerTimes'

const PrayerTimeScreen = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);

  useEffect(() => {
    const fetchPrayerTimesData = async () => {
      try {
        const data = await fetchPrayerTimes();
        setPrayerTimes(data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchPrayerTimesData();
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {prayerTimes ? (
        <View>
          <Text>Fajr: {prayerTimes.data.timings.Fajr}</Text>
          <Text>Dhuhr: {prayerTimes.data.timings.Dhuhr}</Text>
          <Text>Asr: {prayerTimes.data.timings.Asr}</Text>
          <Text>Maghrib: {prayerTimes.data.timings.Maghrib}</Text>
          <Text>Isha: {prayerTimes.data.timings.Isha}</Text>
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  )
}

export default PrayerTimeScreen

const styles = StyleSheet.create({})