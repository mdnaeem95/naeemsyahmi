import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

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
        <View>
            {surahs.map(surah => (
                <Text key={surah.number}>{surah.englishName}</Text>
            ))}
        </View>
    )
}

export default QuranScreen

const styles = StyleSheet.create({})