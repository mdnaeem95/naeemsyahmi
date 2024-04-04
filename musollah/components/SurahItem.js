import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Surah = ({ surah }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{surah.englishName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
});

export default Surah;
