import { useNavigation } from '@react-navigation/native';
import { More, PlayCircle } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'; // Import Firestore from Firebase

const PodcastComponent = ({ props }) => {
    let navigation = useNavigation();
    const [underScoreFile, setUnderScoreFile] = useState(null);
    const { count, time, description } = props;

    let lecture = count > 1 ? "Lectures" : "Lecture";

    const getPodcastNameFromUrl = (url) => {
        const splitByFolder = url.split('%2F');
        const fileNameWithExtension = splitByFolder.pop();
        const fileName = fileNameWithExtension.split('.')[0];
        const nameWithoutUnderscores = fileName.replace(/_/g, ' ');
        return nameWithoutUnderscores;
    };

    const [podcastData, setPodcastData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Props",props.time);
            const name = getPodcastNameFromUrl(props);
            const docId = name.split('%2F').pop(); // Construct the document ID from the filename
            console.log("Document ID:", underScoreFile);
            const docRef = firestore().collection('StackX').doc(`${docId}.mp3`);

            try {
                const docSnapshot = await docRef.get();
                if (docSnapshot.exists) {
                    const data = docSnapshot.data();
                    setPodcastData(data);
                } else {
                    console.log("Document does not exist!");
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };

        fetchData();
    }, [props]);

    useEffect(() => {
        setUnderScoreFile(getPodcastNameFromUrl(props)); // Set underscored file name when component mounts
    }, []); // Empty dependency array to run only once when component mounts

    useEffect(() => {
        console.log("Podcast data:", podcastData);
    }, [podcastData]);

    const handleClick = () => {
        navigation.navigate('PodcastPlayer', {
            name: underScoreFile,
            url: props
        });
    };

    return (
        <View style={styles.container} >
            <Image
                source={require('../assets/images/podcast_image.png')}
                style={styles.podcastImage}
            />
            <View style={styles.innerContainer}>
                <Text style={styles.podcastHeader} numberOfLines={1} ellipsizeMode="tail">{underScoreFile}</Text>
                <View style={styles.optionsContainer}>
                    <View style={{display:'flex',flexDirection:'row'}}>
                    <Image
                        source={require('../assets/images/clock.png')}
                        style={{ height: 18, width: 23, marginLeft: 10 }}
                    />
                    <Text style={styles.optionsText}>{podcastData ? podcastData.episode_duration : '3:27'}</Text>
                    </View>
                    <TouchableOpacity>
                        <More size="32" color="#FF8A65" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleClick}>
                        <PlayCircle size="32" color="#FF8A65" variant="Bold" />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: "#120537" }} numberOfLines={3} ellipsizeMode="tail">{}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    podcastHeader: {
        color: "#120537",
        fontSize: 22,
        fontWeight: '900',
    },
    podcastImage: {
        height: 100,
        width: 100,
    },
    innerContainer: {
        marginLeft: 20,
        maxHeight: 100,
        flex: 1,
        overflow: "hidden",
    },
    optionsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    optionsText: {
        color: "#120537",
    }
});

export default PodcastComponent;
