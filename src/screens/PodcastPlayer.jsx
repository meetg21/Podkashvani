import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ChatScreen from './ChatScreen';

const PodcastPlayer = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
       
        <TouchableOpacity style={styles.backButton}>
        
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/podcast_image.png')} 
          style={styles.podcastImage}
        />
      </View>

      <Text style={styles.title}>Podcast Title</Text>

      <Text style={styles.author}>Podcast Author</Text>
      <Image
        source={require('../assets/images/ghost.png')}
        style={styles.ghostImage}
      />
      <ChatScreen></ChatScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00f', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 20,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center', 
    marginTop: 20, 
    marginBottom: 10, 
  },
  podcastImage: {
    width: 300, 
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 10,
    marginHorizontal:40,
    color: '#FFF',
  },
  author: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
    marginHorizontal:40,
    color: '#FFF',
  },
  ghostImage: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'transparent',
    zIndex: -1,
  },
});

export default PodcastPlayer;
