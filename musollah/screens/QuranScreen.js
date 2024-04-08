import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import SurahItem from '../components/SurahItem'

import { fetchSurahs } from '../api/services/fetchSurahs';
import { createStackNavigator } from '@react-navigation/stack';
import SurahScreen from './SurahScreen';

const Stack = createStackNavigator();

const QuranStack = () => {
    const navigation = useNavigation();

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

    const handleSuruhPress = (surah) => {
        navigation.navigate('SurahScreen', { surah });
    }

    return (
        <ScrollView>
            <View>
                {surahs.map((surah) => {
                    return (
                        <SurahItem key={surah.number} surah={surah} onPress={handleSuruhPress} />
                    )
                })}
            </View>
        </ScrollView>
    )
}

const QuranScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="QuranStack" component={QuranStack} options={{ headerShown: false }} />
            <Stack.Screen name="SurahScreen" component={SurahScreen}/>
        </Stack.Navigator>
    )
}

export default QuranScreen

const styles = StyleSheet.create({})