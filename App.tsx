import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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


function GoogleSignIn() {
  return (
    <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    />
  );
}
const App = () => {
  return (
    <View>
      <Text>Google Sign-In</Text>
      <GoogleSignIn />
    </View>
  )
}

export default App