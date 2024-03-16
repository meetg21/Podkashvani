import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PodcastComponent from '../components/PodcastComponent';
import BottomNavBar from '../components/BottomNavBar';

const Profile = () => {
  const [tabState, setTabState] = useState(true); // State to track the active tab

  const podcastAPI = {
    "my files": [
      {
        "header": "Podcast Title 1",
        "time": "30:15",
        "count": 10,
        "description": "This is the description for Podcast 1. It covers various topics related to technology."
      },
      {
        "header": "Podcast Title 2",
        "time": "25:30",
        "count": 8,
        "description": "Description for Podcast 2. This podcast focuses on current events and news updates."
      },
      {
        "header": "Podcast Title 3",
        "time": "40:45",
        "count": 12,
        "description": "Description for Podcast 3. This podcast features interviews with industry experts."
      },
      {
        "header": "Podcast Title 4",
        "time": "50:30",
        "count": 15,
        "description": "Description for Podcast 4. This podcast discusses the latest trends in the industry."
      },
      {
        "header": "Podcast Title 5",
        "time": "35:20",
        "count": 7,
        "description": "Description for Podcast 5. This podcast explores the world of entrepreneurship."
      }
    ],
    "saved": [
      {
        "header": "Saved Podcast Title 1",
        "time": "20:10",
        "count": 5,
        "description": "Description for Saved Podcast 1. This podcast is saved for later listening."
      },
      {
        "header": "Saved Podcast Title 2",
        "time": "15:45",
        "count": 3,
        "description": "Description for Saved Podcast 2. Another saved podcast description."
      }
    ]
  };

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
        <Text style={styles.profileMail}>soroushnorozyui@gmail.com</Text>
        <Text style={styles.profileText}>Soroushnrz</Text>

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
        <Text style={styles.podcastHeader}>MY PODCASTS</Text>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {tabState ? (
            podcastAPI["my files"].map((podcast, index) => (
              <View key={index} style={styles.podcastInnerContainer}>
                <PodcastComponent props={podcast} />
              </View>
            ))
          ) : (
            podcastAPI["saved"].map((podcast, index) => (
              <View key={index} style={styles.podcastInnerContainer}>
                <PodcastComponent props={podcast} />
              </View>
            ))
          )}
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
    marginTop: 10,
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
    height: 140,
    width: 140,
    marginTop: 20,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
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
