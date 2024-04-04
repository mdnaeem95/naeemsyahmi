import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { fetchSurahText } from '../api/services/fetchSurahText'

const SurahScreen = ({ route }) => {
  const { surah } = route.params;

  const [arabicText, setArabicText] = useState([]);

  useEffect(() => {
    const loadArabicText = async () => {
      try {
        const response = await fetchSurahText(surah.number);
        setArabicText(response.data.ayahs);
      } catch (error) {
        console.log(error)
      }
    }
      
    loadArabicText();
  }, [surah])

  return (
    <ScrollView>
      <View>
        {arabicText.map((ayah) => {
          return (
            <Text>{ayah.text}</Text>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default SurahScreen

const styles = StyleSheet.create({})