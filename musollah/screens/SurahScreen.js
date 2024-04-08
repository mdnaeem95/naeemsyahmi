import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { fetchSurahText } from '../api/services/fetchSurahText'

const VERSES_PER_CHUNK = 10;

const SurahScreen = ({ route }) => {
  const { surah } = route.params;

  const [arabicText, setArabicText] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [versesCount, setVersesCount] = useState(null);

  const loadArabicText = async () => {
    setLoading(true);

    try {
      const response = await fetchSurahText(surah.number, offset, VERSES_PER_CHUNK);
      const newVerses = response.data.ayahs;
      setArabicText(prevVerses => [...prevVerses, ...newVerses]);
      setOffset(prevOffset => prevOffset + VERSES_PER_CHUNK);

      if (versesCount === null || newVerses.length < VERSES_PER_CHUNK) {
        setVersesCount((versesCount === null) ? newVerses.length : versesCount + newVerses.length)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (versesCount !== null && offset >= versesCount) {
      return;
    }

    loadArabicText();
  }, [surah, offset])

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.surahName}>{surah.englishName}</Text>
      <View style={styles.page}>
        {arabicText.map((ayah, index) => {
          return (
            <View key={index}>
              <Text style={styles.ayah}>
                {ayah.text}
              </Text>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default SurahScreen

const styles = StyleSheet.create({});


