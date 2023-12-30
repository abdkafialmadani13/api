import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';  // Import SplashScreen from the appropriate library

const Tab = createBottomTabNavigator();

function App() {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://equran.id/api/v2/surat',
      responseType: 'json',
    }).then(function (response) {
      setDatas(response.data.data);
    });
  }, []);

  const HandleSurah = () => {
    return (
      <ScrollView>
        {data.ayat?.map((item, index) => (
          <View style={styles.contenBody} key={index}>
            <Text style={styles.ayat}>{item.ar}</Text>
            <Text>
              {item.nomor}.{item.idn}
            </Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);

  const getHandleAmbilPerSurah = (surahNumber) => {
    axios({
      method: 'get',
      url: `https://equran.id/api/v2/surat/${surahNumber}`,
      responseType: 'json',
    }).then(function (response) {
      setData(response.data);
    });
  };

  const HandleListSurah = () => {
    return (
      <ScrollView>
        {datas?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contenBody}
            onPress={() => {
              setIsOpen(true);
              getHandleAmbilPerSurah(item.nomor);
            }}
          >
            <Text style={styles.ayat}>{item.nama}</Text>
            <Text>
              {index + 1}.{item.namaLatin}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const HandleJuz = () => {
    return (
      <ScrollView>
        <View style={styles.contenBody}>
          <Text style={styles.ayat}>Contoh Juz</Text>
        </View>
      </ScrollView>
    );
  };

  console.log('datass', datas);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={isOpen ? `surat ${datas?.nama_latin}` : 'Full Kumpulan Surat Al-Quran'}
          component={isOpen ? HandleSurah : HandleListSurah}
          listeners={{
            tabPress: e => {
              setIsOpen(false);
            }
          }}
        />
        <Tab.Screen name="Juz" component={HandleJuz} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  contenBody: {
    margin: 20,
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 8,
  },
  ayat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default App;
