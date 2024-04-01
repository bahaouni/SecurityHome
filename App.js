import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons
import Cam from './pages/Cam';
import HomeScreen from './pages/HomeScreen';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import ImagePickerExample from './pages/Photos';
import { AlertsProvider } from './pages/context/Auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for screens with tabs
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline'; // Home icon
        } else if (route.name === 'Cam') {
          iconName = focused ? 'camera' : 'camera-outline'; // Camera icon
        } else if (route.name === 'Photos') {
          iconName = focused ? 'images' : 'images-outline'; // Photo icon
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'blue', // Active tab color
      inactiveTintColor: 'gray', // Inactive tab color
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Cam" component={Cam} />
    <Tab.Screen name="Photos" component={ImagePickerExample} />
  </Tab.Navigator>
);

function App() {
  return (
    <AlertsProvider >
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Cam" component={Cam} />
        <Stack.Screen name="Photos" component={ImagePickerExample} />

      </Stack.Navigator>
    </NavigationContainer>
    </AlertsProvider>
  );
}

export default App;
