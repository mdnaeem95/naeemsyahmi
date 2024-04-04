import React, { MutableRefObject } from "react";
import MapView, { LatLng, Marker, Region } from "react-native-maps";
import { StyleSheet } from "react-native";

const Map = ({ mapRef, region }) => {
  return (
    <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        showsUserLocation
        followsUserLocation
        zoomEnabled
        scrollEnabled
    >
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
      },
})