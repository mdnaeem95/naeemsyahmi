import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import MapView from 'react-native-maps';
import * as Location from 'expo-location'
import { useEffect, useState } from 'react';
import Map from '../components/Map';

const MusollahScreen = () => {
  const [location, setLocation] = useState(null);

  const mapRef = useRef();

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Map mapRef={mapRef} region={location} />
    </View>
  )
}

export default MusollahScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
})