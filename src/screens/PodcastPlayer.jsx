import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import ChatScreen from './ChatScreen';
import LinearGradient from 'react-native-linear-gradient';

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

const PodcastPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const soundRef = useRef(null);
    const timerRef = useRef(null);
    const [pausedTime, setPausedTime] = useState(0);

    useEffect(() => {
        if (isPlaying) {
            if (!soundRef.current) {
                soundRef.current = new Sound(podcasts[0].audio, Sound.MAIN_BUNDLE, (error) => {
                    if (error) {
                        console.log('failed to load the sound', error);
                        return;
                    }
                    setDuration(soundRef.current.getDuration());
                    soundRef.current.setCurrentTime(pausedTime);
                    soundRef.current.play((success) => {
                        if (success) {
                            console.log('successfully finished playing');
                            setIsPlaying(false);
                            clearInterval(timerRef.current);
                        } else {
                            console.log('playback failed due to audio decoding errors');
                        }
                    });
                    startTimer();
                });
            } else {
                soundRef.current.play((success) => {
                    if (success) {
                        console.log('successfully resumed playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
                soundRef.current.setCurrentTime(pausedTime);
                startTimer();
            }
        } else {
            if (soundRef.current) {
                soundRef.current.pause(() => {
                    clearInterval(timerRef.current);
                    soundRef.current.getCurrentTime((seconds) => {
                        setPausedTime(seconds);
                    });
                });
            }
        }
        return () => {
            clearInterval(timerRef.current);
            if (soundRef.current) {
                soundRef.current.release();
                soundRef.current = null;
            }
        };
    }, [isPlaying]);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            soundRef.current.getCurrentTime((seconds) => {
                setCurrentTime(seconds);
            });
        }, 1000);
    };

    const playSound = () => {
        setIsPlaying(!isPlaying);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        // <LinearGradient colors={['#FFFDF4', '#00AAFF']} style={styles.container}>
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={podcasts[0].image}
                    style={styles.podcastImage}
                />
            </View>

            <Text style={styles.title}>{podcasts[0].title}</Text>

            <Text style={styles.author}>{podcasts[0].author}</Text>

            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration}
                value={currentTime}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#FFFFFF"
                onSlidingComplete={(value) => {
                    if (!isPlaying) {
                        setPausedTime(value);
                    }
                    soundRef.current.setCurrentTime(value);
                }}
            />

            <View style={styles.timeContainer}>
                <Text style={styles.time}>{formatTime(currentTime)}</Text>
                <Text style={styles.time}>{formatTime(duration)}</Text>
            </View>

            <TouchableOpacity style={styles.playButton} onPress={playSound}>
                <Text style={styles.playButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>

            <Image
                source={require('../assets/images/ghost.png')}
                style={styles.ghostImage}
            />
            
            <ChatScreen />
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
        marginHorizontal: 40,
        color: '#120537',
    },
    author: {
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 20,
        marginHorizontal: 40,
        color: '#120537',
    },
    slider: {
        width: '80%',
        alignSelf: 'center',
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 5,
    },
    time: {
        color: '#120537',
        fontSize: 14,
    },
    playButton: {
        backgroundColor: '#120537',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
    },
    playButtonText: {
        color: '#FFF',
        fontSize: 16,
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
