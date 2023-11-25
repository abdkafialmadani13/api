import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import axios from "axios";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function App() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://equran.id/api/v2/surat',
      responseType: 'json'
    }).then(function (response) {
      setDatas(response.data.data);
    });
  }, []);

  const HandleSurat = () => {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require('./assets/image/makkah.jpg')}
        >
          <ScrollView style={styles.scrollView}>
            <View style={styles.contenBody}>
              {datas.map((item, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.cardText}>{item.nama}</Text>
                  <Text style={styles.cardText}>{item.namaLatin}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Daftar Surat" component={HandleSurat} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  contenBody: {
    margin: 20,
  },
  card: {
    backgroundColor: '#3E001F',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  cardText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
