import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Upload from './Upload'
import Greetings from '../components/Greetings'
import BottomNavBar from '../components/BottomNavBar'

const Home = () => {
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
            <View style={{height:200}}></View>
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


    },
    stepContainer: {
        marginLeft: 20,
      },
      stepText: {
        fontSize: 16,
        marginBottom: 5,
      },
      stepNumber: {
        fontWeight: 'bold',
      },
});