import React, { useState, useEffect, Children } from 'react';
import { Button, Image, View, TextInput, ScrollView, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerExample = () => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [names,setNames]= useState([]);
  const blobTobase64 = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject(new Error('Failed to convert blob to base64.'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const selectedImages = result.assets;
      const imageURIs = selectedImages.map(image => image.uri);
      setImages(prevImages => [...prevImages, ...imageURIs]);
    }
  };

  const saveImage = async () => {
    if (images.length === 0) {
      Alert.alert('No Image Selected', 'Please select an image first.');
      return;
    }
    const base64Images = await Promise.all(
      images.map(async uri => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return await blobTobase64(blob);
      })
    );

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        base64String: base64Images[images.length - 1],
      }),
    };

    try {
      const response = await fetch('http://localhost:5135/api/Photos/savePhoto', requestOptions);
      if (response.ok) {
        Alert.alert('Success', 'Photo saved successfully!');
        setImages([]);
        setName('');
      } else {
        const errorText = await response.text();
        Alert.alert('Error', `Failed to save photo: ${errorText}`);
      }
    } catch (error) {
      Alert.alert('Error', `Error saving photo: ${error}`);
    }
  };

  const deleteAll = async () => {
    try {
      const response = await fetch('http://localhost:5135/api/Photos/deleteAllPhotos',{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        Alert.alert('Success', 'All photos deleted successfully!');
      } else {
        const errorText = await response.text();
        Alert.alert('Error', `Failed to delete photos: ${errorText}`);
      }
    } catch (error) {
      Alert.alert('Error', `Error deleting photos: ${error}`);
    }
  };

  const getAllPhotos = async () => {
    try {
      const response = await fetch('http://localhost:5135/api/Photos/getAllPhotos');
      if (response.ok) {
        const photoURIs = await response.json();
        console.log(photoURIs)
const imagess=photoURIs.map(p=>p.photo)
const Namesss=photoURIs.map(p=>p.name)
console.log(Namesss)
setNames(Namesss)
        setImages(imagess);
      } else {
        const errorText = await response.text();
        Alert.alert('Error', `Failed to get photos: ${errorText}`);
      }
    } catch (error) {
      Alert.alert('Error', `Error getting photos: ${error}`);
    }
  };
  const uploadPhotos = async () => {
    try {
      const base64Images = await Promise.all(
        images.map(async uri => {
          const response = await fetch(uri);
          const blob = await response.blob();
          return await blobTobase64(blob);
        })
      );
  
      const response = await fetch('http://localhost:5000/uploadPhotos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          base64_images: images,
          names: names
        })
      });
      console.log(response)
  
      if (response.ok) {
        const result = await response.json();
        Alert.alert('Success', result.message);
      } else {
        const errorText = await response.text();
        Alert.alert('Error', `Failed to upload photos: ${errorText}`);
      }
    } catch (error) {
      Alert.alert('Error', `Error uploading photos: ${error}`);
    }
  };
    

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick images from camera roll</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
  {images.map((uri, index) => (
    <View key={index} style={styles.photoContainer}>
      <Image source={{ uri: uri }} style={styles.image} />
      <Text style={styles.photoName}>{names[index]}</Text>
    </View>
  ))}
</View>        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: '#27ae60' }]} onPress={saveImage}>
          <Text style={styles.buttonText}>Save image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#2980b9' }]} onPress={getAllPhotos}>
          <Text style={styles.buttonText}>Get all photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c' }]} onPress={deleteAll}>
          <Text style={styles.buttonText}>Delete all photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c' }]} onPress={uploadPhotos}>
          <Text style={styles.buttonText}>upload All Photos</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
          }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photoName: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default ImagePickerExample;
