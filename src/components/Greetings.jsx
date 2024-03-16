import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-paper';


const Greetings = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}> 
                <Text style={styles.text}>Greetings Milind Nair 👋</Text>
                <Avatar.Image size={40} source={require('../assets/images/avatar.jpg')} />
            </View>
        </View>
    )
}

export default Greetings;


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
        padding:10,
        borderRadius: 20,
    },
    mainContainer:{
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        width: `100%`,
        paddingTop: 20,
    },
    text:{
        fontFamily: 'Poppins-Medium',
        color: '#212121'
    }
});
