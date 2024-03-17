import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Avatar } from 'react-native-paper';

const RecentlyPlayed = () => {
    // Sample data for recently played podcasts
    const recentlyPlayedData = [
        { id: '1', imageUrl: require('../assets/images/podcast_image.png') },
        { id: '2', imageUrl: require('../assets/images/podcast_image.png') },
        { id: '3', imageUrl: require('../assets/images/podcast_image.png') },
        // Add more podcast data as needed
    ];

    // Render item for FlatList
    const renderPodcastItem = ({ item }) => (
        <Image source={item.imageUrl} style={styles.podcastImage} />
    );

    return (
        <View style={styles.recentlyPlayedContainer}>
            <Text style={styles.recentlyPlayedHeading}>Recently Played</Text>
            <FlatList
                data={recentlyPlayedData}
                renderItem={renderPodcastItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const Greetings = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}> 
                <Text style={styles.text}>Greetings Milind Nair 👋</Text>
                <Avatar.Image size={40} source={require('../assets/images/avatar.jpg')} />
            </View>
            {/* <Text style={{ color: "rgba(0,0,0,0.7)", fontSize: 20, margin: 20, fontWeight: "800" }}>" Pocket se Padhai "</Text> */}
            <RecentlyPlayed />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: 'rgba(155,221,255,0.8)', // Set the background to a semi-transparent white
        backdropFilter: 'blur(10px)', // Apply background blur
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
    },
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: `100%`,
        paddingTop: 40,
    },
    text: {
        fontFamily: 'Poppins-Medium',
        color: '#212121',
        marginLeft: 10,
    },
    recentlyPlayedContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    recentlyPlayedHeading: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        textAlign: 'left',
        marginVertical: 20,
        color: '#120537',
        fontWeight: "900",
    },
    podcastImage: {
        width: 120,
        height: 120,
        marginRight: 10,
        borderRadius: 8,
    },
    flatListContent: {
        alignItems: 'flex-start',
    },
});

export default Greetings;
