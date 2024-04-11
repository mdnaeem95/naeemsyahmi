import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View, Image, ActivityIndicator, Text } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';

const kaabaImg = require('../assets/kaabah.png'); // Update the path

const KAABA_LAT = 21.4225;
const KAABA_LONG = 39.8262;

const QiblaScreen = () => {
  const direction = useRef(new Animated.Value(0)).current;
  const [isCalculating, setIsCalculating] = useState(true);

  useEffect(() => {
    // Request permission to access device location
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      // Get the user's current location
      const userLocation = await Location.getCurrentPositionAsync({});
      // Calculate the direction to the Kaaba
      const qiblaDirection = calculateQiblaDirection(userLocation.coords.latitude, userLocation.coords.longitude);
      direction.setValue(qiblaDirection);
      setIsCalculating(false);
    })();
  }, []);

  // Add magnetometer data listener
  useEffect(() => {
    const subscription = Magnetometer.addListener(data => {
      const magneticHeading = Math.atan2(data.y, data.x) * (180 / Math.PI) + 180; // Convert radians to degrees
      const trueHeading = magneticHeading < 0 ? magneticHeading + 360 : magneticHeading; // Ensure the heading is positive
      
      Animated.timing(direction, {
        toValue: trueHeading,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });

    // Remove the magnetometer listener when the component unmounts
    return () => {
      subscription.remove();
    };
  }, []);

  // Calculate the Qibla direction from the user's current location
  function calculateQiblaDirection(latitude, longitude) {
    const phiK = KAABA_LAT * Math.PI / 180.0;
    const lambdaK = KAABA_LONG * Math.PI / 180.0;
    const phi = latitude * Math.PI / 180.0;
    const lambda = longitude * Math.PI / 180.0;
    const qiblaDirection = Math.atan2(Math.sin(lambdaK - lambda), Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda));
    return qiblaDirection * (180 / Math.PI); // Convert radians to degrees
  }

  // Calculate the rotation of the Kaaba image
  const interpolatedDirection = direction.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
        {isCalculating ? (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000ff" />
                <Text style={styles.loadingText}>Finding your qiblat...</Text>
            </View>
        ) : (
            <Animated.Image
                source={kaabaImg}
                style={[
                styles.kaaba,
                { transform: [{ rotate: interpolatedDirection }] },
                ]}
            />
        )}
    </View>
  );
};

export default QiblaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  kaaba: {
    width: 100, // Adjust the size as needed
    height: 100, // Adjust the size as needed
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
  }
});
