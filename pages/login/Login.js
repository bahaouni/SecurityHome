import { Link } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Pressable, Button } from 'react-native';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [Wrong, setWrong] = useState('');

  const handleLogin = async () => {
    // Basic validation for username and password
    if (!username.trim()) {
      setUsernameError('Username is required');
      return;
    }
    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5135/Users/login', {
        username,
        password
      });
      const token = response.data;
      console.log(token)
      // Assuming your backend returns some kind of token upon successful login
      navigation.navigate('Main');
    } catch (error) {
      setWrong('Password or username incorrect');
      console.error('Login failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/undraw_Safe_re_kiil.png')} style={styles.image} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={[styles.input, usernameError ? styles.inputError : undefined]}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
        onFocus={() => setUsernameError('')}
      />
      {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
      <TextInput
        style={[styles.input, passwordError ? styles.inputError : undefined]}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
        onFocus={() => setPasswordError('')}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      {Wrong ? <Text style={styles.errorText}>{Wrong}</Text> : null}
      <Pressable style={styles.button} onPress={() => { handleLogin();  }}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Link to={{ screen: 'Register' }} >
        <Text style={styles.registerText}>Don't have an account? Register here</Text>
      </Link>
      <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Main')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white' , 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  registerText: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  image: {
    width: '100%', // Stretch to fill the container horizontally
    height: 200,
    resizeMode: 'contain', // Adjust image size to maintain aspect ratio
    marginBottom: 20,
  },
});
