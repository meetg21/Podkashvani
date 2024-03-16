import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

GoogleSignin.configure({
  // webClientId: process.env.Client_id,
  webClientId: '258261459057-3kef70be4700sccn4shs3djjkcj6mn7d.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const res = await GoogleSignin.signIn();

  // console.log("idtoken:",res)
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(res.idToken);

  // Sign-in the user with the credential
  await auth().signInWithCredential(googleCredential);
}




const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigation = useNavigation();

  const handleSignup = () => {
    // Your signup logic here
  };

  return (
    <LinearGradient colors={['#FFFDF4', '#00AAFF']} style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/images/applogo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.heading}>Pocket se Hogi padhai!</Text>
        <Text style={styles.subHeading}>SIGNUP</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#666666"
          value={name}
          onChangeText={setName}
          color="#000000"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          color="#000000"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          color="#000000"
        />
        <Button title="Create Account" onPress={handleSignup} color="#120537" titleStyle={styles.buttonText} />
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity style={styles.googleButton} onPress={() => onGoogleButtonPress().then(() => navigation.navigate('Home'))}>
          <Image source={require('../assets/images/google.png')} style={styles.googleLogo} resizeMode="contain" />
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Set background color to transparent to let the gradient show through
  },
  logo: {
    width: 250,
    height: 200,
    marginBottom: 10,
    marginTop: -80,
  },
  heading: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    marginBottom: 25,
  },
  subHeading: {
    fontSize: 30,
    fontFamily: 'Poppins-ExtraBold',
    color: '#120537',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#120537',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  orText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#120537',
    marginHorizontal: 10,
  },
  line: {
    flex: 1,
    height: 0.4,
    width: '40%',
    backgroundColor: '#120537',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    width: '60%',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 60,
    width: '60%',
  },
  googleLogo: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginLeft: 20,
  },
  googleText: {
    color: '#000000',
    fontFamily: 'Poppins-Medium',
  },
});

export default SignupScreen;
