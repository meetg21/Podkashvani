import React, { useState } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

const Upload = () => {

  const [selectedPdf, setSelectedPdf] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  const pickPdf = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // Specify Pdf files
      });



      if (DocumentPicker.isCancel(result)) {
        console.warn('User cancelled file selection.');
        return;
      }

      await setSelectedPdf(result);
      await uploadPdf(result);
    } catch (error) {
      console.error('Error selecting Pdf:', error);
      setUploadError(error);
    }
  };

  const uploadPdf = async () => {
    if (!selectedPdf) {
      console.error('Please select an Pdf file first.');
      return;
    }

    try {
      console.log('Uploading Pdf:', selectedPdf[0].name);
      console.log('url: ', selectedPdf[0].content);
      const reference = storage().ref(`/Pdf/${selectedPdf[0].name}`); // Use original filename
      const uploadTask = reference.putFile(selectedPdf[0].uri);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log('Upload is ' + progress + '% complete');
        },
        (error) => {
          console.error('Upload failed:', error);
          setUploadError(error);
        },
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          console.log('Pdf uploaded successfully!', downloadURL);
          // Use downloadURL (e.g., display or share the uploaded Pdf)
        }
      );
    } catch (error) {
      console.error('An error occurred during upload:', error);
      setUploadError(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.uploadContainer}>
        <Image source={require('../assets/images/upload.png')} style={{ width: 140, height: 100 }} />
        <Text style={styles.text}>you can drag and drop images to upload </Text>
        <Button style={styles.Button} onPress={pickPdf}>Browse</Button>
      </View>
    </View>
  );
};

export default Upload;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100%',
  },
  uploadContainer: {
    width: 300,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text:{
    fontSize: 12,
    color: 'black',

    fontFamily: 'Poppins-Medium',
  },
  Button: {
    paddingHorizontal: 20, // Add horizontal padding to the button
    paddingVertical: 10,    // Add vertical padding to the button
    backgroundColor: '#290477',
    color: 'white',
    borderRadius: 20,
    fontFamily: 'Poppins-Medium',
    fontSize:'20%',
  },
});
