import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BottomNavBar from '../components/BottomNavBar';
import PodcastComponent from '../components/PodcastComponent';

const data = {
    "Software Engineering": [
        {
            "collection": "SDEV",
            "docs": [
                { "duration": "03:50", "podcast_name": "Component_Deployment_Diagrams", "url": "https://firebasestorage.googleapis.com/v0/b/podkashvani.appspot.com/o/TEST%2FSOFTWARETESTINGSTRATEGIESANDTECHNIQUES.mp3?alt=media&token=58e242be-0af5-4a75-9a9c-4eacaa560aba" },
                { "duration": "02:17", "podcast_name": "DeploymentDiagramAndCodeMapping", "url": "https://firebasestorage.googleapis.com/v0/b/podkashvani.appspot.com/o/TEST%2FUnit_Integration_Regression_Testing.mp3?alt=media&token=2e430c4e-019e-4bb2-a8e4-fecf7c84988f" },
                { "duration": "02:17", "podcast_name": "Model2CodeTransformations", "url": "https://firebasestorage.googleapis.com/v0/b/podkashvani.appspot.com/o/StackX%2FMalware_Detection_Countermeasures.mp3?alt=media&token=d9643401-46a4-498c-99b5-ec7de925d0b3" },
                { "duration": "04:03", "podcast_name": "ReverseEngineering_Modeling_Mapping" },
                { "duration": "01:18", "podcast_name": "System_Implementation_and_ChangeManagement" }
            ]
        }
    ],
    "": [
        {
            "collection": "StackX",
            "docs": [
                { "duration": "00:27", "podcast_name": "BufferOverflowsAndExploitation", "url": "https://firebasestorage.googleapis.com/v0/b/podkashvani.appspot.com/o/StackX%2FBufferOverflowsAndExploitation.mp3?alt=media&token=49ba2db4-d4c2-4aee-bea1-fdc88176e9f6" },
                { "duration": "02:17", "podcast_name": "IntegerOverflow_BufferOverflows_RaceConditions_Malware", "url": "https://firebasestorage.googleapis.com/v0/b/podkashvani.appspot.com/o/StackX%2FIntegerOverflow_BufferOverflows_RaceConditions_Malware.mp3?alt=media&token=8ec163af-1dae-4f0d-bf25-05af8afe74bc" },
                { "duration": "02:17", "podcast_name": "Malware_Detection_Countermeasures", "url": "https://firebasestorage.googleapis.com/v0/b/podkashvani.appspot.com/o/StackX%2FMalware_Detection_Countermeasures.mp3?alt=media&token=d9643401-46a4-498c-99b5-ec7de925d0b3" },
                { "duration": "04:03", "podcast_name": "Malware_and_its_Devastating_Effects", "url": "https://firebasestorage.googleapis.com/v0/b/podkashvani.appspot.com/o/StackX%2FMalware_and_its_Devastating_Effects.mp3?alt=media&token=3ee1ef2c-a9be-4e07-b722-0b53aa48e220" },
                { "duration": "01:18", "podcast_name": "Overflow_Countermeasures", "url": "https://firebasestorage.googleapis.com/v0/b/podkashvani.appspot.com/o/StackX%2FOverflow_Countermeasures.mp3?alt=media&token=c1f52d33-9a7b-4d10-8659-08ae8487c981" }
            ]
        }
    ]
};

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showImage, setShowImage] = useState(true);

    useEffect(() => {
        //print all in async Storage
    }, []);

    const handleSearch = () => {
        const results = [];
        for (const [, collections] of Object.entries(data)) {
            for (const collection of collections) {
                for (const doc of collection.docs) {
                    if (doc.podcast_name.toLowerCase().includes(searchQuery.toLowerCase())) {
                        results.push({ collection: collection.collection, ...doc });
                    }
                }
            }
        }
        setSearchResults(results);
        setShowImage(false);
    };

    return (
        <LinearGradient colors={['#FFFDF4', '#00AAFF']} style={styles.container}>
            <View>
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={styles.searchInput}
                    />
                    <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                        <Image
                            source={require('../assets/images/search.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                </View>
                {showImage && (
                    <>
                        <Image
                            source={require('../assets/images/search.png')}
                            style={{ width: 400, height: 500, alignSelf: 'center' }}
                        />
                        <Text style={styles.text}>Search for your Favourite Podcasts by Name</Text>
                    </>
                )}
                {!showImage && (
                    <View>
                        {/* Render your search results here */}


                        {!showImage && (
                            <View>
                                {searchResults.map((podcast, index) => (
                                    <PodcastComponent key={index} props={"https://firebasestorage.googleapis.com/v0/b/podkashvani.appspot.com/o/StackX%2FBufferOverflowsAndExploitation.mp3?alt=media&token=49ba2db4-d4c2-4aee-bea1-fdc88176e9f6"} />
                                ))}
                            </View>
                        )}


                    </View>
                )}
            </View>
            <BottomNavBar />
        </LinearGradient>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: '#777B7E',
        backdropFilter: 'blur(10px)',
        color: 'white',
        zIndex: 1,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: 'white'
    },
    searchButton: {
        padding: 10,
    },
    text: {
        fontFamily: 'Poppins-Medium',
        color: '#212121',
        textAlign: 'center',
        fontSize: 20,
    },
    resultContainer: {
        backgroundColor: '#E0E0E0',
        padding: 10,
        margin: 5,
        borderRadius: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    duration: {
        fontSize: 14,
        color: '#333',
        marginBottom: 3,
    },
    collection: {
        fontSize: 12,
        color: '#666',
    }
});
