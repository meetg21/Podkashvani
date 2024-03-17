import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PodcastComponent from '../components/PodcastComponent';
import BottomNavBar from '../components/BottomNavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [tabState, setTabState] = useState(true); // State to track the active tab
  const [podcastData, setPodcastData] = useState([]);
  const [podcastNames, setPodcastNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch podcast data from AsyncStorage
        const data = await AsyncStorage.getItem(tabState ? 'mp3Urls' : 'savedPodcasts');
        if (data) {
          setPodcastData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error fetching podcast data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [tabState]); // Re-fetch data when tabState changes

  useEffect(() => {
    const extractNames = () => {
        const names = podcastData.map(url => getPodcastNameFromUrl(url));
        setPodcastNames(names);
    };

    extractNames();
}, [podcastData]);

const getPodcastNameFromUrl = (url) => {
    const splitByFolder = url.split('%2F');
    const fileNameWithExtension = splitByFolder.pop();
    const fileName = fileNameWithExtension.split('.')[0];
    // const nameWithoutUnderscores = fileName.replace(/_/g, ' ');
    return fileName;
};

console.log('Podcast names:', podcastData);

AsyncStorage.setItem('podcastNames', podcastNames);




  const switchTabs = (tab) => {
    setTabState(tab);
  };

  return (
    <LinearGradient colors={['#FFFDF4', '#00AAFF']} style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/images/profile_image.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileMail}>milind.nair@somaiya.com</Text>
        <Text style={styles.profileText}>Milind Nair</Text>

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => switchTabs(true)}>
            <Text style={[styles.tabText, tabState ? styles.activeTab : null]}>MY FILES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => switchTabs(false)}>
            <Text style={[styles.tabText, !tabState ? styles.activeTab : null]}>SAVED</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.podcastContainer}>
        {/* <Text style={styles.podcastHeader}>{tabState ? 'My Podcasts' : "Saved"}</Text> */}
        <ScrollView contentContainerStyle={styles.scrollView}>
          {podcastData.map((podcast, index) => (
            <View key={index} style={styles.podcastInnerContainer}>
              <PodcastComponent props={podcast} />
            </View>
          ))}
        </ScrollView>
      </View>
      <BottomNavBar></BottomNavBar>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileMail: {
    color: "#D8D4D4",
    marginTop: 20,
    alignSelf: "center",
  },
  profileText: {
    // marginTop: 10,/
    color: "#fff",
    alignSelf: "center",
    fontSize: 25,
  },
  profileContainer: {
    backgroundColor: "#120537",
    flex: 0.65,
    alignContent: "center",
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImage: {
    alignSelf: "center",
    height: 120,
    width: 120,
    marginTop: 20,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  tabText: {
    color: "#aaa",
    fontSize: 20,
    fontWeight: 'bold',
  },
  activeTab: {
    color: "#fff",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'start',
  },
  podcastContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    paddingBottom: 60,
  },
  podcastHeader: {
    color: "#120537",
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 15,
  },
  podcastInnerContainer: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#120537',
    borderRadius: 10,
    backgroundColor: "#a9e1f8",
  }
});

export default Profile;
