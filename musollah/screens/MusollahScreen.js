import { StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react';
import Map from '../components/Map';
import fetchMusollahs from '../api/services/fetchMusollahs';

const MusollahScreen = () => {
  const [location, setLocation] = useState(null);
  const [musollahs, setMusollahs] = useState([]);

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setLocation(region);
  }

  useEffect(() => {
    getCurrentLocation();
    fetchMusollahs().then(data => {
      console.log(data)
      setMusollahs(data.documents);
    }).catch(error => {
      console.error('Error fetching data:', error);
    })
  }, []);

  return (
    <View style={styles.container}>
      {location && <Map region={location} musollahs={musollahs} />}
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