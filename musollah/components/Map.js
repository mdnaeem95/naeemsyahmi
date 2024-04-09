import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

const Map = ({ region, musollahs }) => {
  return (
    <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation
        followsUserLocation
        zoomEnabled
        scrollEnabled
    >
      {musollahs.map((musollah) => (
        <Marker
          key={musollah._id}
          coordinate={{ latitude: musollah.latitude, longitude: musollah.longitude }}
          title={musollah.building}
          />
      ))}
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