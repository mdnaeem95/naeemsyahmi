import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const Surah = ({ surah, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(surah)}>
      <View style={styles.container}>
        <Text style={styles.text}>{surah.englishName}</Text>
      </View>
    </TouchableOpacity>
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
