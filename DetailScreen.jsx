import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function DetailScreen({ route }) {
  const { data } = route.params || {};
  const { nama, arti, deskripsi, ayat } = data || {};

  return (
    <ScrollView style={styles.container}>
      {ayat.map((item, index) => (
        <View key={index} style={styles.ayatContainer}>
          <Text style={styles.ayatText}>{item.teksArab}</Text>
          {/* <Text style={styles.ayatText}>{item.teksLatin}</Text>
          <Text style={styles.ayatText}>{item.teksIndonesia}</Text> */}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  ayatContainer: {
    marginTop: 10,
  },
  ayatText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DetailScreen;