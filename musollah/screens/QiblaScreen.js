import { Image, View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react'
import QiblaCompass from 'react-native-qibla-compass';

const QiblaScreen = () => {
    return (
        <QiblaCompass color={"#123"} backgroundColor={"#fff"} textStyles={{ textAlign: "center", fontSize: 24}} />
    )
}

export default QiblaScreen

const styles = StyleSheet.create({})