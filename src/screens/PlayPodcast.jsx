import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import PodcastPlayer from './PodcastPlayer';

const podcasts = [
  {
    image: require('../assets/images/podcast_image.png'),
    title: 'Podcast Title 1',
    author: 'Author 1',
    audio: 'hurayyy.mp3',
  },
  {
    image: require('../assets/images/podcast_image.png'),
    title: 'Podcast Title 2',
    author: 'Author 2',
    audio: 'hurayyy.mp3',
  },
  // Add more podcasts as needed
];

const PlayPodcast = () => {
  const [selectedPodcastIndex, setSelectedPodcastIndex] = useState(0);

  const handleNext = () => {
    setSelectedPodcastIndex((prevIndex) =>
      prevIndex === podcasts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setSelectedPodcastIndex((prevIndex) =>
      prevIndex === 0 ? podcasts.length - 1 : prevIndex - 1
    );
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
        <TouchableOpacity onPress={handlePrevious}>
          <Text style={{ fontSize: 20 }}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Text style={{ fontSize: 20 }}>Next</Text>
        </TouchableOpacity>
      </View>
      <PodcastPlayer podcast={podcasts[selectedPodcastIndex]} />
    </View>
  );
};

export default PlayPodcast;
