import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Audio } from 'expo-av';

import { fetchSurahText } from '../api/services/fetchSurahText'

const VERSES_PER_CHUNK = 10;
const AUDIO_BASE_URL = 'https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy'

const SurahScreen = ({ route }) => {
  const { surah } = route.params;

  const [arabicText, setArabicText] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [versesCount, setVersesCount] = useState(null);

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

    return () => {
      sound?.unloadAsync();
    };
  }, [surah, sound])

  const togglePlayback = async () => {
    if (sound) {
      if (isPlaying) {
        console.log("Pausing audio");
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        console.log("Playing audio");
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      console.log("Loading new audio");
      const audioUrl = `${AUDIO_BASE_URL}/${surah.number}.mp3`;
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl }
      );
      setSound(newSound);
      setIsPlaying(true);

      await newSound.playAsync();

      newSound.setOnPlaybackStatusUpdate(status => {
        if (!status.isPlaying) {
          setIsPlaying(false);
        }
      });
    }
  };

  useEffect(() => {
    return sound 
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={togglePlayback} />
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
    </View>
  )
}

export default SurahScreen

const styles = StyleSheet.create({});
