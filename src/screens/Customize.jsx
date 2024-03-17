import { Back, VoiceSquare, Location } from 'iconsax-react-native';
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Button, Chip } from 'react-native-paper';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pause, Play } from 'iconsax-react-native';


const images = [
    { source: require('../assets/images/Joey.png'), name: 'Joey Ange', accent: "US", language: "English", speed: "fast" ,audio:'joey.mp3'},
    { source: require('../assets/images/jeetu.png'), name: 'Abdul Bhari', accent: "Indian", language: "English", speed: "slow",audio:'abdul.mp3' },
    { source: require('../assets/images/jenny.png'), name: 'Jenny Mam ', accent: "Indian", language: "English", speed: "medium" ,audio:'jenny.mp3'},
    { source: require('../assets/images/swift.png'), name: 'Angela Yu', accent: "UK", language: "English", speed: "medium",audio:'angela.mp3' },
    // Add more images as needed
];
const LENGTH = images.length;

export default function Customize() {
    const [index, setIndex] = React.useState(0); // Initialize with null
    const [sound, setSound] = React.useState(null);
    const carouselRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const soundRef = useRef(null);

    const startAudio = () => {
        if (!isPlaying) {
            soundRef.current = new Sound(images[index].audio, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('Error loading sound:', error);
                    return;
                }
                soundRef.current.play((success) => {
                    if (success) {
                        console.log('Successfully finished playing');
                        setIsPlaying(false);
                    } else {
                        console.log('Playback failed due to audio decoding errors');
                    }
                });
            });
            setIsPlaying(true);
        }
    };

    const pauseAudio = () => {
        if (isPlaying && soundRef.current) {
            soundRef.current.pause();
            setIsPlaying(false);
        }
    };

    const renderItem = ({ item, index: itemIndex }) => (
        <TouchableOpacity
            style={[
                styles.carouselItem,
                { borderColor: index === itemIndex ? 'green' : 'black' },
            ]}
            onPress={() => setIndex(itemIndex)}
        >
            <Image source={item.source} style={styles.image} />
            <Text style={styles.imageName}>{item.name}</Text>
        </TouchableOpacity>
    );

    const handleCreate = async () => {
        try {
            // await AsyncStorage.setItem('guestName', "Joey");
            // await AsyncStorage.setItem('guestCountry', "US");

            const pdfUrl = await AsyncStorage.getItem('pdfUrl') // Replace with your PDF URL
            const pdfName = await AsyncStorage.getItem('pdfName') // Replace with your PDF name
            console.log(pdfUrl);
            // const guestName = await AsyncStorage.getItem('guestName');
            // const guestCountry = await AsyncStorage.getItem('guestCountry');
            const guestName = "Joey";
            const guestCountry = "US";

            // Make API request to send guest data and PDF URL
            const apiUrl = `https://himanshupatil17000-8a5c4268-de97-4069-a249-eedac4800270.socketxp.com/podcast?url=${pdfName}&guest=${guestName}&country=${guestCountry}`;
            const response = await fetch(apiUrl, {
                method: 'GET', // Assuming your API expects a GET request
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Handle success
                console.log('API request successful');
            } else {
                // Handle error
                console.error('API request failed');
                console.log("Error: ", response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handlePlayAudio = () => {
        const sound = new Sound(images[index].audio, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Error loading sound:', error);
                return;
            }
            // Play the sound
            sound.play((success) => {
                if (success) {
                    console.log('Successfully finished playing');
                } else {
                    console.log('Playback failed due to audio decoding errors');
                }
            });
        });
    };

    return (
        <LinearGradient colors={['#FFFDF4', '#00AAFF']} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => console.log('Back button pressed')}>
                    <Back size="32" color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Choose Your Customization</Text>
            </View>

            <View style={{ marginTop: '6%' }}></View>
            <Carousel
                ref={carouselRef}
                data={images}
                renderItem={renderItem}
                sliderWidth={400}
                itemWidth={300}
                onSnapToItem={(index) => setIndex(index)}
            />

<View style={styles.audioControls}>
                {isPlaying ? (
                    <TouchableOpacity style={styles.audioButton} onPress={pauseAudio}>
                        <Pause size="32" color="#120537"/>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.audioButton} onPress={startAudio}>
                        <Play size="32" color="#120537"/>
                    </TouchableOpacity>
                )}
            </View>

            <View style={{width: "100%", display: "flex", alignItems:"center"}}>
            {/* <Text style={{fontSize: 20, color: '#212121', backgroundColor:"#fff", padding: 20, width: "100%", margin: 20}}>Audio Preview</Text> */}

            <View style={styles.chipContainer}>
                <Text style={{color: "black", fontSize: 20, fontWeight: 500, marginBottom: 20}}>Properties</Text>
                <View style={styles.chipInnerContainer}>
                    <Chip
                        style={{ margin: 5 }}
                        onPress={() => console.log('Pressed')}
                    >
                        {images[index].accent}
                    </Chip>
                    <Chip
                        style={{ margin: 5 }}
                        onPress={() => console.log('Pressed')}
                    >
                        {images[index].language}
                    </Chip>
                    <Chip
                        style={{ margin: 5 }}
                        onPress={() => console.log('Pressed')}
                    >
                        {images[index].speed}
                    </Chip>
                </View>
            </View>

            {index !== null && (
                <Pagination
                    dotsLength={LENGTH}
                    activeDotIndex={index}
                    dotStyle={styles.paginationDot}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            )}
              <Button style={{}} mode="contained" onPress={handleCreate}> Create Podcast </Button>
            </View>
          
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    audioControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    audioButton: {
        padding: 30,
        borderRadius: 5,
        // marginHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    headerText: {
        color: '#212121',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    carouselItem: {
        width: 300, // Adjust as needed
        height: 450, // Adjust as needed
        // borderWidth: 2,
        // borderRadius: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#FFFFFE',
    },
    image: {
        width: '100%',
        height: '70%',
        resizeMode: 'cover',
    },
    imageName: {
        fontSize: 26,
        marginTop: 50,
        // font:'poppons-medium',
        color:'#120537',
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'blue',
        marginHorizontal: 8,
    },


    chipContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    chipInnerContainer: {
        display: "flex",
        flexDirection: "row",
    }
});
