import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SurahItem from '../components/SurahItem'

import { fetchSurahs } from '../api/services/fetchSurahs';

const QuranScreen = () => {
    const [surahs, setSurahs] = useState([]);

    useEffect(() => {
        const loadSurahs = async () => {
            try {
                const data = await fetchSurahs();
                setSurahs(data.data);
            } catch (error) {
                return
            }
        };

        loadSurahs();
    }, [])

    return (
        <ScrollView>
            <View>
                {surahs.map((surah) => {
                    return (
                        <SurahItem key={surah.number} surah={surah} />
                    )
                })}
            </View>
        </ScrollView>
    )
}

export default QuranScreen

const styles = StyleSheet.create({})