import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAlerts } from './context/Auth';

const HomeScreen = ({ navigation }) => {
  // Dummy data for recent alerts (replace with actual data)
  const recentAlerts = [
    { id: 1, timestamp: '2024-03-28 08:30', description: 'Unrecognized visitor detected' },
    { id: 2, timestamp: '2024-03-27 14:45', description: 'Motion detected at front door' },
    // Add more alerts as needed
  ];
 const {alerts} =useAlerts()
 console.log(alerts)
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
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Home Security App</Text>
      
      {/* Navigation Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cam')}>
        <Text style={styles.buttonText}>Live Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Photos')}>
        <Text style={styles.buttonText}>Accepted Visitors</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
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
      {alerts.map(alert => (
        <View key={alert.id} style={styles.alertItem}>
          <Text>{alert.timestamp}</Text>
          <Text>{alert.description}</Text>
        </View>
      ))}

      {/* Emergency Button */}
      <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyPress}>
        <Text style={styles.emergencyButtonText}>Emergency</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  status: {
    fontSize: 18,
    marginTop: 20,
    color: '#27ae60',
  },
  subheading: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  tip: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  alertItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  emergencyButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
