import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'

const PodcastComponent = ({ props }) => {
    const {header, count, time, description} = props
    
    let lecture = "Lecture";
    if(count > 1){
        lecture = "Lectures"
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/podcast_image.png')} 
                style={styles.podcastImage}
            />
            <View style={styles.innerContainer}>
                <Text style={styles.podcastHeader} numberOfLines={1} ellipsizeMode="tail">{header}</Text>
                <View style={styles.optionsContainer}>
                    <Text style={styles.optionsText}>{count} {lecture}</Text>
                    <Image
                        source={require('../assets/images/clock.png')} 
                        style={{height: 18, width: 23, marginLeft: 10}}
                    />
                    <Text style={styles.optionsText}>{time}</Text>
                    <TouchableOpacity>
                        <Text style={[styles.optionsText, { marginLeft: 10, fontWeight: "900"}]}>...</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{color: "#120537"}} numberOfLines={3} ellipsizeMode="tail">{description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "red",
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
        // backgroundColor: "green",
        overflow: "hidden",
    },

    optionsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
    },
    optionsText: {
        color: "#120537",
    }
});

export default PodcastComponent
