import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { fetchPrayerTimes } from '../api/services/fetchPrayerTimes'
import PrayerTimeItem from '../components/PrayerTimeItem';

const PrayerTimeScreen = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const desiredPrayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

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
          {desiredPrayers.map((prayer) => (
            <PrayerTimeItem key={prayer} name={prayer} time={prayerTimes.data.timings[prayer]} />
          ))}
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