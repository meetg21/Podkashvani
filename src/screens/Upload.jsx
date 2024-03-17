import React, { useState } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { DocumentUpload } from 'iconsax-react-native';

const Upload = () => {
  let navigation = useNavigation();

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
      AsyncStorage.setItem('pdfName', selectedPdf[0].name);
      console.log('url: ', selectedPdf[0].content);
      const reference = storage().ref(`/documents/${selectedPdf[0].name}`); // Use original filename
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
          AsyncStorage.setItem('pdfUrl', downloadURL);
          navigation.navigate('Customize');
          
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
        {/* <Image source={require('../assets/images/upload.png')} style={{ width: 140, height: 100 }} /> */}
        <DocumentUpload
          size="100"
          color="#120537"
        />
        <Button style={styles.Button} onPress={pickPdf}>Browse</Button>
        {selectedPdf ? <Button onPress={uploadPdf}>Upload</Button>: ''}
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
    marginBottom: 20,
  },
  uploadContainer: {
    width: "90%",
    height: 350,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(155,221,255,0.8)',  
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    borderRadius: 20,
  },
  text:{
    fontSize: 12,
    color: 'black',
    margin: 10,
    fontFamily: 'Poppins-Medium',
  },
  Button: {
    paddingHorizontal: 20, // Add horizontal padding to the button
    paddingVertical: 10,    // Add vertical padding to the button
    margin: 20,
    backgroundColor: '#120537',
    color: 'white',
    borderRadius: 20,
    fontFamily: 'Poppins-Medium',
  },
});
