import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function Cam() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [responseFromBackend, setResponseFromBackend] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const startSending = () => {
    setIsSending(true);
  };

  const stopSending = () => {
    setIsSending(false);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef && isSending) {
      try {
        const photo = await cameraRef.takePictureAsync({ base64: true });
        const base64Image = `${photo.base64}`;
        await sendImageToBackend(base64Image);
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    }
  };

  const sendImageToBackend = async (base64Image) => {
    try {
      const response = await fetch('http://localhost:5000/recognize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });
      const data = await response.json();
      setResponseFromBackend(data);
      console.log(data)
    } catch (error) {
      console.error('Error sending image to backend:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleCapture();
    }, 1000);

    return () => clearInterval(interval);
  }, [cameraRef, isSending]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const hi = async () => {
    try {
      const response = await fetch('http://localhost:5000/hello', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response from backend:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
      >
        <View style={styles.captureButtonContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleCapture}
          >
            <Text style={styles.captureButtonText}>Capture</Text>
          </TouchableOpacity>
        </View>
      </Camera>

      <View style={styles.responseContainer}>
        <View style={styles.sendButtonContainer}>
          <Button onPress={startSending} title='Start Sending' />
          <Button onPress={stopSending} title='Stop Sending' />
        </View>
        <Text style={styles.responseText}>Response from Backend:</Text>
        <Text style={styles.responseData}>{JSON.stringify(responseFromBackend, null, 2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
  },
  captureButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  captureButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  responseContainer: {
    padding: 20,
  },
  sendButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  responseText: {
    fontSize: 16,
    marginBottom: 5,
  },
  responseData: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
});
