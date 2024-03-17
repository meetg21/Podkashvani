import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Upload from './Upload'
import Greetings from '../components/Greetings'
import BottomNavBar from '../components/BottomNavBar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import storage from '@react-native-firebase/storage'


const Home = () => {

    const [userData, setUserData] = useState([]);

    const [mp3Urls, setMp3Urls] = useState([]);
    const [podcastsFolder, setPodcastsFolder] = useState(null);
    const [SavedUrls, setSavedUrls] = useState([]);
    const [SavedpodcastsFolder, setSavedPodcastsFolder] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');

                if (data) {
                    const parsedData = JSON.parse(data);
                    // Extract the second object from the array
                    const user = parsedData[0];
                    console.log('User data:', user.podcasts[0]);
                    if (user.podcasts && user.podcasts.length > 0) {
                        const folderName = user.podcasts[0]; // Assuming only one folder for simplicity
                        setPodcastsFolder(folderName);
                        fetchMp3Urls(folderName);
                    }
                    if (user.podcasts && user.podcasts.length > 0) {
                        const folderName = user.podcasts[1]; // Assuming only one folder for simplicity
                        setSavedPodcastsFolder(folderName);
                        fetchSavedUrls(folderName);
                    }

                }
            } catch (error) {
                console.error('Error fetching user data from AsyncStorage:', error);
            }
        };

        fetchData();
    }, []);

    const fetchMp3Urls = async (folderName) => {
        try {
            const storageRef = storage().ref().child(folderName);
            const listResult = await storageRef.listAll();
            const urls = await Promise.all(listResult.items.map(item => item.getDownloadURL()));
            setMp3Urls(urls);
            await AsyncStorage.setItem('mp3Urls', JSON.stringify(urls));
        } catch (error) {
            console.error('Error fetching MP3 URLs:', error);
        }
    };
    const fetchSavedUrls = async (folderName) => {
        try {
            const storageRef = storage().ref().child(folderName);
            const listResult = await storageRef.listAll();
            const urls = await Promise.all(listResult.items.map(item => item.getDownloadURL()));
            setSavedUrls(urls);
            await AsyncStorage.setItem('SavedUrls', JSON.stringify(urls));
        } catch (error) {
            console.error('Error fetching MP3 URLs:', error);
        }
    };
    console.log("MP#",mp3Urls);
    console.log("gfgf",SavedUrls)
    return (
        <LinearGradient colors={['#FFFDF4', '#00AAFF']} style={styles.container}>
            <ScrollView>
                <View>
                    <Greetings />
                    <View>
                        <Text style={styles.firstHeading}>
                            Convert your pdf to podcast
                        </Text>
                    </View>
                    <Upload />
                </View>
                <View>
                    <Text style={styles.firstHeading}>How to Use Podkashvani?</Text>
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepText}><Text style={styles.stepNumber}>1.</Text> Convert your study material into PDF format.</Text>
                        <Text style={styles.stepText}><Text style={styles.stepNumber}>2.</Text> Upload the PDF on Podkashvani.</Text>
                        <Text style={styles.stepText}><Text style={styles.stepNumber}>3.</Text> Wait for approximately 1-2 hours for the entire podcast playlist to be ready.</Text>
                        <Text style={styles.stepText}><Text style={styles.stepNumber}>4.</Text> Explore and listen to your personalized podcast playlist.</Text>
                        <Text style={styles.stepText}><Text style={styles.stepNumber}>5.</Text> Share your customized playlist with friends and classmates.</Text>
                        <Text style={styles.stepText}><Text style={styles.stepNumber}>6.</Text> Discover new study materials and topics based on your interests.</Text>
                    </View>
                </View>
                <View style={{ height: 200 }}></View>
            </ScrollView>


            <BottomNavBar activeScreen="Home" />
        </LinearGradient>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    firstHeading: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        textAlign: 'left',
        padding: 20,
        color: '#120537',
        fontWeight: "900",
    },
    stepContainer: {
        marginLeft: 20,
    },
    stepText: {
        fontSize: 16,
        marginBottom: 5,
        color: "#fff"
      },
      stepNumber: {
        fontWeight: 'bold',
    },
});