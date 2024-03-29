import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  // Dummy data for recent alerts (replace with actual data)
  const recentAlerts = [
    { id: 1, timestamp: '2024-03-28 08:30', description: 'Unrecognized visitor detected' },
    { id: 2, timestamp: '2024-03-27 14:45', description: 'Motion detected at front door' },
    // Add more alerts as needed
  ];

  // Dummy security tips
  const securityTips = [
    'Keep doors and windows locked at all times.',
    'Install motion-sensing lights around your property.',
    'Regularly update your access control list.',
    // Add more tips as needed
  ];

  // Dummy function for emergency button press
  const handleEmergencyPress = () => {
    // Implement your emergency action here
    console.log('Emergency button pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home Security App</Text>
      
      {/* Navigation Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cam')}>
        <Text style={styles.buttonText}>Live Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Photos')}>
        <Text style={styles.buttonText}>Accepted Visitors</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      
      {/* Security Status */}
      <Text style={styles.status}>Security Status: Active</Text>
      
      {/* Security Tips */}
      <Text style={styles.subheading}>Security Tips:</Text>
      {securityTips.map((tip, index) => (
        <Text key={index} style={styles.tip}>{`${index + 1}. ${tip}`}</Text>
      ))}

      {/* Recent Alerts */}
      <Text style={styles.subheading}>Recent Alerts:</Text>
      {recentAlerts.map(alert => (
        <View key={alert.id} style={styles.alertItem}>
          <Text>{alert.timestamp}</Text>
          <Text>{alert.description}</Text>
        </View>
      ))}

      {/* Emergency Button */}
      <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyPress}>
        <Text style={styles.emergencyButtonText}>Emergency</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  status: {
    fontSize: 18,
    marginTop: 20,
  },
  subheading: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  tip: {
    fontSize: 16,
    marginBottom: 5,
  },
  alertItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 5,
  },
  emergencyButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;
